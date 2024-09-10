import { makeStyles } from "@material-ui/core";

export const useFriendRequestItemStyle = makeStyles((theme) => ({
    notificationWrapper: {
        display: "flex",
        cursor: "pointer",
        alignItems: "center",
        padding: "11px 15px",
        flex: 1,
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        borderRadius: 0,
        backgroundColor: "#f5faf6"
    },
    notificationIcon: {
        alignItems: "flex-end",
        marginLeft: 15,
        marginRight: 11,
        "& #notification": {
            color: "rgb(29, 155, 240)"
        },
        "& #retweet": {
            color: "rgb(23, 191, 99)"
        },
        "& #like": {
            color: "rgb(224, 36, 94)"
        },
        "& #follow": {
            color: "rgb(29, 155, 240)"
        },
        "& #list": {
            color: "rgb(83, 100, 113)"
        },
        "& svg": {
            verticalAlign: "bottom",
            height: "2.30em"
        }
    },
    notificationAvatar: {
        display: "inline-block",
        marginRight: 8,
        width: theme.spacing(6),
        height: theme.spacing(6)
    },
    buttons: {
        display: "flex",
        justifyContent: "flex-end"
    },
    acceptButton: {
        color: "blue"
    },
    deleteButton: {
        color: "red"
    },
    left: {
        flexGrow: 1,
        display: "flex"
    }
}));
