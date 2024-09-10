import { makeStyles } from "@material-ui/core/styles";

export const useChatParticipantStyles = makeStyles((theme) => ({
    listItem: {
        padding: 0,
        backgroundColor: theme.palette.background.paper,
        "&:hover": {
            backgroundColor: theme.palette.secondary.dark
        }
    },
    userWrapper: {
        height: 76,
        borderTop: `1px solid ${theme.palette.divider}`,
        width: "100%",
        display: "flex",
        alignItems: "flex-start",
        paddingLeft: 20,
        paddingTop: 8,
        paddingBottom: 8,
        cursor: "pointer"
    },
    userAvatar: {
        width: theme.spacing(5), 
        marginRight: 15,
        zIndex: 2,
        position: "relative", 
        "&:not(:first-child)": {
            marginLeft: -10,
            zIndex: 1, 
        }
    },
    userAvatarMain:{
        width: theme.spacing(4), 
        height: theme.spacing(4), 
        marginRight: 15,
        zIndex: 2,
        position: "relative", 
        "&:not(:first-child)": {
            marginLeft: -10, 
            zIndex: 1, 
        }
    },
    userAvatarFriend:{
        width: theme.spacing(4), 
        height: theme.spacing(4), 
        marginRight: 15,
        zIndex: 2,
        position: "relative", 
        "&:not(:first-child)": {
            marginLeft: -10, 
            marginTop: -15
        }
    },
    groupChatInfo: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    username: {
        marginLeft: 5
    }
}));
