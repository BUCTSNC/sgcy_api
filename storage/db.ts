import "../global.d.ts";
import { path } from "../deps/std.ts";
import { isVoid } from "../deps/freesia.ts";
import { root } from "../constant.ts";
import { ajv, metaParser, Post } from "../types/post.ts";

const { join } = path;
type MemoryDB = Post[];

export let memoryDB: MemoryDB = [];

// find posts from fs
async function findPostRecursively(
    targetPath: string[],
    strict = false,
): Promise<Post[]> {
    // 查找子目录中的Post
    let subPosts: Post[] = [];
    for await (const entry of Deno.readDir(join(root, ...targetPath))) {
        if (entry.isDirectory) {
            const postsInDir = await findPostRecursively(
                [...targetPath, entry.name],
                strict,
            );
            subPosts = [...subPosts, ...postsInDir];
        }
    }
    // 检查当前目录是否是Post
    const [indexMDStat, metaYMLStat, uuidStat] = await Promise.all(
        ["index.md", "meta.yml", ".uuid"].map((filename) =>
            Deno.stat(join(root, ...targetPath, filename)).catch(() => null)
        ),
    );
    // 如果存在meta.json或index.md中的任意一个，但不存在另一个，或者都存在但其中一个不是文件时，退出程序
    if (
        isVoid(metaYMLStat) !== isVoid(indexMDStat) ||
        metaYMLStat?.isFile !== indexMDStat?.isFile
    ) {
        console.log(
            `Error: A post need has both file index.md and file meta.yml. Post directory: ${targetPath}`,
        );
        if (strict) Deno.exit(1);
        return subPosts;
    }
    if (metaYMLStat?.isFile) {
        const metaYML = await Deno.readTextFile(
            join(root, ...targetPath, "meta.yml"),
        );
        try {
            const meta = metaParser(metaYML);
            if (meta === undefined) {
                throw new Error(
                    `Meta info in ${
                        targetPath.join("/")
                    } is invalid. Schema check error: \n${
                        JSON.stringify(ajv.errors)
                    }`,
                );
            }
            const timestamp = indexMDStat?.mtime ?? new Date();
            if (isVoid(uuidStat)) {
                await Deno.writeTextFile(
                    join(root, ...targetPath, ".uuid"),
                    crypto.randomUUID(),
                );
            }
            const uuid = await Deno.readTextFile(
                join(root, ...targetPath, ".uuid"),
            );
            return [...subPosts, {
                uuid,
                timestamp,
                ...meta,
                category: targetPath,
            }];
        } catch (errors) {
            console.log(
                `Error happend when parse Post in ${
                    targetPath.join("/")
                }, ignore it.`,
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
    memoryDB = await findPostRecursively(["."], strict);
    console.log(
        `${new Date().toLocaleString()} ${memoryDB.length} posts detected.`,
    );
}
