import { getPostMeta } from "./postFileHandler.ts";
import { createRes, resJson } from "../deps/freesia.ts";

export const queryPostHandler = async (params: { uuid: string }) => {
    const result = getPostMeta(params.uuid);
    if (result === null) return createRes(404, "Post Not Found.");
    return resJson(result);
};
