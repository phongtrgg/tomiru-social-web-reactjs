import { makeStyles } from "@material-ui/core";

export const useTransactionButtonStyles = makeStyles((theme) => ({
    outlinedButton: {
        float: "right",
        width: 309,
        "&:hover": {
            backgroundColor: theme.palette.secondary.light
        },
        height: "52px !important",
        marginLeft: "10px",
        padding: theme.spacing(3),
        marginTop: theme.spacing(2),
        "& .MuiButton-label": {
            fontSize: 15
        }
    },
    icon: {
        marginRight: 10
    }
}));
