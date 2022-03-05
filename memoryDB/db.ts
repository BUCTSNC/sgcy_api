import { join } from "https://deno.land/std@0.127.0/path/mod.ts";
import { isVoid } from "https://deno.land/x/freesia@v1.0.8/mod.ts";
import { root } from "../constant.ts";
import { ajv, metaParser, Post } from "./post.ts";

type MemoryDB = Post[];

export let memoryDB: MemoryDB = [];

// find posts from fs
async function findPostRecursively(
    targetPath: string,
    strict = false,
): Promise<Post[]> {
    // 查找子目录中的Post
    let subPosts: Post[] = [];
    for await (const entry of Deno.readDir(join(root, targetPath))) {
        if (entry.isDirectory) {
            const postsInDir = await findPostRecursively(
                join(targetPath, entry.name),
            );
            subPosts = [...subPosts, ...postsInDir];
        }
    }
    // 检查当前目录是否是Post
    const [indexMDStat, metaJSONStat, uuidStat] = await Promise.all(
        ["index.md", "meta.json", ".uuid"].map((filename) =>
            Deno.stat(join(root, targetPath, filename)).catch(() => null)
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
        if (strict) Deno.exit(1);
        return subPosts;
    }
    if (metaJSONStat?.isFile) {
        const metaJSON = await Deno.readTextFile(
            join(root, targetPath, "meta.json"),
        );
        try {
            const meta = metaParser(metaJSON);
            if (meta === undefined) {
                throw new Error(
                    `Meta info in ${targetPath} is invalid. Schema check error: \n${JSON.stringify(ajv.errors)
                    }`,
                );
            }
            const timestamp = indexMDStat?.mtime ?? new Date();
            if (isVoid(uuidStat)) {
                await Deno.writeTextFile(
                    join(root, targetPath, ".uuid"),
                    crypto.randomUUID(),
                );
            }
            const uuid = await Deno.readTextFile(
                join(root, targetPath, ".uuid"),
            );
            return [...subPosts, {
                uuid,
                timestamp,
                ...meta,
                directory: targetPath,
            }];
        } catch (errors) {
            console.log(
                `Error happend when parse Post in ${targetPath}, ignore it.`,
            );
            console.log(errors);
            if (strict) Deno.exit(1);
            return subPosts;
        }
    }
    return subPosts;
}

// init db and return amount of posts
export async function initDB(strict = false) {
    memoryDB = await findPostRecursively(".", strict);
    console.log(
        `${new Date().toLocaleString()} ${memoryDB.length} posts detected.`,
    );
}
