import { memoryCache, ResFromTuple, TypedResponse } from "../deps/freesia.ts";
import { DBtoSend, memoryDB } from "../storage/db.ts";
import { PostSend } from "../types/post.ts";

export const getPostByTag = async (
    tag: string,
): Promise<TypedResponse<PostSend[]>> => {
    return [
        200,
        memoryDB.filter((post) => post.tags.includes(decodeURIComponent(tag)))
            .map((post) => DBtoSend(post, 7)),
    ];
};

export const tagsHandler = async (
    params: { tag: string },
) => ResFromTuple(await memoryCache(getPostByTag, 60 * 1000)(params.tag));

export default tagsHandler;
