import { httpStatus, path, readableStreamFromReader } from "../deps/std.ts";
import {
    Computation,
    compute,
    createEffect,
    createRes,
    isVoid,
    parseURL,
} from "../deps/freesia.ts";
import { lookup } from "../deps/mediaTypes.ts";
import { escapeStringRegExp } from "../deps/escapeStringRegExp.ts";
import { metaQuery } from "../services/metaQuery.ts";
import { exact } from "../utils/RegExpUtils.ts";
import { root } from "../constant.ts";
import { logVisit } from "../storage/logger.ts";
import { validate } from "../services/ticket.ts";
import { Post } from "../types/post.ts";

const { join, extname } = path;

export function getPostMeta(uuid: string): Post | null {
    const results = metaQuery({
        where: [
            ["uuid", exact(uuid)],
        ],
    });
    return results.length === 1 ? results[0] : null;
}

function getPostPath(uuid: string): string | null {
    return compute(getPostMeta(uuid))
        .mapSkipNull((post) => join(root, ...post.category)).value;
}

export const getPostFile = (
    params: { uuid: string; filepath: string },
): Computation<Promise<Deno.FsFile | null>> =>
    compute(getPostPath(params.uuid))
        .mapSkipNull(escapeStringRegExp)
        .mapSkipNull((postPath) => join(postPath, decodeURI(params.filepath)))
        .mapSkipNull((fullPath) =>
            Deno.open(fullPath, { read: true, write: false }).catch(() => null)
        )
        .aMapSkipNull(async (file) => {
            const stat = await file.stat();
            if (stat.isFile) return file;
            return null;
        });

const postFileHandler = (
    params: { uuid: string; filepath: string },
    _req: Request,
) => getPostFile(params)
    .aMapSkipNull(readableStreamFromReader)
    .aMap(
        (result) =>
            result === null
                ? createRes(
                    httpStatus.NotFound,
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
                (await res).status === httpStatus.OK
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
