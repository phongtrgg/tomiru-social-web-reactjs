import { makeStyles } from "@material-ui/core";
export const useAddTweetImagesShowStyles = makeStyles((theme) => ({
    box12: {
        display: "grid",
        gridTemplateColumns: "504"
    },
    box36: {
        width: 504,
        display: "grid",
        gridTemplateColumns: "auto auto",
        gap: 2
    },
    box6: { width: 504, display: "grid", gridTemplateColumns: "auto auto auto", gap: 1 },
    image12: {
        position: "relative",
        "& img": {
            objectFit: "cover",
            marginTop: 10,
            width: 504,
            height: 280,
            borderRadius: 20,
            borderColor: theme.palette.info.light
        }
    },
    image36: {
        position: "relative",
        "& img": {
            objectFit: "cover",
            marginTop: 1,
            width: 258,
            height: 200,
            borderRadius: 15,
            borderColor: theme.palette.info.light
        }
    },
    image6: {
        position: "relative",
        "& img": {
            objectFit: "cover",
            marginTop: 1,
            width: 168,
            height: 100,
            borderRadius: 10,
            borderColor: theme.palette.info.light
        }
    },
    imageRemove: {
        "& .MuiIconButton-root": {
            padding: 6,
            top: 15,
            left: 5,
            position: "absolute",
            backgroundColor: theme.palette.common.black,
            opacity: 0.75,
            "& svg": {
                verticalAlign: "top",
                fill: theme.palette.common.white,
                width: 18,
                height: 18
            },
            "&:hover": {
                backgroundColor: "rgba(39, 44, 48, 0.75) !important"
            }
        }
    }
}));
