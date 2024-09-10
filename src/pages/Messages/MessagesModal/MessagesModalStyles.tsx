import { makeStyles } from "@material-ui/core";

export const useMessagesModalStyles = makeStyles((theme) => ({
    content: {
        "& .MuiListItem-root.Mui-selected": {
            backgroundColor: theme.palette.secondary.main
        }
    },
    createAndClose: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "200px"
    },
    dialogContent: {
        width: 550,
        height: 500,
        padding: 0,
        overflowX: "hidden"
    }
}));
