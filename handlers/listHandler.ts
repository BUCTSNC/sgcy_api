import { condition, ResFromTuple, TypedResponse } from "../deps/freesia.ts";
import { getHotWithCache } from "../storage/db.ts";
import { PostSend } from "../types/post.ts";

const getHotList = (type: string): TypedResponse<PostSend[]> => {
    const inDays = condition(type)
        .match("daily", () => 1)
        .match("weekly", () => 7)
        .match("monthly", () => 30)
        .match("seasonly", () => 90)
        .match("yearly", () => 365)
        .withDefault(() => 7)
    const result = getHotWithCache(inDays, 0, 10);
    return [200, result, ["Content-Type", "application/json"]]
}

const listHandler = async (params: { type: string }) => {
    return ResFromTuple(getHotList(params.type))
};

export default listHandler;
