// 前端调试时，再所有URL末尾增加?dev参数来获得未被压缩的文件
// 使用开发版本bundule并minified的main.js大约500kb，比最优化版本大200kb左右

export {
    default as React,
    useEffect,
    useState,
} from "https://esm.sh/react@17.0.2?dev";
export { default as ReactDOM } from "https://esm.sh/react-dom@17.0.2?dev";
export { renderToString } from "https://esm.sh/react-dom@17.0.2/server?dev";
export {
    BrowserRouter,
    Route,
    Routes,
    useNavigate,
    useParams,
} from "https://esm.sh/react-router-dom@6.2.2?dev";
export { StaticRouter } from "https://esm.sh/react-router-dom@6.2.2/server?dev&deps=@types/react@17.0.39";
