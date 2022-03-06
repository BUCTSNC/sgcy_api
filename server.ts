import {
    createSwRtX,
    EntryPoint,
    Get,
    parseURL,
    shimHTTP,
} from "freesia";
import { serve } from "std/http/server.ts";
import fileHandler from "./handlers/fileHandler.ts";
import searchHandler from "./handlers/serachHandler.ts";
import listHandler from "./handlers/listHandler.ts";
import init from "./init.ts";
import ticketHandler from "./handlers/ticketHandler.ts";
import { listen } from "./constant.ts";
import ssrHandler from "./handlers/ssrHandler.tsx";

const { switcher } = createSwRtX
    .route("/file/<uuid>/<filepath>", Get(fileHandler))
    .route("/search", Get(searchHandler))
    .route("/list/<type>", Get(listHandler))
    .route("/ticket", Get(ticketHandler))
    .fallback(ssrHandler);

const main: EntryPoint = async (req) => switcher(parseURL(req).pathname, req);

init();
serve(shimHTTP(main), {
    port: listen,
});
