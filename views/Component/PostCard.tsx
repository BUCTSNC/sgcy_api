import { React, useNavigate } from "../../deps/react.ts";
import { PostSend } from "../../types/post.ts";
import { Tags } from "./Tags.tsx";

export function PostCard(props: { post: PostSend }): JSX.Element {
    const { post } = props;
    const navi = useNavigate();
    return (
        <div key={post.uuid} className="HomePage-HotList-Card">
            <div
                onClick={() => navi(`/p/${post.uuid}/`)}
                className="HomePage-HotList-Card-Title"
            >
                {post.title}
            </div>
            <div className="HomePage-HotList-Card-Intro">
                {post.intro}
            </div>
            <Tags tags={post.tags} />
        </div>
    );
}
