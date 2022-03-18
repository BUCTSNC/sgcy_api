import { memoryCache, ResFromTuple, TypedResponse } from "../deps/freesia.ts";
import { DBtoSend, memoryDB } from "../storage/db.ts";
import { PostSend } from "../types/post.ts";

const categoryCompare = (target: string[], source: string[]): boolean => {
    return target.reduce<boolean>((result, next, index) => {
        return result && next === source[index];
    }, true);
};

export const getPostByCategory = async (
    cate: string,
): Promise<TypedResponse<PostSend[]>> => {
    const categories = cate.split("/").map(decodeURIComponent);
    return [
        200,
        memoryDB.filter((post) => categoryCompare(categories, post.category))
            .map((post) => DBtoSend(post, 7)),
    ];
};

export const categoryHandler = async (
    params: { cate: string },
) => ResFromTuple(await memoryCache(getPostByCategory, 60 * 1000)(params.cate));

export default categoryHandler
