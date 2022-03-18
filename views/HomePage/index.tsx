import { isVoid } from "../../deps/freesia.ts";
import { React, useEffect, useNavigate, useState } from "../../deps/react.ts";
import { postArrayParser, PostSend } from "../../types/post.ts";
import { State } from "../App.tsx";
import { PostCard } from "../Component/PostCard.tsx";

export function HomePage(props: { hotList: State["hotList"] }) {
    const navi = useNavigate();
    const [hotList, setHotList] = useState(props.hotList);
    useEffect(() => {
        fetch("/list/weekly")
            .then((res) => {
                if (res.ok) return res.text();
                else throw new Error("Faled to get data from backend.");
            })
            .then(postArrayParser)
            .then((list) => {
                if (isVoid(list)) {
                    throw new Error("Failed to parse received data");
                } else return list;
            })
            .then(setHotList)
            .catch((err) => {
                console.error(JSON.stringify(err));
            });
    }, []);
    return (
        <div suppressHydrationWarning className="HomePage">
            {hotList.map((post) => {
                return <PostCard post={post} />;
            })}
        </div>
    );
}
