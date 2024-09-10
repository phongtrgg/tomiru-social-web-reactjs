import { makeStyles } from "@material-ui/core";

export const useCreateListsModalStyles = makeStyles(() => ({
    wallpaperWrapper: {
        borderRadius: 10,
        width: 380,
        height: 120,
        backgroundColor: "#B2B2B2",
        position: "relative",
        zIndex: 1
    },
    wallpaperImg: {
        borderRadius: 10,
        objectFit: "cover",
        position: "absolute",
        zIndex: 1,
        width: 380,
        height: 120
    },
    wallpaperEditImg: {
        zIndex: 5,
        position: "absolute",
        top: "45%",
        left: "48%"
    },
    footerWrapper: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    dialogContent: {
        height: 650
    }
}));
