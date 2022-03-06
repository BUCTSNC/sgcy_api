import { extname, join } from "std/path/mod.ts";
import { readableStreamFromReader } from "std/streams/mod.ts";
import {
    compute,
    createRes,
    isVoid,
} from "freesia";
import { lookup } from "media_types";
import { renderToString } from "ReactDOMServer";
import { staticRoot } from "../constant.ts";
import App from "../views/App.tsx";

const staticFileHandler = async (
    url: string,
): Promise<ReadableStream<Uint8Array> | null> => {
    return compute(join(staticRoot, url))
        .mapSkipNull((fullPath) => Deno.open(fullPath).catch(() => null))
        .aMapSkipNull(async (file) =>
            (await file.stat().catch(() => null))?.isFile ? file : null
        )
        .aMapSkipNull((file) => readableStreamFromReader(file))
        .value;
};

const ssrHandler = async (url: string, req: Request) => {
    const staticFile = await staticFileHandler(url);
    if (!isVoid(staticFile)) {
        return createRes(staticFile, [
            "Content-Type",
            lookup(extname(url)) ?? "application/octect-stream",
        ]);
    }
    return createRes(
        renderToString(
            App({ url, method: req.method })
        ),
        [
            "Content-Type",
            "text/html; charset=UTF-8",
        ],
    );
};

export default ssrHandler;
