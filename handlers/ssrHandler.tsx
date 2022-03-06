import { extname, join } from "https://deno.land/std@0.127.0/path/mod.ts";
import { readableStreamFromReader } from "https://deno.land/std@0.127.0/streams/mod.ts";
import { compute, createRes, createSwRtX, isVoid } from "https://deno.land/x/freesia@v1.0.8/mod.ts";
import { lookup } from "https://deno.land/x/media_types@v2.12.2/mod.ts";
import { renderToString } from "https://esm.sh/react-dom@17.0.2/server";
import React from "https://esm.sh/react@17.0.2";
import { staticRoot } from "../constant.ts";
import App from "../views/App.tsx";

const staticFileHandler = async (url: string): Promise<ReadableStream<Uint8Array> | null> => {
    return compute(join(staticRoot, url))
        .mapSkipNull(fullPath => Deno.open(fullPath).catch(() => null))
        .aMapSkipNull(async file => (await file.stat().catch(() => null))?.isFile ? file : null)
        .aMapSkipNull(file => readableStreamFromReader(file))
        .value;
};

const ssrHandler = async (url: string, req: Request) => {
    const staticFile = await staticFileHandler(url);
    if (!isVoid(staticFile)) return createRes(staticFile, ["Content-Type", lookup(extname(url)) ?? "application/octect-stream"]);
    return createRes(
        renderToString(
            <App url={url} method={req.method} />
        ), [
        "Content-Type", "text/html; charset=UTF-8"
    ]);
};

export default ssrHandler;
