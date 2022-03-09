import { condition, resJson } from "../deps/freesia.ts";
import {
    outerDaily,
    outerMonthly,
    outerWeekly,
    outerYearly,
} from "../memoryDB/logger.ts";

const listHandler = async (params: { type: string }) => {
    return resJson(
        condition(params.type)
            .match("daily", () => outerDaily)
            .match("weekly", () => outerWeekly)
            .match("monthly", () => outerMonthly)
            .match("yearly", () => outerYearly)
            .withDefault(() => []),
    );
};

export default listHandler;
