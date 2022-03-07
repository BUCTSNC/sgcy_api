import { Status } from "std/http/http_status.ts";
import { extname, join } from "std/path/mod.ts";
import { readableStreamFromReader } from "std/streams/mod.ts";
import {
    compute,
    createEffect,
    createRes,
    isVoid,
    parseURL,
    Respond,
} from "freesia";
import { lookup } from "media_types";
import escapeStringRegExp from "escaep_string_regexp";
import { metaQuery } from "../memoryDB/metaQuery.ts";
import { exact } from "../utils/RegExpUtils.ts";
import { root } from "../constant.ts";
import { logVisit } from "../memoryDB/logger.ts";
import { validate } from "../services/ticket.ts";

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
            const searchParams = parseURL(req).searchParams;
            if (
                filepath === "index.md" &&
                searchParams.get("firstVisit") !== null &&
                (await res).status === Status.OK
            ) {
                const secret = searchParams.get("secret");
                const signature = searchParams.get("signature");
                if (
                    !isVoid(secret) && !isVoid(signature) &&
                    await validate(secret, signature)
                ) {
                    logVisit(uuid);
                }
            }
        },
);

export default visitLogger(postFileHandler);
