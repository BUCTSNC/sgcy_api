import { extname, join } from "std/path/mod.ts";
import { Status } from "std/http/http_status.ts";
import { readableStreamFromReader } from "std/streams/mod.ts";
import { compute, createRes, Respond } from "freesia";
import { lookup } from "media_types";
import { staticRoot } from "../constant.ts";

export const indexHTML = `
<!DOCTYPE html>
<html>
  <head>
    <title>胜古朝阳</title>
    <meta charset="UTF-8" />
  </head>

  <body>
    <script src="/static/main.js" type="module"></script>
    <div id="App">
      <!-- SSR -->
    </div>
  </body>
</html>
`;

export const indexHandler = async () =>
  createRes(indexHTML, ["Content-Type", "text/html; charset=UTF-8"]);

export const staticFileHandler = async (
  params: { filepath: string; },
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
