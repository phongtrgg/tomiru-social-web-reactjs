import { makeStyles } from "@material-ui/core";

export const useLoginStyles = makeStyles((theme) => ({
    header: {
        backgroundColor: "white",
        paddingTop: 20
    },
    titleHeader: {
        marginLeft: 10,
        fontSize: 20,
        fontWeight: 600,
        textTransform: "uppercase"
    },
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        backgroundColor: "#fff",
        marginTop: 30
    },
    formContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: 400,
        width: "100%",
        padding: theme.spacing(4),
        borderRadius: 8,
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
    },
    title: {
        marginBottom: theme.spacing(2),
        marginRight: theme.spacing(9),
        fontSize: "2.8rem",
        width: "80%",
        fontWeight: 700
    },
    inputField: {
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(3)
    },
    input: {
        width: "100%",
        padding: "10px 40px 10px 10px",
        borderRadius: 4,
        border: "1px solid #ccc",
        fontSize: "14px",
        marginTop: 10,
        outline: "none"
    },
    inputLabel: {
        opacity: 0.6
    },
    inputFieldInfor: {
        marginTop: 10,
        position: "relative"
    },
    forgotPassword: {
        textDecorationColor: "#0F1419",
    },
    textForgotPassword: {
        marginTop: "4px",
        color: "#0F1419"
    },
    button: {
        marginTop: theme.spacing(2),
        backgroundColor: "#1da1f2",
        height: 50,
        color: "#fff",
        "&:hover": {
            backgroundColor: "#0d8bec"
        }
    },
    inputContainer: {
        alignItems: "center",
        width: "100%",
        marginTop: 20
    },
    eyeIcon: {
        position: "absolute",
        right: 10,
        top: "50px",
        transform: "translateY(-50%)"
    },
    error: {
        padding: "12px 16px",
        borderRadius: 12,
        marginTop: 12,
        backgroundColor: "rgb(255, 210, 218)"
    },
}));
