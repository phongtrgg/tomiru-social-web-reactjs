import { makeStyles } from "@material-ui/core";

export const useTransactionStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: theme.palette.secondary.main,
        borderRadius: 16,
        marginTop: 20,
        "& .MuiList-root": {
            "& .MuiListItem-root": {
                "&:hover": {
                    cursor: "pointer",
                    backgroundColor: theme.palette.secondary.dark
                }
            },
            "& .MuiListItemText-primary": {
                color: theme.palette.text.primary,
                "&:hover": {
                    textDecoration: "underline"
                }
            },
            "& a": {
                textDecoration: "none"
            }
        }
    },
    header: {
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 16,
        height: 130,
        padding: "10px 10px 4px 18px"
    },
    header1: {
        padding: "10px 0 0 0",
        display: "flex",
        justifyContent: "space-around"
    },
    item: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        "& .MuiTypography-body1": {
            fontWeight: 700
        }
    },
    footer: {
        padding: "16px !important",
        borderRadius: "0px 0px 16px 16px",
        cursor: "pointer",
        "& .MuiTypography-body1": {
            color: theme.palette.primary.main
        }
    }
}));
