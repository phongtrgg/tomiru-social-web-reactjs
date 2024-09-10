import { makeStyles } from "@material-ui/core";

export const useFollowListButtonStyles = makeStyles((theme) => ({
    listPrimaryButton: {
        marginRight: 28,
        width: 135,
        "&:hover": {
            backgroundColor: theme.palette.error.dark
        }
    },
    listOutlinedButton: {
        "&:hover": {
            backgroundColor: theme.palette.secondary.light
        }
    }
}));
