import { BrowserRouter, React, ReactDOM } from "../deps/react.ts";
import { StateParser } from "../types/state.ts";
import App from "./App.tsx";

fetch(`/NonSSG`)
    .catch(() => ({ ok: false }))
    .then((res) => res.ok)
    .then((NonSSG) => {
        if (NonSSG) sessionStorage.setItem("ssg", "0");
        else sessionStorage.setItem("ssg", "1");
        return fetch("./ssgdata");
    })
    .then((res) => {
        if (res.ok) {
            return res.text();
        } else {
            return "";
        }
    })
    .then(StateParser)
    .then((data) => {
        const { hotList, categoryPosts, tagPosts, post } = data ??
            { hotList: [] };
        ReactDOM.hydrate(
            <BrowserRouter>
                <App
                    hotList={hotList}
                    categoryPosts={categoryPosts}
                    tagPosts={tagPosts}
                    post={post}
                />
            </BrowserRouter>,
            document.getElementById("App"),
        );
    })
    .catch((err) => {
        console.log(JSON.stringify(err));
    });
