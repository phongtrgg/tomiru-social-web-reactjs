import { makeStyles } from "@material-ui/core";

export const useCreateListsModalInputStyles = makeStyles(() => ({
    container: {
        padding: "10px 0",
        position: "relative"
    },
    content: {
        position: "absolute",
        right: 25,
        display: "flex",
        zIndex: 3,
        marginTop: 8
    }
}));
