import {
    compute,
    createEffect,
    createRes,
    parseURL,
    Respond,
} from "https://deno.land/x/freesia@v1.0.6/mod.ts";
import { Status } from "https://deno.land/std@0.127.0/http/http_status.ts";
import { extname, join } from "https://deno.land/std@0.127.0/path/mod.ts";
import { readableStreamFromReader } from "https://deno.land/std@0.127.0/streams/mod.ts";
import { lookup } from "https://deno.land/x/media_types@v2.12.2/mod.ts";
import { metaQuery } from "../memoryDB/metaQuery.ts";
import { exact } from "../utils/RegExpUtils.ts";
import { root } from "../server.ts";
import escapeStringRegExp from "https://esm.sh/escape-string-regexp";
import { logVisit } from "../memoryDB/logger.ts";

function getPostPath(uuid: string): string | null {
    const result = metaQuery({
        where: [
            ["uuid", exact(uuid)],
        ],
    });
    if (result.length === 1) return join(root, result[0].directory);
    else return null;
}

const postFileHandler = (
    params: { uuid: string; filepath: string },
    _req: Request,
): Promise<Respond> =>
    compute(getPostPath(params.uuid))
        .mapSkipNull(escapeStringRegExp)
        .mapSkipNull((postPath) => join(postPath, params.filepath))
        .mapSkipNull((fullPath) =>
            Deno.open(fullPath, { read: true, write: false }).catch(() => null)
        )
        .aMapSkipNull(async (file) => {
            const stat = await file.stat();
            if (stat.isFile) return file;
            return null;
        })
        .aMapSkipNull(readableStreamFromReader)
        .aMap(
            (result) =>
                result === null
                    ? createRes(
                        Status.NotFound,
                        `No such file ${params.filepath} in archive ${params.uuid}`,
                    )
                    : createRes(result, {
                        "Content-Type": lookup(extname(params.filepath)) ??
                            "application/octect-stream",
                    }),
        )
        .value;

const visitLogger = createEffect<typeof postFileHandler>(
    ({ uuid, filepath }, req) =>
        async (res) => {
            if (
                filepath === "index.md" &&
                parseURL(req).searchParams.get("firstVisit") !== null &&
                (await res).status === Status.OK
            ) {
                logVisit(uuid);
            }
        },
);

export default visitLogger(postFileHandler);
