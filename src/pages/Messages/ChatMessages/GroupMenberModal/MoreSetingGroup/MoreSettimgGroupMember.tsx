import { makeStyles } from "@material-ui/core";

export const useMoreSettingGroupMemberStyles = makeStyles((theme) => ({
    chatHeader: {
        width: 598
    },
    chatAvatar: {
        width: theme.spacing(4),
        height: theme.spacing(4),
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
        marginRight: "10px",

    },
    deleteMember:{
        color: "#1DA1F2",
        marginRight: "10px",

        
    }
}));
