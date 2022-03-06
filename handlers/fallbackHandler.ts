import { Status } from "https://deno.land/std@0.127.0/http/http_status.ts";
import { createRes } from "https://deno.land/x/freesia@v1.0.9/mod.ts";

const fallbackHandler = async (url: string, req: Request) =>
    createRes(Status.NotFound, `No route matched ${req.method} ${url}`);
export default fallbackHandler;
