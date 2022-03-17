import { getPostMeta } from "./postFileHandler.ts";
import { ResFromTuple, TypedResponse } from "../deps/freesia.ts";
import { PostSend } from "../types/post.ts";
import { DBtoSend } from "../storage/db.ts";

export const queryPost = (uuid: string): TypedResponse<PostSend> => {
    const result = getPostMeta(uuid);
    return result === null ? [404] : [200, DBtoSend(result, 7)];
};

export const queryPostHandler = async (params: { uuid: string }) =>
    ResFromTuple(queryPost(params.uuid));
