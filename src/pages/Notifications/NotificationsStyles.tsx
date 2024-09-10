import { makeStyles } from "@material-ui/core";

export const useNotificationsStyles = makeStyles((theme) => ({
    header: {
        border: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20
    },
    tabs: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        border: 0,
        "& .MuiTabs-indicator": {
            marginLeft: 20,
            maxWidth: 80,
            height: 4,
            backgroundColor: theme.palette.primary.main
        },
        "& .MuiTab-root": {
            fontSize: 15,
            textTransform: "none !important",
            minWidth: 120,
            fontWeight: 700
        }
    },
    tab: {
        minWidth: 301,
        textTransform: "none",
        "&:hover": {
            backgroundColor: theme.palette.secondary.light
        }
    },
    mentionNotification: {
        position: "absolute",
        marginBottom: "25px !important",
        marginLeft: 75,
        width: 6,
        height: 6,
        borderRadius: "50%",
        backgroundColor: theme.palette.primary.main
    },
    tapItem: {
        display: "flex",
        alignItems: "center",
        gap: 10
    }
}));
