import { makeStyles } from "@material-ui/core";

export const useNotificationsPageStylesActionStyles = makeStyles((theme) => ({
    iconGroup: {
        marginLeft: "auto",
        marginRight: 10
    },
    icon: {
        display: "inline-block"
    },
    dropdownLink: {
        color: "black",
        textDecoration: "none"
    },
    dropdown: {
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 2,
        borderRadius: 17,
        backgroundColor: theme.palette.background.paper,
        boxShadow: "rgb(101 119 134 / 20%) 0px 0px 15px, rgb(101 119 134 / 15%) 0px 0px 3px 1px",
        "&:hover": {
            cursor: "pointer"
        }
    },
    iconColor: {
        color: "rgb(29, 155, 240)",
        marginRight: 10
    },
    itemNotifi: {
        padding: "16px 20px",
        "&:hover": {
            backgroundColor: theme.palette.secondary.main,
            with: "100%"
        }
    }
}));
