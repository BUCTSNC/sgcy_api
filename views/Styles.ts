import { createUseStyles } from "../deps/react.ts";

export const useStyles = createUseStyles({
    app: {
        "&:hover": {
            backgroundColor: "#ff008c",
            color: "#ffffff"
        }
    }
})