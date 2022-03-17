import { BrowserRouter, React, ReactDOM } from "../deps/react.ts";
import App from "./App.tsx";

ReactDOM.hydrate(
    <BrowserRouter>
        <App hotList={[]} />
    </BrowserRouter>,
    document.getElementById("App"),
);
