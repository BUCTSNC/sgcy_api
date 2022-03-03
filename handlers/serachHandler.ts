import {
    compute,
    Empty,
    parseURL,
    resJson,
} from "https://deno.land/x/freesia@v1.0.6/mod.ts";
import { metaQuery, SearchableFields } from "../memoryDB/metaQuery.ts";
import { like } from "../utils/RegExpUtils.ts";

const searchHandler = async (_: Empty, req: Request) => {
    const { searchParams } = parseURL(req);
    // 根据keywords和制定的fields生成where条件
    const keywords = searchParams.getAll("keywords");
    const fields = searchParams.getAll("fields").filter(
        (field) => ["title", "introduction", "authors", "tags"].includes(field),
    ) as SearchableFields[];
    const where = keywords.map<[SearchableFields, RegExp][]>(
        (keyword) => fields.map((field) => [field, like(keyword)]),
    ).flat(1);
    // 根据limit参数设置最大条数，非法输入返回0条
    const limit = compute(searchParams.get("limit"))
        .ifNull(() => "10")
        .map((value) => parseInt(value, 10))
        .map((value) => Number.isNaN(value) ? 0 : value)
        .value;
    // 根据asc参数生成排序，若为1使用asc，否则为desc
    const sort = compute(searchParams.get("asc"))
        .mapSkipNull((value) => value === "1" ? "asc" : "desc" as const)
        .ifNull(() => "asc" as const)
        .value;
    // 根据from和to参数确定duration，若有非法参数，Invalid Date无法成功匹配到任何参数
    const from = compute(searchParams.get("from"))
        .ifNull(() => new Date(0))
        .map((stamp) => new Date(stamp))
        .value;
    const to = compute(searchParams.get("to"))
        .ifNull(() => new Date())
        .map((stamp) => new Date(stamp))
        .value;
    const duration: [Date, Date] = [from, to];
    // 查询
    const result = metaQuery({
        limit,
        sort,
        where,
        duration,
    });
    return resJson(result);
};

export default searchHandler;
