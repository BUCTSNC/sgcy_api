import { isVoid } from "../../deps/freesia.ts";
import {
    React,
    useEffect,
    useParams,
    useState,
} from "../../deps/react.ts";
import { postArrayParser, PostSend } from "../../types/post.ts";
import { throwIfNull } from "../../utils/throwIfNull.ts";
import { PostCard } from "../Component/PostCard.tsx";
import { isSSG } from "../isSSG.ts";

export const TagsPage = (props: { postList: PostSend[] }) => {
    const { tag } = useParams();
    const [list, setList] = useState(props.postList);
    useEffect(() => {
        if (isVoid(tag)) setList([]);
        else {
            fetch(`/api/tags/${tag}/`).then((res) => {
                if (res.ok) return res.text();
                else throw new Error("Failed to fetch data");
            })
                .then(postArrayParser)
                .then(throwIfNull)
                .then(setList)
                .catch((err) => {
                    console.error(JSON.stringify(err));
                });
        }
    }, [tag]);
    const postList = isSSG() ? props.postList : list;
    return (
        <div className="CategoryPage">
            <h2>{tag}</h2>
            {postList.map((post, index) => <PostCard key={index} post={post} />)}
        </div>
    );
};
