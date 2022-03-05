import {
    createSwRtX,
    EntryPoint,
    Get,
    parseURL,
    shimHTTP,
} from "https://deno.land/x/freesia@v1.0.8/mod.ts";
import { join } from "https://deno.land/std@0.127.0/path/mod.ts";
import { serve } from "https://deno.land/std@0.127.0/http/server.ts";
import fileHandler from "./handlers/fileHandler.ts";
import searchHandler from "./handlers/serachHandler.ts";
import listHandler from "./handlers/listHandler.ts";
import init from "./init.ts";
import ticketHandler from "./handlers/ticketHandler.ts";
import fallbackHandler from "./handlers/fallbackHandler.ts";

export const root = join(Deno.cwd(), "docs");

const { switcher } = createSwRtX
    .route("/file/<uuid>/<filepath>", Get(fileHandler))
    .route("/search", Get(searchHandler))
    .route("/list/<type>", Get(listHandler))
    .route("/ticket", Get(ticketHandler))
    .fallback(fallbackHandler);

const main: EntryPoint = async (req) => switcher(parseURL(req).pathname, req);

init();
serve(shimHTTP(main), {
    port: 8000,
});
