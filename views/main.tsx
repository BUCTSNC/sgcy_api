import { BrowserRouter, React, ReactDOM } from "../deps/react.ts";
import { StateParser } from "../types/state.ts";
import App from "./App.tsx";

await fetch(`./ssgdata`)
    .then((res) => {
        if (res.ok) {        
            return res.text()
        } else {
            return ""
        }
    })
    .then(StateParser)
    .then(data => {
        if(data === undefined) sessionStorage.setItem("ssg", "0");
        else sessionStorage.setItem("ssg", "1");
        return data
    })
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
    });

