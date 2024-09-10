import { makeStyles } from "@material-ui/core";

export const useSideMenuStyles = makeStyles((theme) => ({
    container: {
        position: "fixed",
        top: 0,
        listStyle: "none",
        padding: 0,
        margin: 0,
        maxWidth: 250,
        "& li .selected": {
            "& .MuiTypography-h5": {
                color: theme.palette.primary.main
            },
            "& svg": {
                fill: theme.palette.primary.main
            }
        }
    },
    mg: {
        margin: 5
    },
    itemWrapper: {
        marginBottom: 2,
        height: 40,

        "& .MuiTypography-h5": {
            fontWeight: 400
        },
        "& a": {
            color: "inherit",
            textDecoration: "none"
        },
        "& svg": {
            verticalAlign: "bottom",
            height: "1.9em",
            marginRight: 15
        },
        cursor: "pointer",
        "&:hover": {
            "& div": {
                backgroundColor: theme.palette.secondary.light,
                "& .MuiTypography-h5": {
                    color: theme.palette.primary.main
                },
                "& svg path": {
                    fill: theme.palette.primary.main
                }
            }
        },
        "& div": {
            display: "inline-flex",
            alignItems: "center",
            position: "relative",
            padding: "0 25px 0 20px",
            borderRadius: 30,
            // height: 50,
            // marginBottom: 3,
            transition: "background-color 0.1s ease-in-out"
        }
    },

    // logo tomiru new
    logoContainer: {
        display: "flex",
        alignItems: "center",
        padding: "0 25px 0 20px",
        marginBottom: 10,
        marginTop: 20
    },
    iconImage: {
        width: "2.5rem"
    },
    logoText: {
        color: "#0A0A0A",
        fontWeight: 500,
        fontSize: 30,
        marginLeft: 10,
        textDecoration: "none",
        cursor: "pointer"
    },
    navLink: {
        textDecoration: "none"
    },
    //

    logoIcon: {
        marginLeft: 7,
        "& .MuiIconButton-root": {
            minWidth: 52,
            minHeight: 52,
            "& svg": {
                color: theme.palette.primary.main,
                height: "2rem",
                width: "2rem"
            }
        }
    },
    homeNotification: {
        position: "absolute",
        marginLeft: 20,
        marginBottom: 25,
        width: 6,
        height: 6,
        borderRadius: "50%",
        backgroundColor: theme.palette.primary.main
    },
    count: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        marginLeft: 10,
        width: 19,
        height: 19,
        borderRadius: "50%",
        backgroundColor: theme.palette.primary.main,
        fontSize: 20,
        color: theme.palette.common.white,
        textAlign: "center"
    },
    popover: {
        width: 198,
        height: "auto",
        boxShadow: "rgb(101 119 134 / 20%) 0px 0px 15px, rgb(101 119 134 / 15%) 0px 0px 3px 1px",
        marginLeft: 40,
        marginTop: 50,
        "& svg": {
            marginRight: 12,
            fill: theme.palette.text.primary
        }
    },
    listItemWrapper: {
        "& a": {
            textDecoration: "none"
        },
        "& .MuiListItem-root": {
            color: theme.palette.text.primary,
            padding: "16px 0px 16px 16px",
            "&:hover": {
                cursor: "pointer",
                backgroundColor: theme.palette.secondary.main
            }
        },
        "& .MuiDivider-root": {
            backgroundColor: theme.palette.divider
        }
    },
    button: {
        height: "52px !important",
        padding: theme.spacing(3.2),
        marginTop: theme.spacing(2),
        "& .MuiButton-label": {
            fontSize: 20
        }
    },
    followerRequestsCount: {
        display: "inline-block",
        marginLeft: 4,
        padding: "0px 7px",
        borderRadius: "50%",
        backgroundColor: theme.palette.primary.main,
        fontSize: 20,
        color: theme.palette.common.white,
        textAlign: "center"
    }
}));
