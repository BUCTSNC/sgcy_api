import * as esbuild from "https://deno.land/x/esbuild@v0.14.25/mod.js";
import {createWrapper} from "https://deno.land/x/freesia@v1.1.2/mod.ts"

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
                minify: true,
                minifyWhitespace: true,
                minifyIdentifiers: true,
                minifySyntax: true,
                format: "esm",
                treeShaking: true,
            })
        )
        .then((content) => {
            return Deno.writeTextFile("static/main.js", content.code);
        });
};

const sleep = <T>(timeout: number, data?: T) => new Promise<T | undefined>((res, _rej) => {
    setTimeout(() => res(data), timeout)
})

let updatedFlag = Symbol();

const throttle = (waitToExec: number) => createWrapper<typeof fsEventHandler, (event: Deno.FsEvent) => Promise<void>>(
    async (event) => {
        console.log(`${event.kind} ${event.paths}.`)
        const currentSymbol = Symbol();
        updatedFlag = currentSymbol;
        await sleep(waitToExec);
        if(currentSymbol === updatedFlag) return [[], async (_void) => {
            await _void;
            console.log("Rebuild finished.")
        }]
        else return [null, async () => {}]
    }
)

const throttled = throttle(1000)(fsEventHandler)

for await (const event of watcher) {
    throttled(event)
}
