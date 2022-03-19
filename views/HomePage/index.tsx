import { isVoid } from "../../deps/freesia.ts";
import { React, useState } from "../../deps/react.ts";
import { postArrayParser } from "../../types/post.ts";
import { State } from "../../types/state.ts";
import { PostCard } from "../Component/PostCard.tsx";
import { useNonSSGEffect } from "../isSSG.ts";

export function HomePage(props: { hotList: State["hotList"] }) {
    const [hotList, setHotList] = useState(props.hotList);
    useNonSSGEffect(() => {
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
            {hotList.map((post, index) => {
                return <PostCard key={index} post={post} />;
            })}
        </div>
    );
}
