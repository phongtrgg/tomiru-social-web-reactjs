import { makeStyles } from "@material-ui/core";
// import { BACKGROUND } from "../../constants/common-constants";
// import { BackgroundTheme } from "../../types/common";

export const useAddTweetFormStyles = makeStyles((theme) => ({
    content: {
        display: "flex",
        width: "100%"
    },
    textareaWrapper: {
        marginLeft: 15,
        width: "100%"
    },
    contentTextarea: {
        width: "100%",
        cursor: "text",
        border: 0,
        fontSize: 20,
        outline: "none",
        fontFamily: "inherit",
        resize: "none",
        backgroundColor: "transparent",
        // caretColor: localStorage.getItem(BACKGROUND) === BackgroundTheme.DEFAULT ? "#000" : "#fff",
        /*  color: localStorage.getItem(BACKGROUND) === BackgroundTheme.DEFAULT ? "#000" : "#fff", */
        color: "black",

        padding: "12px 4px",
        height: "100px!important"
    },
    formItems: {
        marginLeft: 58
    },
    footer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    footerWrapper: {
        display: "flex",
        position: "relative",
        paddingTop: 5,
        paddingBottom: 5,
        left: -13,
        justifyContent: "space-between",
        maxWidth: 450,
        marginTop: 10,
        paddingLeft: 70
    },
    footerAddForm: {
        display: "flex",
        alignItems: "center"
    },
    imageRemove: {
        "& .MuiIconButton-root": {
            padding: 6,
            top: 15,
            left: 5,
            position: "absolute",
            backgroundColor: theme.palette.common.black,
            opacity: 0.75,
            "& svg": {
                verticalAlign: "top",
                fill: theme.palette.common.white,
                width: 18,
                height: 18
            },
            "&:hover": {
                backgroundColor: "rgba(39, 44, 48, 0.75) !important"
            }
        }
    }
}));
