import { makeStyles } from "@material-ui/core";

export const useListsHeaderStyles = makeStyles((theme) => ({
    iconGroup: {
        marginLeft: "auto",
        marginRight: 10,
        display: "flex",
        position: "relative"
    },
    icon: {
        display: "inline-block"
    },
    dropdownLink: {
        color: "black",
        textDecoration: "none"
    },
    dropdown: {
        padding: 16,
        position: "absolute",
        width: 165,

        top: 10,
        right: 10,
        zIndex: 2,
        borderRadius: 4,
        backgroundColor: theme.palette.background.paper,
        boxShadow: "rgb(101 119 134 / 20%) 0px 0px 15px, rgb(101 119 134 / 15%) 0px 0px 3px 1px",
        "&:hover": {
            cursor: "pointer",
            backgroundColor: theme.palette.secondary.main
        }
    },
    textIcon: {
        "& svg": {
            verticalAlign: -3,
            marginRight: 15,
            fill: theme.palette.text.secondary,
            height: "1.30em"
        }
    },
    listHeader: {
        position: "absolute",
        width: 180,
        top: 53,
        right: 176,

        backgroundColor: theme.palette.background.paper,
        boxShadow: "rgb(101 119 134 / 20%) 0px 0px 15px, rgb(101 119 134 / 15%) 0px 0px 3px 1px",
        "&:hover": {
            cursor: "pointer"
        },
        borderRadius: 20,
        zIndex: 3
    },
    listItem: {
        overflow: "hidden",
        padding: "10px 40px 10px 20px",
        width: "100%",
        "&:hover": {
            cursor: "pointer",
            backgroundColor: theme.palette.secondary.main
        },
        "&:first-child:hover": {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20
        },
        "&:last-child:hover": {
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20
        }
    },

    listHeader1: {
        width: 180,

        backgroundColor: theme.palette.background.paper,
        boxShadow: "rgb(101 119 134 / 20%) 0px 0px 15px, rgb(101 119 134 / 15%) 0px 0px 3px 1px",
        "&:hover": {
            cursor: "pointer"
        },
        borderRadius: 20,
        zIndex: 3
    },
    listItem1: {
        overflow: "hidden",
        padding: "10px 40px 10px 20px",
        width: "100%",
        "&:hover": {
            cursor: "pointer",
            backgroundColor: theme.palette.secondary.main
        },
        "&:first-child:hover": {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20
        },
        "&:last-child:hover": {
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20
        }
    }
}));
