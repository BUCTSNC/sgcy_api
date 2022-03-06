import ReactDOM from "https://esm.sh/react-dom@17.0.2";
import App from "./App.tsx";

ReactDOM.render(
    App({ url: "/", method: "GET" }),
    document.getElementById("App"),
);
