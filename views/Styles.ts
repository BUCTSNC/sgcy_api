import { createUseStyles } from "../deps/react.ts";

export enum Colors {
    lightGrey = "#dedede",
    black = "#000000",
    white = "#ffffff"
}

export const layoutStyles = createUseStyles({
    header: {
        "& h1": {
            margin: 0,
        }
    },
    categoryNavibar: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    activeCateTab: {
        backgroundColor: Colors.black,
        color: Colors.white
    },
    inactiveCateTab: {}
})

export const useStyles = createUseStyles({
    header: {
        backgroundColor: Colors.lightGrey,
    },
    app: {
    },
});
