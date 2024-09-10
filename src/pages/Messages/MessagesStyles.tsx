import { colors, makeStyles } from "@material-ui/core";
import Display from "../Settings/AccessibilityDisplayLanguages/Display/Display";

export const useMessagesStyles = makeStyles((theme) => ({
    grid: {
        padding: "12px 0px 0px 0px !important"
    },
    list: {
        "& .Mui-selected": {
            borderRight: `2px solid ${theme.palette.primary.main}`,
            backgroundColor: theme.palette.secondary.dark,
            "&:hover": {
                backgroundColor: theme.palette.secondary.dark
            }
        }
    },
    tabs: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        "& .MuiTabs-indicator": {
            marginLeft: 18,
            maxWidth: 100,
            height: 4,
            backgroundColor: theme.palette.primary.main,
        },
        "& .MuiTab-root": {
            fontWeight: 700
        },
        "& .MuiTab-labelIcon": {
            minHeight: 0,
            paddingTop: 0
        },
       
    },
    tab: {
        minWidth: 139,
        textTransform: "none",
        "&:hover": {
            backgroundColor: theme.palette.secondary.light
        },
      
    },
    badge: {
        borderRadius: "50%",
        backgroundColor: "rgb(255, 0, 0)",
        width: "24px",
        color: "rgb(255, 255, 255)",
        fontWeight: 400,
        marginLeft: "5px",
        fontSize: "13px",
        height: "24px",

    },
    areaChat:{
        display: "flex",
        justifyContent: "space-around",
    }
}));
