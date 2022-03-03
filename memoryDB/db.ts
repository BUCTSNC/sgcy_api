import { resolve } from "https://deno.land/std@0.127.0/path/win32.ts";
import { isVoid } from "https://deno.land/x/freesia@v1.0.6/mod.ts";
import { root } from "../server.ts";
import { ajv, metaParser, Post } from "./post.ts";

type MemoryDB = Post[];

export let memoryDB: MemoryDB = [];

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
            console.log(
                `Error happend when parse Post in ${targetPath}, ignore it.`,
            );
            console.log(errors);
            return subPosts;
        }
    }
    return subPosts;
}

// init db and return amount of posts
export async function initDB(): Promise<number> {
    memoryDB = await findPostRecursively(".");
    return memoryDB.length;
}
