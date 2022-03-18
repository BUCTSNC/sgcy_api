import "../global.d.ts";
import { path } from "../deps/std.ts";
import { isVoid, memoryCache } from "../deps/freesia.ts";
import { postRoot } from "../constant.ts";
import {
    metaParser,
    PostInDB,
    PostSend,
    visitLogParser,
    visitLogSerializer,
} from "../types/post.ts";
import { getDateStamp } from "../services/datestamp.ts";
import { createWrapper } from "https://deno.land/x/freesia@v1.1.2/mod.ts";
import { sleep } from "../services/sleep.ts";

const { join } = path;
type MemoryDB = PostInDB[];

export let memoryDB: MemoryDB = [];

async function checkFileStatus(fullpath: string) {
    return Deno.stat(fullpath).then(
        (stat) => stat.isFile ? stat : null,
    ).catch(() => null);
}

async function loadUUID(category: string[]) {
    const fullpath = join(postRoot, ...category, ".uuid");
    const stat = await checkFileStatus(fullpath);
    if (stat === null) {
        await Deno.writeTextFile(fullpath, crypto.randomUUID());
    }
    return Deno.readTextFile(fullpath);
}

async function loadPostMeta(category: string[]) {
    const fullpath = join(postRoot, ...category, "meta.yml");
    return Deno.readTextFile(fullpath)
        .then(metaParser)
        .then((meta) => {
            if (isVoid(meta)) {
                throw new Error(
                    `Failed to parse meta.yml in ${category.join("/")}`,
                );
            }
            return meta;
        });
}

async function loadPostVisited(category: string[]) {
    const fullpath = join(postRoot, ...category, ".visited.json");
    const stat = await checkFileStatus(fullpath);
    if (stat === null) {
        await Deno.writeTextFile(
            fullpath,
            visitLogSerializer({
                [getDateStamp()]: 0,
            }),
        );
    }
    return Deno.readTextFile(fullpath)
        .then(visitLogParser)
        .then((visited) => {
            if (isVoid(visited)) {
                throw new Error(
                    `Failed to parse meta.yml in ${category.join("/")}`,
                );
            }
            return visited;
        });
}

async function composePostMeta(
    category: string[],
    mtime: Date,
): Promise<PostInDB> {
    const [uuid, meta, visited] = await Promise.all(
        [loadUUID(category), loadPostMeta(category), loadPostVisited(category)],
    );
    return { ...meta, uuid, category, visited, timestamp: mtime };
}

async function findPostsRecursively(
    categroy: string[],
    strictMode = false,
): Promise<PostInDB[]> {
    let posts: PostInDB[] = [];
    for await (const entry of Deno.readDir(join(postRoot, ...categroy))) {
        try {
            if (entry.name === "index.md" && entry.isFile) {
                const { mtime } = await Deno.stat(
                    join(postRoot, ...categroy, entry.name),
                );
                const post = await composePostMeta(
                    categroy,
                    mtime ?? new Date(),
                );
                posts = [...posts, post];
            }
            if (entry.isDirectory) {
                const subPosts = await findPostsRecursively([
                    ...categroy,
                    entry.name,
                ]);
                posts = [...posts, ...subPosts];
            }
        } catch (err) {
            console.error(err);
            if (strictMode) Deno.exit(1);
        }
    }
    return posts;
}

async function rebuildDB(strictMode = false) {
    const db = await findPostsRecursively([], strictMode);
    memoryDB = db.sort((postA, postB) =>
        postA.timestamp.getTime() - postB.timestamp.getTime()
    );
    return memoryDB;
}

export async function watchDir(minInterval = 1000, strictMode = false) {
    const watcher = Deno.watchFs(postRoot);
    await rebuildDB();
    let lastEvent: Deno.FsEvent;
    const throttledRebuilder = createWrapper<
        typeof rebuildDB,
        (event: Deno.FsEvent, strictMode: boolean) => Promise<MemoryDB>
    >(
        async (event, strictMode) => {
            // 当变更路径中存在.visited.json时，认为事件出发原因是访问记录被更新，这不会导致更新
            if (
                event.paths.reduce(
                    (current, next) =>
                        current || Boolean(next.match(/(\.visited\.json)$/)),
                    false,
                )
            ) {
                return [null, async () => memoryDB];
            }
            // 将本次事件绑定到lastEvent上
            lastEvent = event;
            // 等待若干时常
            await sleep(minInterval);
            // lastEvent在等待期间没有被更新，调用函数重建main.js
            if (event === lastEvent) {
                return [[strictMode]];
            } // lastEvent在等待期间被刷新了，让后续事件来调用函数
            else return [null, async () => memoryDB];
        },
    )(rebuildDB);

    for await (const event of watcher) {
        throttledRebuilder(event, strictMode);
    }
}

export function logVisit(uuid: string) {
    const post = memoryDB.find((p) => p.uuid === uuid);
    if (!isVoid(post)) {
        const today = getDateStamp();
        if (today in post.visited) post.visited[today] += 1;
        else post.visited[today] = 1;
        Deno.writeTextFile(
            join(postRoot, ...post.category, ".visited.json"),
            visitLogSerializer(post.visited),
        );
    }
}

function getHot(
    inDays: number,
    pageSize: number,
    index: number,
): PostSend[] {
    const postsWithAmount = memoryDB.map((post) => DBtoSend(post, inDays))
        .sort((postA, postB) => postA.amount - postB.amount)
        .slice(index * pageSize, (index + 1) * pageSize);
    return postsWithAmount;
}

// 每次运行getHot后，相同的参数在一分钟内返回的是缓存的值
export const getHotWithCache = memoryCache(getHot, 60 * 1000);

export function DBtoSend(post: PostInDB, visitedInDays: number): PostSend {
    const todayNum = Number(getDateStamp());
    const datestamps: string[] = new Array<number>(visitedInDays).fill(todayNum)
        .map((
            value,
            index,
        ) => value - index).map(String);
    const amount = datestamps.map((datestamp) => post.visited[datestamp] ?? 0)
        .reduce((sum, next) => sum + next, 0);
    const { visited: _visited, ...otherProps } = post;
    return { ...otherProps, amount };
}
