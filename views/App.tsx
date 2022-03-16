import { Outlet, React, Route, Routes, useNavigate } from "../deps/react.ts";
import { PostSend } from "../memoryDB/post.ts";
import { PostPage } from "./PostPage/index.tsx";
import { HomePage } from "./HomePage/index.tsx";
import { useStyles } from "./Styles.ts";
import { Header } from "./Layout/Header.tsx";

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
    const { app } = useStyles();
    return (
        <div className={app}>
            <Routes>
                <Route
                    path="/"
                    element={
                        <React.Fragment>
                            <Header />
                            <Outlet />
                        </React.Fragment>
                    }
                >
                    <Route index element={<HomePage count={0} />}></Route>
                    <Route
                        path="p/:uuid/"
                        element={<PostPage post={state.post} />}
                    >
                    </Route>
                    <Route
                        path="cate/:category"
                        element={<div>目录</div>}
                    >
                    </Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
