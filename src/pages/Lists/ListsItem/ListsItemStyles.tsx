import { makeStyles } from "@material-ui/core";

export const useListsItemStyles = makeStyles((theme) => ({
    container: {
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        borderRadius: 0,
        display: "flex",
        alignItems: "flex-start",
        padding: "12px 16px",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: theme.palette.secondary.main
        }
    },
    listAvatar: {
        width: "50px !important",
        height: "50px !important",
        borderRadius: 12,
        marginRight: 15
    },
    listInfoContainer: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    listInfoWrapper: {
        display: "block"
    },
    listTitle: {
        fontWeight: 700
    },
    listOwnerWrapper: {
        display: "inline-block",
        verticalAlign: "middle"
    },
    listOwnerAvatar: {
        marginRight: 4,
        width: "15px !important",
        height: "15px !important"
    },
    listOwnerInfoWrapper: {
        display: "inline-block"
    },
    listOwnerFullName: {
        marginRight: 4,
        fontWeight: 700,
        color: theme.palette.text.primary
    },
    listPinWrapper: {
        "& .MuiIconButton-root": {
            padding: 7,
            "& svg": {
                verticalAlign: "bottom",
                color: theme.palette.primary.main,
                height: "0.85em"
            }
        }
    },
    listHeader: {
        width: 180,

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
    }
}));
