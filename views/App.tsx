import {
    React,
    Route,
    Routes,
    useNavigate
} from "../deps/react.ts";
import { PostSend } from "../memoryDB/post.ts";
import { PostPage } from "./PostPage/index.tsx";
import { HomePage } from "./HomePage/index.tsx";
import { useStyles } from "./Styles.ts";

export type State = {
    hotList: {
        daily: PostSend[];
        weekly: PostSend[];
        monthly: PostSend[];
        yearly: PostSend[];
    };
    post?: {
        meta: PostSend;
        indexMD: string;
    };
    searchResults?: PostSend[];
};

export function App(state: State = {
    hotList: { daily: [], weekly: [], monthly: [], yearly: [] },
}) {
    const navi = useNavigate();
    const {app} = useStyles()
    return (
        <div className={app}>
            <h1>hello, world</h1>
            <button onClick={() => navi("/")}>主页</button>
            <button
                onClick={() => navi("/p/" + btoa(String(Math.random())) + "/")}
            >
                随机页面
            </button>
            <Routes>
                <Route path="/" element={<HomePage count={0} />}></Route>
                <Route
                    path="/p/:uuid/"
                    element={<PostPage post={state.post} />}
                >
                </Route>
            </Routes>
        </div>
    );
}

export default App;
