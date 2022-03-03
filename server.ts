import {
    createRes,
    createSwRtX,
    EntryPoint,
    Get,
    parseURL,
    shimHTTP,
} from "https://deno.land/x/freesia@v1.0.6/mod.ts";
import { serve } from "https://deno.land/std@0.127.0/http/server.ts";
import { Status } from "https://deno.land/std@0.127.0/http/http_status.ts";
import { initDB } from "./memoryDB/db.ts";
import fileHandler from "./handlers/fileHandler.ts";
import searchHandler from "./handlers/serachHandler.ts";
import { resolve } from "https://deno.land/std@0.127.0/path/mod.ts";

const { switcher } = createSwRtX
    .route("/file/<uuid>/<filepath>", Get(fileHandler))
    .route("/search", Get(searchHandler))
    .fallback(async (url, req) =>
        createRes(Status.NotFound, `No route matched ${req.method} ${url}`)
    );
const main: EntryPoint = async (req) => switcher(parseURL(req).pathname, req);

export const root = resolve(Deno.cwd(), "docs")

initDB().then(
    (amount) => {
        console.log(`${amount} post${amount > 1 ? "s" : ""} detected`);
    },
).then(() =>
    serve(shimHTTP(main), {
        port: 8000,
    })
).then(() => console.log("server started."))
