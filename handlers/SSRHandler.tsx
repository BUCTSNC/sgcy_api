import { React, renderToString, StaticRouter } from "../deps/react.ts";
import {
    createSwRt,
    Empty,
    isVoid,
    ResFromTuple,
    TypedResponse,
} from "../deps/freesia.ts";
import { indexHTML } from "./staticFileHandler.ts";
import App from "../views/App.tsx";
import { State } from "../types/state.ts";
import { DBtoSend, getHotWithCache } from "../storage/db.ts";
import { getPostFile, getPostMeta } from "./postFileHandler.ts";
import { getPostByTag } from "./tagsHandler.ts";
import { getPostByCategory } from "./categoryHandler.ts";

const { switcher } = createSwRt<Promise<Omit<State, "hotList">>>()
    .route(
        "/",
        async (_: Empty) => ({}),
    )
    .route(
        "/p/<uuid>/",
        async ({ uuid }) =>
            getPostFile({ uuid, filepath: "index.md" })
                .aMapSkipNull(async (file) => {
                    const length = (await file.stat()).size;
                    const content = new Uint8Array(length);
                    await file.read(content);
                    const meta = getPostMeta(uuid);
                    if (isVoid(meta)) return null;
                    return {
                        post: {
                            meta: DBtoSend(meta, 7),
                            indexMD: await new Blob([content]).text(),
                        },
                    };
                })
                .aIfNull(() => ({
                    post: {
                        meta: {
                            uuid: "404",
                            title: "内容未找到",
                            intro: "被删除或者移动到了其他位置，请尝试使用搜索功能进行查找。",
                            tags: [],
                            authors: [],
                            editors: [],
                            timestamp: new Date(),
                            category: [],
                            amount: 0,
                        },
                        indexMD:
                            "## 没有找到对应的内容\n\n文章可能被删除或者移动到了其他位置，请尝试使用搜索功能进行查找。",
                    },
                }))
                .value,
    )
    .route("/tag/<tag>/", async ({ tag }) => {
        const [_status, list] = await getPostByTag(tag);
        return { tagPosts: list ?? [] };
    })
    .route("/cate/<cate>", async ({ cate }) => {
        const [_status, list] = await getPostByCategory(cate);
        return { categoryPosts: list ?? [] };
    })
    // .route("/search", async (_, req) => {
    //     const result = await searchForPosts(req);
    //     return {
    //         searchResults: result.map((post) => DBtoSend(post, 7)),
    //     };
    // })
    .fallback(async () => ({}));

export const getSSRDataHandler = async (
    url: string,
): Promise<State> => {
    const hotList: State["hotList"] = getHotWithCache(7, 50, 0);
    const rest = await switcher(url);
    return { hotList, ...rest };
};

export const ssrHandler = async (
    url: string,
): Promise<TypedResponse<string>> => {
    const { post, tagPosts, categoryPosts, searchResults, hotList } =
        await getSSRDataHandler(url);
    return [
        200,
        indexHTML.replace(
            "<!-- SSR -->",
            renderToString(
                <StaticRouter location={url}>
                    <App
                        hotList={hotList}
                        post={post}
                        tagPosts={tagPosts}
                        categoryPosts={categoryPosts}
                        searchResults={searchResults}
                    />
                </StaticRouter>,
            ),
        ),
        [
            "Content-Type",
            "text/html; charset=UTF-8",
        ],
    ];
};

export default async (url: string) => ResFromTuple(await ssrHandler(url));
