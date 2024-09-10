import { makeStyles, Theme } from "@material-ui/core";

interface HomeStylesProps {
    isGroupTab: boolean;
}

export const useHomeStyles = makeStyles<Theme, HomeStylesProps>((theme) => ({
    header: {
        justifyContent: "space-between",
        "& .MuiTypography-h5": {
            marginLeft: 16,
            display: "inline-block",
            verticalAlign: "middle"
        }
    },
    pageHeader: {
        position: "fixed",
        width: 800,
        minHeight: 53,
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        flex: 1,
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        borderRadius: 0
    },
    headerIcon: {
        paddingRight: 10
    },
    addForm: {
        padding: "72px 20px 12px 20px",
        borderBottom: "1px solid #eff3f4",
        marginBottom: 32,
        [theme.breakpoints.down("sm")]: {
            // padding: "0px"
        }
    },
    divider: {
        height: 12,
        backgroundColor: theme.palette.divider
    },
    tabs: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: `1px solid ${theme.palette.divider}`,
        "& .MuiTabs-indicator": {
            marginLeft: 65,
            maxWidth: 110,
            height: 4,
            backgroundColor: theme.palette.primary.main
        },
        "& .MuiTab-root": {
            fontWeight: 700
        },
        "& .MuiTab-labelIcon": {
            minHeight: 0,
            paddingTop: 0
        },
        paddingBottom: 2
    },
    tab: {
        minWidth: 240,
        textTransform: "none",
        "&:hover": {
            backgroundColor: theme.palette.secondary.light
        }
    },
    tweetComponent: {
        "&:first-of-type": {
            backgroundColor: "yellow"
        }
    }
}));
