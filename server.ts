import {
    createRes,
    createSwRtX,
    EntryPoint,
    Get,
    parseURL,
    shimHTTP,
} from "https://deno.land/x/freesia@v1.0.6/mod.ts";
import { join } from "https://deno.land/std@0.127.0/path/mod.ts";
import { serve } from "https://deno.land/std@0.127.0/http/server.ts";
import { Status } from "https://deno.land/std@0.127.0/http/http_status.ts";
import { initDB } from "./memoryDB/db.ts";
import fileHandler from "./handlers/fileHandler.ts";
import searchHandler from "./handlers/serachHandler.ts";
import refreshDBHandler from "./handlers/refreshDB.ts";

export const token = crypto.randomUUID();
export const root = join(Deno.cwd(), "docs");

const { switcher } = createSwRtX
    .route("/file/<uuid>/<filepath>", Get(fileHandler))
    .route("/search", Get(searchHandler))
    .route("/refresh", Get(refreshDBHandler))
    .fallback(async (url, req) =>
        createRes(Status.NotFound, `No route matched ${req.method} ${url}`)
    );

const main: EntryPoint = async (req) => switcher(parseURL(req).pathname, req);

initDB().then(
    (amount) => {
        console.log(`${amount} post${amount > 1 ? "s" : ""} detected`);
        console.log(`update uuid is: ${token}`);
        serve(shimHTTP(main), {
            port: 8000,
        });
    },
);
