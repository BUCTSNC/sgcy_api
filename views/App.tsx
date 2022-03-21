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
                                    post={state.post}
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
