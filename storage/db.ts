import "../global.d.ts";
import { path } from "../deps/std.ts";
import { createProxy, isVoid, memoryCache } from "../deps/freesia.ts";
import { postRoot } from "../constant.ts";
import {
    metaParser,
    PostInDB,
    PostSend,
    visitLogParser,
    visitLogSerializer,
} from "../types/post.ts";
import { getDateStamp } from "../services/datestamp.ts";
import { sleep } from "../services/sleep.ts";

const { join } = path;
type MemoryDB = PostInDB[];

export let memoryDB: MemoryDB = [];

async function checkFileStatus(fullpath: string) {
    return Deno.stat(fullpath).then(
        (stat) => stat.isFile ? stat : null,
    ).catch(() => null);
}

async function loadUUID(target: string[]) {
    const fullpath = join(postRoot, ...target, ".uuid");
    const stat = await checkFileStatus(fullpath);
    if (stat === null) {
        await Deno.writeTextFile(fullpath, crypto.randomUUID());
    }
    return Deno.readTextFile(fullpath);
}

async function loadPostMeta(target: string[]) {
    const fullpath = join(postRoot, ...target, "meta.yml");
    return Deno.readTextFile(fullpath)
        .then(metaParser)
        .then((meta) => {
            if (isVoid(meta)) {
                throw new Error(
                    `Failed to parse meta.yml in ${target.join("/")}`,
                );
            }
            return meta;
        });
}

async function loadPostVisited(target: string[]) {
    const fullpath = join(postRoot, ...target, ".visited.json");
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
                    `Failed to parse meta.yml in ${target.join("/")}`,
                );
            }
            return visited;
        });
}

async function composePostMeta(
    target: string[],
    mtime: Date,
): Promise<PostInDB> {
    const [uuid, meta, visited] = await Promise.all(
        [loadUUID(target), loadPostMeta(target), loadPostVisited(target)],
    );
    return { ...meta, uuid, visited, target, timestamp: mtime };
}

async function findPostsRecursively(
    target: string[],
    strictMode = false,
): Promise<PostInDB[]> {
    let posts: PostInDB[] = [];
    for await (const entry of Deno.readDir(join(postRoot, ...target))) {
        try {
            if (entry.name === "index.md" && entry.isFile) {
                const { mtime } = await Deno.stat(
                    join(postRoot, ...target, entry.name),
                );
                const post = await composePostMeta(
                    target,
                    mtime ?? new Date(),
                );
                posts = [...posts, post];
            }
            if (entry.isDirectory) {
                const subPosts = await findPostsRecursively([
                    ...target,
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

export async function rebuildDB(strictMode = false) {
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
    const throttledRebuilder = createProxy<
        typeof rebuildDB,
        (event: Deno.FsEvent, strictMode: boolean) => Promise<MemoryDB>
    >(
        async (event, strictMode) => {
            // ????????????????????????.visited.json??????????????????????????????????????????????????????????????????????????????
            if (
                event.paths.reduce(
                    (current, next) =>
                        current || Boolean(next.match(/(\.visited\.json)$/)),
                    false,
                )
            ) {
                return [null, async () => memoryDB];
            }
            // ????????????????????????lastEvent???
            lastEvent = event;
            // ??????????????????
            await sleep(minInterval);
            // lastEvent???????????????????????????????????????????????????main.js
            if (event === lastEvent) {
                return [[strictMode], (result) => result];
            } // lastEvent????????????????????????????????????????????????????????????
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
            join(postRoot, ...post.target, ".visited.json"),
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

// ????????????getHot????????????????????????????????????????????????????????????
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
