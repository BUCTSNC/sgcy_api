import {
    compute,
    createRes,
    Empty,
    parseURL,
} from "https://deno.land/x/freesia@v1.0.6/mod.ts";
import { Status } from "https://deno.land/std@0.127.0/http/http_status.ts";
import { token } from "../server.ts";
import { initDB } from "../memoryDB/db.ts";

const refreshDBHandler = (_: Empty, req: Request) => {
    return compute(parseURL(req).searchParams.get("token"))
        .map((value) => value === token)
        .map(async (result) => {
            if (result) {
                const amount = await initDB();
                return createRes(
                    `${amount} post${amount > 1 ? "s" : ""} detected`,
                );
            }
            return createRes(Status.Forbidden, "无效的令牌");
        })
        .value;
};

export default refreshDBHandler;
