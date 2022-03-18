import { isVoid } from "../../deps/freesia.ts";
import {
    React,
    useEffect,
    useNavigate,
    useParams,
    useState,
} from "../../deps/react.ts";
import { postArrayParser, PostSend } from "../../types/post.ts";
import { throwIfNull } from "../../utils/throwIfNull.ts";
import { PostCard } from "../Component/PostCard.tsx";

export const CategoryPage = (props: { postList: PostSend[] }) => {
    const { "*": cate } = useParams();
    const [list, setList] = useState(props.postList);
    const navi = useNavigate();
    useEffect(() => {
        if (isVoid(cate)) setList([]);
        else {
            fetch(`/api/cate/${cate}`).then((res) => {
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
    }, [cate]);
    return (
        <div className="CategoryPage">
            <div className="CategoryPage-Title">
                {cate?.split("/").map((subCate, index) => (
                    <div
                        className="CategoryPage-Title-Sub"
                        key={index}
                        onClick={() =>
                            navi(
                                `/cate/${cate?.split("/").slice(0, index + 1)}`,
                            )}
                    >
                        {subCate}
                    </div>
                ))}
            </div>
            {list.map((post, index) => <PostCard key={index} post={post} />)}
        </div>
    );
};
