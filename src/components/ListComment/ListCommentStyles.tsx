import { makeStyles } from "@material-ui/core";

export const useListCommentStyles = makeStyles((theme) => ({
    dialogWrapper: {
        top: "-10%"
    },
    container: {
        width: 500,
        overflowY: "auto", // Đảm bảo container có thể cuộn
        "&::-webkit-scrollbar": {
            width: "4px",
            height: "4px"
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888",
            borderRadius: "6px"
        },
        padding: 0,
        "& #link": {
            color: theme.palette.primary.main
        }
    },
    modalWrapper: {
        width: 497,
        display: "flex",

        position: "relative",
        paddingTop: 15,
        paddingLeft: 20,
        flex: 1,
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        borderRadius: 0
    },
    verticalLine: {
        marginLeft: 21,
        position: "absolute",
        borderLeft: `2px solid ${theme.palette.divider}`,
        height: "100%"
    },
    avatar: {
        zIndex: 1,
        border: `1px solid ${theme.palette.divider}`,
        marginRight: 15
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        span: {
            color: theme.palette.info.light
        }
    },
    text: {
        color: "inherit",
        textDecoration: "none",
        overflow: "hidden",
        width: "100px",
        "& #hashtag": {
            color: theme.palette.primary.main
        }
    },
    image: {
        position: "relative",
        "& img": {
            width: "100%",
            height: 280,
            objectFit: "cover",
            marginTop: 10,
            borderRadius: 20,
            borderColor: theme.palette.info.light
        },
        "& .small": {
            width: 260,
            height: 152
        }
    },
    replyWrapper: {
        marginTop: 12,
        zIndex: 2
    },
    addForm: {
        padding: "20px 20px 15px 20px"
    },
    footer: {
        gap: 10,
        display: "flex",
        justifyContent: "space-between",
        position: "relative",
        paddingTop: 5,
        paddingLeft: 5,
        paddingBottom: 5,
        left: -8
    },
    footerWrapper: {
        marginTop: 12
    }
}));
