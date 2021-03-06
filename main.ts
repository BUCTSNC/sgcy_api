import {
    createRes,
    createSwRtX,
    EntryPoint,
    Get,
    parseURL,
    Respond,
    shimHTTP,
} from "./deps/freesia.ts";
import fileHandler from "./handlers/postFileHandler.ts";
import searchHandler from "./handlers/serachHandler.ts";
import listHandler from "./handlers/listHandler.ts";
import ticketHandler from "./handlers/ticketHandler.ts";
import {
    indexHandler,
    staticFileHandler,
} from "./handlers/staticFileHandler.ts";
import ssrHandler from "./handlers/SSRHandler.tsx";
import { queryPostHandler } from "./handlers/queryPostHandler.ts";
import { httpStatus } from "./deps/std.ts";
import categoryHandler from "./handlers/categoryHandler.ts";
import tagsHandler from "./handlers/tagsHandler.ts";

const { switcher } = createSwRtX<Promise<Respond>, Request>()
    .route("/NonSSG", Get(async () => createRes(200)))
    .route("/p/<uuid>/<filepath>", Get(fileHandler)) // 此处不会匹配/p/<uuid>/的情形
    .route("/api/cate/<cate>", Get(categoryHandler))
    .route("/api/tags/<tag>/", Get(tagsHandler))
    .route("/search", Get(searchHandler))
    .route("/query/<uuid>/", Get(queryPostHandler))
    .route("/list/<type>", Get(listHandler))
    .route("/ticket", Get(ticketHandler))
    .route("/index.html", Get(indexHandler))
    .route("/favicon.ico", Get(async () => createRes(httpStatus.NotFound)))
    .route("/static/<filepath>", Get(staticFileHandler))
    .fallback(ssrHandler);

const main: EntryPoint = async (req) => switcher(parseURL(req).pathname, req);

export default shimHTTP(main);
