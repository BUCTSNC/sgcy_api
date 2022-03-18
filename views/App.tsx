import { Outlet, React, Route, Routes } from "../deps/react.ts";
import { PostSend } from "../types/post.ts";
import { PostPage } from "./PostPage/index.tsx";
import { HomePage } from "./HomePage/index.tsx";
import { Header } from "./Layout/Header.tsx";
import { Container } from "./Component/Container.tsx";
import { CategoryPage } from "./CategoryPage/index.tsx";
import { TagsPage } from "./TagsPage/index.tsx";

export type State = {
    hotList: PostSend[];
    post?: {
        meta: PostSend;
        indexMD: string;
    };
    searchResults?: PostSend[];
    tagPosts?: PostSend[];
    categoryPosts?: PostSend[];
};

export function App(state: State = {
    hotList: [],
}) {
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
                            path="p/:uuid/"
                            element={<PostPage post={state.post} />}
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
                            path="tag/:tag/"
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
