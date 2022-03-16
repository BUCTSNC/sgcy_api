import { marked } from "../../deps/marked.ts";
import { React, useEffect, useParams, useState } from "../../deps/react.ts";
import { postSendParser } from "../../types/post.ts";
import { State } from "../App.tsx";

export function PostPage(props: { post: State["post"] }) {
    const { uuid } = useParams();
    const [post, setPost] = useState(
        props.post ?? {
            meta: {
                uuid: "404",
                title: "内容未找到",
                intro: "文章可能被删除或者移动到了其他位置，请尝试使用搜索功能进行查找。",
                tags: [],
                authors: [],
                timestamp: new Date(),
            },
            indexMD: "## 没有找到对应的内容\n\n文章可能被删除或者移动到了其他位置，请尝试使用搜索功能进行查找。",
        },
    );
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
                throw null;
            })
            .then(setPost)
            .catch(() => void (0));
    }, [uuid]);
    return (
        <div
            id="content"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: marked.parse(post.indexMD) }}
        >
        </div>
    );
}
