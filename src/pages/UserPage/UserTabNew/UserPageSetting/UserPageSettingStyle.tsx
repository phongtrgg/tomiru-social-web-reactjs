import { makeStyles } from "@material-ui/core";

export const useUserPageSettingStyles = makeStyles((theme) => ({
    container: {
        position: "relative",
        display: "inline-block",
        left: 390,
        bottom: 30,
    },
    dropdown: {
        position: "absolute",
        top: 45,
        width: 300,
        zIndex: 2,
        borderRadius: 4,
        backgroundColor: theme.palette.background.paper,
        boxShadow: "rgb(101 119 134 / 20%) 0px 0px 15px, rgb(101 119 134 / 15%) 0px 0px 3px 1px",
        "& .MuiList-root": {
            fontSize: 15,
            padding: 0,
            margin: 0
        },
        "& .MuiListItem-root": {
            margin: 0,
            height: 52,
            "&:hover": {
                cursor: "pointer",
                backgroundColor: theme.palette.secondary.main
            }
        },
        "& .MuiTypography-root": {
            fontSize: 15,
            fontWeight: 400
        },
        "& svg": {
            verticalAlign: "bottom",
            fill: theme.palette.text.secondary,
            height: "1.30em"
        }
    },
    userPageIconButton: {
        "& .MuiIconButton-root": {
            border: "1px solid",
            borderRadius: "50%",
            padding: 8,
            "& svg": {
                color: theme.palette.primary.main,
                height: 23,
                width: 23
            }
        }
    },
}));
