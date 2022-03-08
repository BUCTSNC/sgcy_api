import React, { useEffect, useState } from "react";
import { Switch, Route, useHistory, useParams } from "react-router-dom";
import { PostSend, postSendParser } from "../memoryDB/post.ts";
import isBrowser from "./isBrowser.ts";
import { marked } from "marked";

export type State = {
    hotList: {
        daily: PostSend[];
        weekly: PostSend[];
        monthly: PostSend[];
        yearly: PostSend[];
    };
    post?: {
        meta: PostSend;
        indexMD: string;
    };
    searchResults?: PostSend[];
};

export function App(state: State = {
    hotList: { daily: [], weekly: [], monthly: [], yearly: [] }
}) {
    const history = useHistory();
    return (
        <div>
            <h1>hello, world</h1>
            <p>This page rendered in {isBrowser() ? "browser" : "deno"}</p>
            <button onClick={() => history.push("/")}>主页</button>
            <button
                onClick={() =>
                    history.push("/p/" + btoa(String(Math.random())) + "/")}
            >
                随机页面
            </button>
            <Switch>
                <Route path="/"><Welcome count={0} /></Route>
                <Route path="/p/:uuid/"><PostPage post={state.post} /></Route>
            </Switch>
        </div>
    );
}

function Welcome(props: { count: number; }) {
    const [count, setCount] = useState(props.count);
    return (
        <div>
            <p>Count is {count}</p>
            <button onClick={() => setCount(count + 1)}>
                +1
            </button>
        </div>
    );
}

function PostPage(props: { post: State["post"]; }) {
    const { uuid } = useParams<{ uuid: string; }>();
    const [post, setPost] = useState(props.post ?? {
        meta: {
            uuid: "404",
            title: "内容未找到",
            introduction: "文章可能被删除或者移动到了其他位置，请尝试使用搜索功能进行查找。",
            tags: [],
            authors: [],
            timestamp: new Date()
        },
        indexMD: "## 没有找到对应的内容\n\n文章可能被删除或者移动到了其他位置，请尝试使用搜索功能进行查找。"
    });
    useEffect(() => {
        Promise.all([
            fetch(`/query/${uuid}/`), fetch(`/p/${uuid}/index.md`)
        ])
            .then(async ([metaRes, mdRes]) => {
                if (metaRes.ok && mdRes.ok) {
                    const meta = postSendParser(await metaRes.text());
                    const indexMD = await mdRes.text();
                    if (meta !== undefined) return { meta, indexMD };
                }
                throw null;
            })
            .then(setPost)
            .catch(() => void (0));
    }, [uuid]);
    return <div dangerouslySetInnerHTML={{ __html: marked.parse(post.indexMD) }}></div>;
}

export default App;
