import React from "https://esm.sh/react@17.0.2";
import isBrowser from "./isBrowser.ts";

export function App(props: { url: string; method: string }) {
    const { url, method } = props;
    return (
        <div id="App">
            <h1>hello, world</h1>
            <p>Render react jsx in deno</p>
            <p>You {method} {url}</p>
            <p>This page rendered in {isBrowser() ? "browser" : "deno"}</p>
        </div>
    );
}

export default App;
