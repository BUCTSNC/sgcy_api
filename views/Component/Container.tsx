import { React } from "../../deps/react.ts";

export const Container = (
    props: { children: string | JSX.Element | JSX.Element[] | null },
) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div className="Container">{props.children}</div>
        </div>
    );
};
