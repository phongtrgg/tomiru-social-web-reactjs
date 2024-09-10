import { makeStyles } from "@material-ui/core";

export const useCheckInButtonStyles = makeStyles((theme) => ({
    outlinedButton: {
        float: "right",
        width: 179,
        backgroundColor: theme.palette.secondary.main,
        "&:hover": {
            backgroundColor: theme.palette.secondary.light
        }
    },
    button: {
        height: "52px !important",
        marginLeft: "10px",
        width: "260px !important",
        padding: theme.spacing(3),
        marginTop: theme.spacing(2),
        "& .MuiButton-label": {
            fontSize: 15
        }
    }
}));
