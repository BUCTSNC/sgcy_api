// @deno-types: "https://deno.land/x/esbuild@v0.14.25/mod.ts";
import * as esbuild from "https://deno.land/x/esbuild@v0.14.25/mod.js";

console.log("started");

export const mainJS = await Deno.emit("./views/main.tsx", {
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
    .then((result) => result.files["deno:///bundle.js"]);

console.log("emitted");

await esbuild.transform(mainJS, {
    minify: true, minifyWhitespace: true, minifyIdentifiers: true, minifySyntax: true,
    format: "esm", treeShaking: true
}).then(content => {
    return Deno.writeTextFile("static/main.js", content.code);
});

// await Deno.writeTextFile("static/main.js", mainJS);

Deno.exit(0);