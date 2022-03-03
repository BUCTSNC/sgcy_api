import { condition, isVoid } from "https://deno.land/x/freesia@v1.0.6/mod.ts";
import { resolve } from "https://deno.land/std@0.127.0/path/mod.ts";
import Ajv, { JTDSchemaType } from "https://esm.sh/ajv@8.10.0/dist/jtd";

const ajv = new Ajv({
    parseDate: true,
});

export type Post = {
    uuid: string;
    title: string;
    introduction: string;
    directory: string;
    authors: string[];
    tags: string[];
    timestamp: Date;
};

const metaSchema: JTDSchemaType<
    Omit<Post, "uuid" | "directory" | "timestamp">
> = {
    properties: {
        title: { type: "string" },
        introduction: { type: "string" },
        authors: {
            elements: { type: "string" },
        },
        tags: {
            elements: { type: "string" },
        },
    },
};

const metaParser = ajv.compileParser(metaSchema);

type MemoryDB = Post[];

let memoryDB: MemoryDB = [];

export type SearchableFields = "title" | "introduction" | "authors" | "tags" 

export type MetaQueryOption = {
    where: [SearchableFields | "uuid", RegExp][];
    sort?: "asc" | "desc";
    duration?: [Date, Date];
    limit?: number;
};

/**
 * like函数构建的RegExp是大小写不敏感的，除非使用flags声明
 */
export function like(content: string, flags = "i") {
    return new RegExp(`*${content}*`, flags);
}

/**
 * exact函数构建的RegExp是大小写敏感的，除非使用flags声明
 */
export function exact(content: string, flags = "") {
    return new RegExp(`^${content}$`, flags);
}

export function caseSensive(content: string) {
    return new RegExp(content);
}

export function caseInsenesive(content: string) {
    return new RegExp(content, "i");
}

/**
 * startWith函数构建的RegExp是大小不写敏感的，除非使用flags声明
 */
export function startWith(content: string, flags = "i") {
    return new RegExp(`^${content}`, flags);
}

/**
 * endWith函数构建的RegExp是大小不写敏感的，除非使用flags声明
 */
export function endWith(content: string, flags = "i") {
    return new RegExp(`${content}$`, flags);
}

export function metaQuery(query: MetaQueryOption, db = memoryDB) {
    const {
        where,
        sort = "asc",
        duration = [0, Number.MAX_SAFE_INTEGER],
        limit = 10,
    } = query;
    // 限制查询的时间范围
    const inDuration = db.filter((p) =>
        p.timestamp >= duration[0] && p.timestamp <= duration[1]
    );
    // 根据`where`数组的条件进行查询，多个重复的`key`搜索出的结果都会保留
    const result = where
        .map(([key, re]) =>
            condition(key)
                // 对于uuid，禁止通过一个表达式查询到多个结果
                .match(
                    "uuid",
                    () => {
                        const matched = inDuration.filter((p) =>
                            re.exec(p.uuid)
                        );
                        if (matched.length > 1) return [];
                        return matched;
                    },
                )
                // 对于title和introduction，直接根据正则表达匹配
                .match(
                    ["title", "introduction"],
                    (key) =>
                        inDuration.filter((p) =>
                            re.exec(p[key as "title" | "introduction" | "uuid"])
                        ),
                )
                // 对于authors和tags，检查数组中是否有符合目标的值
                .match(
                    ["authors", "tags"],
                    (key) =>
                        inDuration.filter((p) =>
                            Boolean(
                                p[key as "authors" | "tags"].filter(re.exec)
                                    .length,
                            )
                        ),
                )
                .withDefault(() => [])
        )
        // 消去重复的值，和并为一个一维数组
        .reduce((currentResult, resultOfNextKey) => {
            const resultToAppend = resultOfNextKey.filter((p) =>
                !currentResult.includes(p)
            );
            return [...currentResult, ...resultToAppend];
        }, [])
        // 按时间顺序排列
        .sort((p1, p2) =>
            sort === "asc"
                ? p1.timestamp.getTime() - p2.timestamp.getTime()
                : p2.timestamp.getTime() - p1.timestamp.getTime()
        )
        // 裁取给定的长度
        .slice(0, limit);
    return result;
}

// Document root
const root = resolve(Deno.cwd(), "docs");

// find posts from fs
async function findPostRecursively(targetPath: string): Promise<Post[]> {
    // 查找子目录中的Post
    let subPosts: Post[] = [];
    for await (const entry of Deno.readDir(resolve(root, targetPath))) {
        if (entry.isDirectory) {
            const postsInDir = await findPostRecursively(
                resolve(targetPath, entry.name),
            );
            subPosts = [...subPosts, ...postsInDir];
        }
    }
    // 检查当前目录是否是Post
    const [indexMDStat, metaJSONStat, uuidStat] = await Promise.all(
        ["index.md", "meta.json", ".uuid"].map((filename) =>
            Deno.stat(resolve(root, targetPath, filename)).catch(() => null)
        ),
    );
    // 如果存在meta.json或index.md中的任意一个，但不存在另一个，或者都存在但其中一个不是文件时，退出程序
    if (
        isVoid(metaJSONStat) !== isVoid(indexMDStat) ||
        metaJSONStat?.isFile !== indexMDStat?.isFile
    ) {
        console.log(
            `Error: A post need has both file index.md and file meta.json. Post directory: ${targetPath}`,
        );
        return subPosts;
    }
    if (metaJSONStat?.isFile) {
        const metaJSON = await Deno.readTextFile(
            resolve(root, targetPath, "meta.json"),
        );
        try {
            const meta = metaParser(metaJSON);
            if (meta === undefined) {
                throw new Error(
                    `Meta info in ${targetPath} is invalid. Schema check error: \n${
                        JSON.stringify(ajv.errors)
                    }`,
                );
            }
            const timestamp = indexMDStat?.mtime ?? new Date();
            if (isVoid(uuidStat)) {
                await Deno.writeTextFile(
                    resolve(root, targetPath, ".uuid"),
                    crypto.randomUUID(),
                );
            }
            const uuid = await Deno.readTextFile(
                resolve(root, targetPath, ".uuid"),
            );
            return [...subPosts, {
                uuid,
                timestamp,
                ...meta,
                directory: targetPath,
            }];
        } catch (errors) {
            console.log(`Error happend when parse Post in ${targetPath}, ignore it.`);
            console.log(errors);
            return subPosts
        }
    }
    return subPosts;
}

// init db and return amount of posts
export async function initDB(): Promise<number> {
    memoryDB = await findPostRecursively(".");
    return memoryDB.length;
}
