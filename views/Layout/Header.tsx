import {
    React,
    useEffect,
    useNavigate,
    useParams,
    useSearchParams,
    useState,
} from "../../deps/react.ts";
import { layoutStyles, useStyles } from "../Styles.ts";

export function Header() {
    const { header } = layoutStyles();
    return (
        <div className={header}>
            <h1>
                胜古朝阳
            </h1>
            <p>北京化工大学学生生活服务指南</p>
            <SearchBar />
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
    const { activeCateTab, inactiveCateTab, categoryNavibar } = layoutStyles();
    const navi = useNavigate();
    const { category, uuid } = useParams();
    console.log(useParams());
    const [activedCate, setActivedCate] = useState(category);
    useEffect(() => {
        setActivedCate(category);
    }, [category]);
    return (
        <div className={categoryNavibar}>
            {["校园生活", "服务指南", "学习资源", "校园风光"].map(
                (categoryName, index) => (
                    <div
                        key={index}
                        onClick={() => navi(`/cate/${categoryName}`)}
                        className={categoryName === activedCate
                            ? activeCateTab
                            : inactiveCateTab}
                    >
                        {categoryName}
                    </div>
                ),
            )}
        </div>
    );
}
