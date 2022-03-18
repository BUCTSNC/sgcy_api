import { React, useNavigate } from "../../deps/react.ts";

export const Tags = (props: { tags: string[] }) => {
    const navi = useNavigate();
    return (
        <div className="Tags">
            {props.tags.map((tag, index) => (
                <div
                    className="Tag"
                    key={index}
                    onClick={() => navi(`/tag/${tag}/`)}
                >
                    {tag}
                </div>
            ))}
        </div>
    );
};
