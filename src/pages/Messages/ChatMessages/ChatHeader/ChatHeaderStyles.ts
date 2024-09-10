import { makeStyles } from "@material-ui/core";

export const useChatHeaderStyles = makeStyles((theme) => ({
    chatHeader: {
        width: 600
    },
    chatAvatar: {
        width: theme.spacing(4.5),
        height: theme.spacing(4.5),
        margin: "0px 15px"
    },
    iconGroup: {
        marginLeft: "auto",
        marginRight: 10
    },
    menuItem: {
        display: "flex",

    },
    iconPerson:{
        color: "#1DA1F2",
        marginRight: "10px"
    },
    labelContent:{
        paddingLeft: "4px"
    },
    userWrapper: {
        height: 50,
        borderTop: `1px solid ${theme.palette.divider}`,
        display: "flex",
        paddingLeft: 10,
        paddingTop: 15,
        cursor: "pointer",
        
    },
    userAvatarMain:{
        width: theme.spacing(4), 
        height: theme.spacing(4), 
        zIndex: 2,
        position: "relative", 
        "&:not(:first-child)": {
            marginLeft: -10, 
            zIndex: 1, 
        }
    },
    userAvatarFriend:{
        width: theme.spacing(3), 
        height: theme.spacing(3), 
        marginRight: 13,
        position: "relative", 
        "&:not(:first-child)": {
            marginLeft: -10, 
            marginTop: -10
        }
    },
}));
