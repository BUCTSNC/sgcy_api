import { memoryDB, rebuildDB } from "./storage/db.ts";
import { path } from "./deps/std.ts";
import { getSSRDataHandler, ssrHandler } from "./handlers/SSRHandler.tsx";
import { StateSerializer } from "./types/state.ts";
import { fsEventHandler } from "./generateMainJS.ts";

const ssgRoot = path.join(Deno.cwd(), "ssg");

async function createSSGDirectories() {
    await Deno.mkdir(ssgRoot).catch(() => null);
    await Promise.all(
        [
            Deno.mkdir(path.join(ssgRoot, "p")),
            Deno.mkdir(path.join(ssgRoot, "cate")),
            Deno.mkdir(path.join(ssgRoot, "tag")),
        ],
    ).catch(() => null);
}

async function copyFileR(source: string, target: string) {
    const stat = await Deno.stat(source);
    if (stat.isDirectory) {
        await Deno.mkdir(target).catch(() => null);
        for await (const entry of Deno.readDir(source)) {
            await copyFileR(
                path.join(source, entry.name),
                path.join(target, entry.name),
            );
        }
    } else {
        await Deno.copyFile(source, target);
    }
}

async function BuildPostDir(uuids: string[]) {
    for (const uuid of uuids) {
        const postDir = path.join(ssgRoot, "p", uuid);
        const post = memoryDB.find((post) => post.uuid === uuid)!;
        const originDir = path.join("docs", ...post.category);
        copyFileR(originDir, postDir);
        const [_status, html] = await ssrHandler(`/p/${uuid}/`);
        if (html === undefined || html === null) {
            console.log(`Failed to generate html for ${originDir}`);
        } else await Deno.writeTextFile(path.join(postDir, "index.html"), html);
        const stateData = await getSSRDataHandler(`/p/${uuid}/`);
        await Deno.writeTextFile(path.join(postDir, "ssgdata"), StateSerializer(stateData));
    }
}

async function BuildTagDir(tags: string[]) {
    for (const tag of tags) {
        const tagDir = path.join(ssgRoot, "tag", tag);
        await Deno.mkdir(tagDir).catch(() => null);
        const [_status, html] = await ssrHandler(`/tag/${tag}/`);
        if (html === undefined || html === null) {
            console.log(`Failed to generate html for ${tag}`);
        } else await Deno.writeTextFile(path.join(tagDir, "index.html"), html);
        const stateData = await getSSRDataHandler(`/tag/${tag}/`);
        await Deno.writeTextFile(path.join(tagDir, "ssgdata"), StateSerializer(stateData));
    }
}

async function BuildCateDir(cates: string[]) {
    for (const cate of cates) {
        const cateDir = path.join(ssgRoot, "cate", cate);
        await Deno.mkdir(cateDir).catch(() => null);
        const [_status, html] = await ssrHandler(`/cate/${cate}`);
        if (html === undefined || html === null) {
            console.log(`Failed to generate html for ${cate}`);
        } else await Deno.writeTextFile(path.join(cateDir, "index.html"), html);
        const stateData = await getSSRDataHandler(`/cate/${cate}/`);
        await Deno.writeTextFile(path.join(cateDir, "ssgdata"), StateSerializer(stateData));
    }
}

await rebuildDB();

const posts = memoryDB.map((post) => post.uuid);
const tags = memoryDB.map((post) => post.tags)
    .flat(1)
    .reduce((all, next) => {
        if (all.includes(next)) return all;
        else return [...all, next];
    }, [] as string[]);
const cates = memoryDB.map((post) => post.category[0])
    .flat(1)
    .reduce((all, next) => {
        if (all.includes(next)) return all;
        else return [...all, next];
    }, [] as string[]);

await fsEventHandler();
await createSSGDirectories();
console.log("Directory created");
await BuildPostDir(posts);
console.log("Posts generated");
await BuildCateDir(cates);
console.log("Cate generated");
await BuildTagDir(tags);
console.log("Tag created");
await copyFileR("./static", path.join(ssgRoot, "static"));
console.log("static files copied");
const [_status, HomePageHTML] = await ssrHandler("/");
const state = await getSSRDataHandler("/");
if (typeof HomePageHTML === "string") {
    await Deno.writeTextFile(path.join(ssgRoot, "index.html"), HomePageHTML);
    await Deno.writeTextFile(path.join(ssgRoot, "ssgdata"), StateSerializer(state));
}
console.log("index.html copied.");
console.log("Finished");
Deno.exit(0);
