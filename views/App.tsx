import { Outlet, React, Route, Routes, useNavigate } from "../deps/react.ts";
import { Post } from "../types/post.ts";
import { PostPage } from "./PostPage/index.tsx";
import { HomePage } from "./HomePage/index.tsx";
import { useStyles } from "./Styles.ts";
import { Header } from "./Layout/Header.tsx";

export type State = {
    hotList: {
        daily: Post[];
        weekly: Post[];
        monthly: Post[];
        yearly: Post[];
    };
    post?: {
        meta: Post;
        indexMD: string;
    };
    searchResults?: Post[];
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
