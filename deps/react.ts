// 前端调试时，再所有URL末尾增加?dev参数来获得未被压缩的文件
// 使用开发版本bundule并minified的main.js大约500kb，比最优化版本大200kb左右

export {
    default as React,
    useEffect,
    useState,
} from "https://cdn.esm.sh/v67/react?dev";
export { default as ReactDOM } from "https://cdn.esm.sh/v67/react-dom?dev";
export { renderToString } from "https://cdn.esm.sh/v67/react-dom/server?dev";
export {
    BrowserRouter,
    Route,
    Routes,
    useNavigate,
    useParams,
} from "https://cdn.esm.sh/v67/react-router-dom?dev";
export { StaticRouter } from "https://cdn.esm.sh/v67/react-router-dom/server?dev";
