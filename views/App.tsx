import {
    Outlet,
    React,
    Route,
    Routes,
    useEffect,
    useLocation,
    useState,
} from "../deps/react.ts";
import { PostPage } from "./PostPage/index.tsx";
import { HomePage } from "./HomePage/index.tsx";
import { Header } from "./Layout/Header.tsx";
import { Container } from "./Component/Container.tsx";
import { CategoryPage } from "./CategoryPage/index.tsx";
import { TagsPage } from "./TagsPage/index.tsx";
import { State, StateParser } from "../types/state.ts";

export function App(originState: State) {
    const [state, setState] = useState<State>(originState);
    const location = useLocation();
    useEffect(() => {
        fetch(`./ssgdata`)
            .then((res) => res.text())
            .then(StateParser)
            .then((data) => {
                if (data === undefined) sessionStorage.setItem("ssg", "0");
                else sessionStorage.setItem("ssg", "1");
                return data;
            })
            .then((data) => {
                if (data === undefined) throw new Error();
                return data;
            })
            .then(setState)
            .catch(() => {});
    }, [location.pathname]);
    return (
        <div className="App">
            <Container>
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
                        <Route
                            path="/"
                            element={<HomePage hotList={state.hotList} />}
                        />
                        <Route
                            path="p/:uuid"
                            element={
                                <PostPage
                                    post={state.post ?? {
                                        meta: {
                                            uuid: "404",
                                            title: "内容未找到",
                                            intro:
                                                "文章可能被删除或者移动到了其他位置，请尝试使用搜索功能进行查找。",
                                            tags: [],
                                            authors: [],
                                            timestamp: new Date(),
                                            category: [],
                                            editors: [],
                                            amount: 0
                                        },
                                        indexMD:
                                            "## 没有找到对应的内容\n\n文章可能被删除或者移动到了其他位置，请尝试使用搜索功能进行查找。",
                                    }}
                                />
                            }
                        />
                        <Route
                            path="cate/*"
                            element={
                                <CategoryPage
                                    postList={state.categoryPosts ?? []}
                                />
                            }
                        />
                        <Route
                            path="tag/:tag"
                            element={
                                <TagsPage postList={state.tagPosts ?? []} />
                            }
                        />
                    </Route>
                </Routes>
            </Container>
        </div>
    );
}

export default App;
