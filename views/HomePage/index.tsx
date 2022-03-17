import { isVoid } from "../../deps/freesia.ts";
import { React, useEffect, useNavigate, useState } from "../../deps/react.ts";
import { postArrayParser } from "../../types/post.ts";
import { State } from "../App.tsx";
import {logEffect} from "../../debug.ts"

export function HomePage(props: { hotList: State["hotList"] }) {
    const navi = useNavigate()
    const [hotList, setHotList] = useState(props.hotList);
    useEffect(() => {
        fetch("/list/weekly")
        .then(res => {
            if(res.ok) return res.text()
            else throw new Error("Faled to get data from backend.")
        })
        .then(postArrayParser)
        .then(list => {
            if(isVoid(list)) throw new Error("Failed to parse received data")
            else return list
        })
        .then(setHotList)
        .catch(err => {
            console.error(JSON.stringify(err))
        })
    }, [])
    return (
        <div suppressHydrationWarning>
            {
                hotList.map(post => {
                    return <div key={post.uuid}>
                        <div onClick={() => navi(`/p/${post.uuid}/`)}>{post.title}</div>
                        <div>{post.intro}</div>
                        <div>{
                            post.tags.map((tag, index) => <div key={`${post.uuid}-tag-${index}`}>{tag}</div>)    
                        }</div>
                    </div>
                })
            }
        </div>
    );
}
