import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import React from "react";
import { createRes, createSwRtX, Empty } from "freesia";
import { indexHTML } from "./staticFileHandler.ts";
import App, { State } from "../views/App.tsx";
import {
    Outer,
    outerDaily,
    outerMonthly,
    outerWeekly,
    outerYearly,
} from "../memoryDB/logger.ts";
import { memoryDB } from "../memoryDB/db.ts";
import { Post } from "../memoryDB/post.ts";
import { getPostFile } from "./postFileHandler.ts";
import { searchForPosts } from "./serachHandler.ts";

const { switcher } = createSwRtX
    .route(
        "/",
        async (_: Empty, _req: Request) => ({} as Omit<State, "hotList">),
    )
    .route(
        "/p/<uuid>/",
        async ({ uuid }) =>
            getPostFile({ uuid, filepath: "index.md" })
                .aMapSkipNull(async (file) => {
                    const length = (await file.stat()).size;
                    const content = new Uint8Array(length);
                    await file.read(content);
                    const meta = memoryDB.find((post) => post.uuid === uuid);
                    if (meta === undefined) return null;
                    return {
                        post: {
                            meta: {
                                ...meta, directory: undefined
                            },
                            indexMD: await new Blob([content]).text(),
                        },
                    };
                })
                .aIfNull(() => ({
                    post: {
                        meta: {
                            uuid: "404",
                            title: "内容未找到",
                            introduction: "文章可能被删除或者移动到了其他位置，请尝试使用搜索功能进行查找。",
                            tags: [] as string[],
                            authors: [] as string[],
                            timestamp: new Date()
                        },
                        indexMD: "## 没有找到对应的内容\n\n文章可能被删除或者移动到了其他位置，请尝试使用搜索功能进行查找。"
                    }
                }))
                .value,
    )
    .route("/search", async (_, req) => {
        const result = await searchForPosts(req);
        return {
            searchResults: result,
        };
    })
    .fallback(async () => ({}));

const ssrHandler = async (url: string, req: Request) => {
    const list2Posts = (list: Outer) =>
        list.map((post) => memoryDB.find((meta) => meta.uuid === post.uuid))
            .filter((value) => value !== undefined) as Post[];
    const hotList: State["hotList"] = {
        daily: list2Posts(outerDaily),
        weekly: list2Posts(outerWeekly),
        monthly: list2Posts(outerMonthly),
        yearly: list2Posts(outerYearly),
    };
    const { post, searchResults } = await switcher(url, req);
    return createRes(
        indexHTML.replace(
            "<!-- SSR -->",
            renderToString(
                <StaticRouter location={url}>
                    <App hotList={hotList} post={post} searchResults={searchResults} />
                </StaticRouter>
            ),
        ),
        [
            "Content-Type",
            "text/html; charset=UTF-8",
        ],
    );
};

export default ssrHandler;
