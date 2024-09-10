import { makeStyles } from "@material-ui/core";

export const useNotificationItemStyles = makeStyles((theme) => ({
    notificationWrapper: {
        display: "flex",
        cursor: "pointer",
        alignItems: "flex-start",
        padding: "11px 15px",
        justifyContent: "center",

        "&:hover": {
            backgroundColor: theme.palette.secondary.main
        }
    },
    notificationIcon: {
        alignItems: "center",
        justifyContent: "center",
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
    notificationInfo: {
        marginBottom: 0
    },
    notificationText: {
        "& a": {
            color: theme.palette.primary.main,
            textDecoration: "none"
        },
        "& #hashtag": {
            color: theme.palette.primary.main
        }
    }
}));
