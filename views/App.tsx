import React from "./deps/react.ts";
import isBrowser from "./isBrowser.ts";

export function App() {
    return (
        <div>
            <h1>hello, world</h1>
            <p>This page rendered in {isBrowser() ? "browser" : "deno"}</p>
        </div>
    );
}

export default App;
