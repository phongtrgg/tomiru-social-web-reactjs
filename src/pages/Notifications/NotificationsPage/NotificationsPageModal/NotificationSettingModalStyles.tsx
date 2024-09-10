import { makeStyles } from "@material-ui/core";

export const useNotificationSettingModalStylesStyles = makeStyles((theme) => ({
    modalWrapper: {
        width: 487,
        padding: "20px 20px",
        "& svg": {},
        "& .MuiTypography-subtitle1": {
            marginTop: 8,
            marginBottom: 24
        },
        "& .MuiButton-root": {
            width: 134,
            "& .MuiButton-label": {
                fontSize: 15,
                lineHeight: "20px"
            }
        }
    },
    modalButtonWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    modalCancelButton: {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.divider
    },
    modalDeleteButton: {
        "&.MuiButton-contained": {
            color: theme.palette.common.white,
            backgroundColor: theme.palette.secondary.main
        },
        "&.MuiButton-contained:hover": {
            backgroundColor: theme.palette.secondary.dark
        }
    },
    modalPrimaryButton: {
        "&.MuiButton-contained": {
            color: theme.palette.common.white,
            backgroundColor: theme.palette.primary.main
        },
        "&.MuiButton-contained:hover": {
            backgroundColor: "rgb(26, 145, 218)"
        }
    }
}));
