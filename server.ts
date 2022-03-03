import {
    createRes,
    createSwRtX,
    EntryPoint,
    Get,
    parseURL,
    shimHTTP,
    compute
} from "https://deno.land/x/freesia@v1.0.6/mod.ts";
import { serve } from "https://deno.land/std@0.127.0/http/server.ts";
import { Status } from "https://deno.land/std@0.127.0/http/http_status.ts";
import { initDB } from "./memoryDB/db.ts";
import fileHandler from "./handlers/fileHandler.ts";
import searchHandler from "./handlers/serachHandler.ts";
import { resolve } from "https://deno.land/std@0.127.0/path/mod.ts";

const token = crypto.randomUUID()

const { switcher } = createSwRtX
    .route("/file/<uuid>/<filepath>", Get(fileHandler))
    .route("/search", Get(searchHandler))
    .route("/update_db", Get((_, req) => {
        return compute(parseURL(req).searchParams.get("token"))
            .map(value => value === token)
            .map(async result => {
                if(result) {
                    const amount = await initDB();
                    return createRes(`${amount} post${amount > 1 ? "s" : ""} detected`)
                }
                return createRes(Status.Forbidden, "无效的令牌")
            })
            .value
    }))
    .fallback(async (url, req) =>
        createRes(Status.NotFound, `No route matched ${req.method} ${url}`)
    );
const main: EntryPoint = async (req) => switcher(parseURL(req).pathname, req);

export const root = resolve(Deno.cwd(), "docs")

initDB().then(
    (amount) => {
        console.log(`${amount} post${amount > 1 ? "s" : ""} detected`);
        console.log(`update uuid is: ${token}`)
        serve(shimHTTP(main), {
            port: 8000,
        })
    },
)
