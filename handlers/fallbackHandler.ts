import { Status } from "std/http/http_status.ts";
import { createRes } from "freesia";

const fallbackHandler = async (url: string, req: Request) =>
    createRes(Status.NotFound, `No route matched ${req.method} ${url}`);
export default fallbackHandler;
