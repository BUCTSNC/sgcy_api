import { extname, join } from "std/path/mod.ts";
import { Status } from "std/http/http_status.ts";
import { readableStreamFromReader } from "std/streams/mod.ts";
import { compute, createRes, createSwRtX, Get, Respond } from "freesia";
import { lookup } from "media_types";
import React from "react";
import { StaticRouter } from "react-router-dom";
import { renderToString } from "ReactDOMServer";
import { staticRoot } from "../constant.ts";
import App from "../views/App.tsx";

const indexHTML = `
<!DOCTYPE html>
<html>
  <head>
    <title>胜古朝阳</title>
    <meta charset="UTF-8" />
  </head>

  <body>
    <script src="/main.js" type="module"></script>
    <div id="App">
      <!-- SSR -->
    </div>
  </body>
</html>
`;

const indexHandler = async () =>
    createRes(indexHTML, ["Content-Type", "text/html; charset=UTF-8"]);

const mainJS = await Deno.emit("./views/main.tsx", {
    bundle: "module",
    compilerOptions: {
        target: "esnext",
        module: "esnext",
        lib: ["dom", "dom.iterable", "dom.asynciterable", "deno.ns"],
        sourceMap: false,
        removeComments: true,
    },
})
    .then((result) => result.files["deno:///bundle.js"]);

const mainJSHandler = async () => {
    return createRes(mainJS, ["Content-Type", "application/javascript"]);
};

const staticFileHandler = async (
    params: { filepath: string },
): Promise<Respond> => {
    return compute(join(staticRoot, params.filepath))
        .mapSkipNull((fullPath) => Deno.open(fullPath).catch(() => null))
        .aMapSkipNull(async (file) =>
            (await file.stat().catch(() => null))?.isFile ? file : null
        )
        .aMapSkipNull((file) => readableStreamFromReader(file))
        .aMapSkipNull((stream) =>
            createRes(stream, [
                "Content-Type",
                lookup(extname(params.filepath)) ?? "application/octect-stream",
            ])
        )
        .aIfNull(() =>
            createRes(Status.NotFound, `No such file ${params.filepath}`)
        )
        .value;
};

const ssrHandler = async (url: string, req: Request) => {
    return createRes(
        indexHTML.replace(
            "<!-- SSR -->",
            renderToString(
                <StaticRouter location={url}>
                    <App></App>
                </StaticRouter>,
            ),
        ),
        [
            "Content-Type",
            "text/html; charset=UTF-8",
        ],
    );
};

const { switcher } = createSwRtX
    .route("/index.html", Get(indexHandler))
    .route("/main.js", Get(mainJSHandler))
    .route("/static/<filepath>", Get(staticFileHandler))
    .fallback(ssrHandler);

const fileAndSSRHandler = switcher;

export default fileAndSSRHandler;
