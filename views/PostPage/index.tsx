import { isVoid } from "../../deps/freesia.ts";
import { marked } from "../../deps/marked.ts";
import { React, useParams, useState } from "../../deps/react.ts";
import { PostSend, postSendParser } from "../../types/post.ts";
import { State } from "../../types/state.ts";
import { Tags } from "../Component/Tags.tsx";
import { isSSG, useNonSSGEffect } from "../isSSG.ts";

export function PostPage(props: { post: State["post"]; }) {
    const { uuid } = useParams();
    const [postRemote, setPost] = useState(props.post);
    useNonSSGEffect(() => {
        Promise.all([
            fetch(`/query/${uuid}/`),
            fetch(`/p/${uuid}/index.md`),
        ])
            .then(async ([metaRes, mdRes]) => {
                if (metaRes.ok && mdRes.ok) {
                    const meta = postSendParser(await metaRes.text());
                    const indexMD = await mdRes.text();
                    if (meta !== undefined) return { meta, indexMD };
                    else return {
                        meta: {
                            uuid: "404",
                            title: "内容未找到",
                            intro:
                                "文章可能被删除或者移动到了其他位置，请尝试使用搜索功能进行查找。",
                            tags: [],
                            authors: [],
                            timestamp: new Date(),
                            category: [],
                            target: [],
                            editors: [],
                            amount: 0
                        },
                        indexMD:
                            "## 没有找到对应的内容\n\n文章可能被删除或者移动到了其他位置，请尝试使用搜索功能进行查找。",
                    };
                }
                return postRemote;
            })
            .then(setPost);
    }, [uuid]);
    const post = isSSG() ? props.post : postRemote;
    return isVoid(post) ? (
        <div>加载中...</div>
    ) : (
        <div
            id="content"
            className="PostPage"
        >
            <h1>{post.meta.title}</h1>
            <p>作者：{post.meta.authors.join(" ")}</p>
            <div
                className="PostPage-Container"
                suppressHydrationWarning
                dangerouslySetInnerHTML={{ __html: marked.parse(post.indexMD) }}
            >
            </div>
            <p>标签：</p>
            <Tags tags={post.meta.tags} />
        </div>
    );
}
