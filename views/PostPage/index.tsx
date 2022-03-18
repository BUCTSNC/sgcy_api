import { marked } from "../../deps/marked.ts";
import { React, useEffect, useParams, useState } from "../../deps/react.ts";
import { postSendParser } from "../../types/post.ts";
import { State } from "../../types/state.ts";
import { Tags } from "../Component/Tags.tsx";
import { logEffect } from "../../debug.ts";
import { isSSG } from "../isSSG.ts";

export function PostPage(props: { post: NonNullable<State["post"]> }) {
    const { uuid } = useParams();
    const [postRemote, setPost] = useState(props.post);
    useEffect(() => {
        Promise.all([
            fetch(`/query/${uuid}/`),
            fetch(`/p/${uuid}/index.md`),
        ])
            .then(async ([metaRes, mdRes]) => {
                if (metaRes.ok && mdRes.ok) {
                    const meta = postSendParser(await metaRes.text());
                    const indexMD = await mdRes.text();
                    if (meta !== undefined) return { meta, indexMD };
                }
                return postRemote;
            })
            .then(setPost);
    }, [uuid]);
    const post = isSSG() ? props.post : postRemote;
    return (
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
