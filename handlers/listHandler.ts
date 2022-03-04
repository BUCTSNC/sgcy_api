import { condition, resJson } from "https://deno.land/x/freesia@v1.0.6/mod.ts";
import { outerDaily, outerMonthly, outerWeekly, outerYearly, startUpdate } from "../memoryDB/logger.ts";

startUpdate(60 * 1000);

const listHandler = async (params: { type: string; }) => {
    return resJson(
        condition(params.type)
            .match("daily", () => outerDaily)
            .match("weekly", () => outerWeekly)
            .match("monthly", () => outerMonthly)
            .match("yearly", () => outerYearly)
            .withDefault(() => [])
    );
};

export default listHandler;