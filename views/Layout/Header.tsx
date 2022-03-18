import {
    React,
    useEffect,
    useNavigate,
    useParams,
    useSearchParams,
    useState,
} from "../../deps/react.ts";

export function Header() {
    const navi = useNavigate();
    return (
        <div className="Layout-Header">
            <h1 className="Layout-Header-Title" onClick={() => navi("/")}>
                胜古朝阳
            </h1>
            <p className="Layout-Header-Intro">北京化工大学学生生活服务指南</p>
            {/* <SearchBar /> */}
            <Navigation />
        </div>
    );
}

function SearchBar() {
    const [searchParams] = useSearchParams();
    const [keywords, setKeywords] = useState(searchParams.getAll("keywords"));
    const [fields, setFields] = useState(searchParams.getAll("fields"));
    return (
        <div>
            <input
                type="text"
                onChange={(event) => {
                    setKeywords(event.target.value.split(" "));
                }}
                value={keywords.join(" ")}
                placeholder="请输入关键词进行搜索"
            />
            <button>搜索</button>
        </div>
    );
}

function Navigation() {
    const navi = useNavigate();
    const { category } = useParams();
    const [activedCate, setActivedCate] = useState(category);
    useEffect(() => {
        setActivedCate(category);
    }, [category]);
    return (
        <div className="Layout-Header-Navigation">
            {["校园生活", "服务指南", "学习资源", "校园风光"].map(
                (categoryName, index) => (
                    <div
                        key={index}
                        onClick={() => navi(`/cate/${categoryName}/`)}
                        className={`Layout-Header-Navigation-Item ${categoryName === activedCate
                            ? "Layout-Header-Navigation-Item-Actived"
                            : "Layout-Header-Navigation-Item-Inactived"}`}
                    >
                        {categoryName}
                    </div>
                ),
            )}
        </div>
    );
}
