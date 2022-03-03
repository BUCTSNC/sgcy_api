import { condition } from "https://deno.land/x/freesia@v1.0.6/mod.ts";
import { PostMetaInJSON } from "./post.ts";
import { memoryDB } from "./db.ts";

export type SearchableFields = keyof PostMetaInJSON;

export type MetaQueryOption = {
    where: [SearchableFields | "uuid", RegExp][];
    sort?: "asc" | "desc";
    duration?: [Date, Date];
    limit?: number;
};

export function metaQuery(query: MetaQueryOption, db = memoryDB) {
    const {
        where,
        sort = "asc",
        duration = [0, Number.MAX_SAFE_INTEGER],
        limit = 10,
    } = query;
    // 限制查询的时间范围
    const inDuration = db.filter((p) =>
        p.timestamp >= duration[0] && p.timestamp <= duration[1]
    );
    // 根据`where`数组的条件进行查询，多个重复的`key`搜索出的结果都会保留
    const result = where
        .map(([key, re]) =>
            condition(key)
                // 对于uuid，禁止通过一个表达式查询到多个结果
                .match(
                    "uuid",
                    () => {
                        const matched = inDuration.filter((p) =>
                            re.exec(p.uuid)
                        );
                        if (matched.length > 1) return [];
                        return matched;
                    },
                )
                // 对于title和introduction，直接根据正则表达匹配
                .match(
                    ["title", "introduction"],
                    (key) =>
                        inDuration.filter((p) =>
                            re.exec(p[key as "title" | "introduction" | "uuid"])
                        ),
                )
                // 对于authors和tags，检查数组中是否有符合目标的值
                .match(
                    ["authors", "tags"],
                    (key) =>
                        inDuration.filter((p) =>
                            Boolean(
                                p[key as "authors" | "tags"].filter(str => re.exec(str))
                                    .length,
                            )
                        ),
                )
                .withDefault(() => [])
        )
        // 消去重复的值，和并为一个一维数组
        .reduce((currentResult, resultOfNextKey) => {
            const resultToAppend = resultOfNextKey.filter((p) =>
                !currentResult.includes(p)
            );
            return [...currentResult, ...resultToAppend];
        }, [])
        // 按时间顺序排列
        .sort((p1, p2) =>
            sort === "asc"
                ? p1.timestamp.getTime() - p2.timestamp.getTime()
                : p2.timestamp.getTime() - p1.timestamp.getTime()
        )
        // 裁取给定的长度
        .slice(0, limit);
    return result;
}
