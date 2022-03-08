import { httpStatus } from "../deps/std.ts";
import { createRes } from "../deps/freesia.ts";

const fallbackHandler = async (url: string, req: Request) =>
    createRes(httpStatus.NotFound, `No route matched ${req.method} ${url}`);
export default fallbackHandler;
