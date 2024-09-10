import { makeStyles } from "@material-ui/core";

export const useAccountBalanceButtonStyles = makeStyles((theme) => ({
    button: {
        height: "52px !important",
        marginLeft: "10px",
        marginBottom: "10px",
        width: "150px !important",
        padding: theme.spacing(3),
        marginTop: theme.spacing(2),
        "& .MuiButton-label": {
            fontSize: 15
        },
        color: "white",
        backgroundColor: "black"
    }
}));
