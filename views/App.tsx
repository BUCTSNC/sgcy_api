import {
    React,
    Route,
    Routes,
    useEffect,
    useNavigate,
    useParams,
    useState,
} from "../deps/react.ts";
import { PostSend, postSendParser } from "../memoryDB/post.ts";
import { marked } from "../deps/marked.ts";

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
    return (
        <>
            <h1>hello, world</h1>
            <button onClick={() => navi("/")}>主页</button>
            <button
                onClick={() => navi("/p/" + btoa(String(Math.random())) + "/")}
            >
                随机页面
            </button>
            <Routes>
                <Route path="/" element={<Welcome count={0} />}></Route>
                <Route
                    path="/p/:uuid/"
                    element={<PostPage post={state.post} />}
                >
                </Route>
            </Routes>
        </>
    );
}

function Welcome(props: { count: number }) {
    const fib = (index: number): [number, number] => {
        if (!Number.isInteger(index) || index < 0) {
            throw new Error("Must give an integer");
        }
        if (index === 0) return [0, 1];
        else {
            const [l2, l1] = fib(index - 1);
            return [l1, l2 + l1];
        }
    };
    const [count, setCount] = useState(props.count);
    return (
        <div>
            <p>fib of {count} is {fib(count)[1]}</p>
            <button onClick={() => setCount(count + 1)}>
                +1
            </button>
        </div>
    );
}

function PostPage(props: { post: State["post"] }) {
    const { uuid } = useParams<{ uuid: string }>();
    const [post, setPost] = useState(
        props.post ?? {
            meta: {
                uuid: "404",
                title: "内容未找到",
                intro: "文章可能被删除或者移动到了其他位置，请尝试使用搜索功能进行查找。",
                tags: [],
                authors: [],
                timestamp: new Date(),
            },
            indexMD: "## 没有找到对应的内容\n\n文章可能被删除或者移动到了其他位置，请尝试使用搜索功能进行查找。",
        },
    );
    useEffect(() => {
        Promise.all([
            fetch(`/query/${uuid}/`),
            fetch(`/p/${uuid}/index.md`),
        ])
            .then(async ([metaRes, mdRes]) => {
                if (metaRes.ok && mdRes.ok) {
                    const meta = postSendParser(await metaRes.text());
                    const indexMD = await mdRes.text();
                    if (meta !== undefined) return { meta, indexMD };
                }
                throw null;
            })
            .then(setPost)
            .catch(() => void (0));
    }, [uuid]);
    return (
        <div
            id="content"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: marked.parse(post.indexMD) }}
        >
        </div>
    );
}

export default App;
