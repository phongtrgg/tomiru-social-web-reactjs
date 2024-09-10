import { makeStyles } from "@material-ui/core";

export const useRecentContentStyles = makeStyles((theme) => ({
    chatHeader: {
        width: 598
    },
    recentContainer: {
        backgroundColor: "#F4F8FB",
        paddingTop: 12,
        marginLeft: 18,
        marginRight: 18,
        borderRadius: 12,
        paddingRight: 20,
        height: "100%"
    },
    chatAvatar: {
        width: theme.spacing(6),
        height: theme.spacing(6),
        margin: "0px 15px"
    },
    titleDelete:{
        display: "flex",
        justifyContent: "space-between"
    },
    titleRecent:{
        fontWeight: 700,
        marginLeft: "16px",
        fontSize: "18px"
    },
    serchRecentContent:{
        height: "45vh",
        overflow: "auto"
    },
    linkDelete:{
        color: "#1B99F0",
        textDecoration: "none",
        cursor: "pointer",
    }
}));
