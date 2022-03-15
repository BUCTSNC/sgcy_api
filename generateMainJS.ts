import * as esbuild from "https://deno.land/x/esbuild@v0.14.25/mod.js";
import { createWrapper } from "https://deno.land/x/freesia@v1.1.2/mod.ts";

const watcher = Deno.watchFs("./views", { recursive: true });
console.log("Watcher created.");

const fsEventHandler = () => {
    console.log(`Rebuild main.js`);
    return Deno.emit("./views/main.tsx", {
        bundle: "module",
        compilerOptions: {
            inlineSourceMap: true,
            target: "esnext",
            module: "esnext",
            lib: ["dom", "dom.iterable", "dom.asynciterable", "deno.ns"],
            sourceMap: true,
            removeComments: true,
        },
    })
        .then((result) => result.files["deno:///bundle.js"])
        .then((mainJS) =>
            esbuild.transform(mainJS, {
                minify: Deno.env.get("mode") === "production",
                format: "esm",
                treeShaking: true,
            })
        )
        .then((content) => {
            return Deno.writeTextFile("static/main.js", content.code);
        });
};

const sleep = <T>(timeout: number, data?: T) =>
    new Promise<T | undefined>((res, _rej) => {
        setTimeout(() => res(data), timeout);
    });

let lastEvent: Deno.FsEvent;

const throttle = (waitToExec: number) =>
    createWrapper<
        typeof fsEventHandler,
        (event: Deno.FsEvent) => Promise<void>
    >(
        async (event) => {
            console.log(`${event.kind} ${event.paths}.`);
            // 将本次事件绑定到lastEvent上
            lastEvent = event;
            // 等待若干时常
            await sleep(waitToExec);
            // lastEvent在等待期间没有被更新，调用函数重建main.js
            if (event === lastEvent) {
                return [[], async (_void) => {
                    await _void;
                    console.log("Rebuild finished.");
                }];
            } // lastEvent在等待期间被刷新了，让后续事件来调用函数
            else return [null, async () => {}];
        },
    );

const throttled = throttle(1000)(fsEventHandler);

for await (const event of watcher) {
    throttled(event);
}
