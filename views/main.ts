import ReactDOM from "https://esm.sh/react-dom@17.0.2";
import App from "./App.tsx";

// @ts-ignore: This file executed in browser only.
ReactDOM.render(App({ url: "/", method: "GET" }), document.getElementById("App"));