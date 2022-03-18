import { httpStatus, path, readableStreamFromReader } from "../deps/std.ts";
import { compute, createRes, Respond } from "../deps/freesia.ts";
import { lookup } from "../deps/mediaTypes.ts";
import { staticRoot } from "../constant.ts";
import { __dirname } from "../utils/parseImportUrl.ts";

const { join, extname } = path;

export const indexHTML = await Deno.readTextFile(join(__dirname(import.meta.url), '..', 'index.html'));

export const indexHandler = async () =>
    createRes(indexHTML, ["Content-Type", "text/html; charset=UTF-8"]);

export const staticFileHandler = async (
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
            createRes(httpStatus.NotFound, `No such file ${params.filepath}`)
        )
        .value;
};
