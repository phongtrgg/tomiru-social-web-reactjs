import { makeStyles } from "@material-ui/core";

export const useEditProfileModalNewStyle = makeStyles((theme) => ({
    wallpaperWrapper: {
        height: 200,
        backgroundColor: "#B2B2B2",
        position: "relative",
        zIndex: 1
    },
    wallpaperImg: {
        objectFit: "cover",
        position: "absolute",
        zIndex: 1,
        width: "100%",
        height: 200
    },
    wallpaperEditImg: {
        zIndex: 5,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    },
    avatarWrapper: {
        position: "relative",
        marginTop: -50,
        padding: 20,
        paddingTop: 0,
        fontSize: 16,
        "& .MuiAvatar-root": {
            zIndex: 4,
            width: "120px !important",
            height: "120px !important",
            border: "4px solid white"
        }
    },
    radio: {
        color: theme.palette.primary.main,
        "&$checked": {
            color: theme.palette.primary.main
        }
    },
    checked: {}, // Định nghĩa lớp CSS checked
    form: { overflowX: "hidden" },
    padd: { padding: "12px", width: "100%" },
    headBox: { display: "flex", justifyContent: "space-between", height: "40px" },
    header: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "500px"
    },
    button: { height: "30px", marginTop: "5px", width: "100px", marginRight: "10px" },
    flex: { display: "flex" },
    icon: { width: "18px", height: "20px" },
    textTitle: { fontSize: "17px", marginLeft: "7px" },
    buttonBox: {
        display: "flex",
        justifyContent: "flex-end",
        width: "100%"
    }
    // inputWrapper: {
    //     width: 200,
    //     height: 22,
    //     display: "flex",
    //     justifyContent: "space-between"
    // },

    // dialogContent: {
    //     width: 600,
    //     height: 500,
    //     padding: 0,
    //     overflowX: "hidden"
    // },
    // fullNameContainer: {
    //     width: "400px",
    //     paddingLeft: "25px",
    //     display: "flex",
    //     justifyContent: "space-between"
    // },
    // boxName: {
    //     // display: "flex",
    //     // flexDirection: "column"
    // },
    // inputName: {
    //     height: "40px",
    //     borderRadius: "4px",
    //     paddingLeft: "15px",
    //     border: "2px solid grey",
    //     outline: "none"
    // },
    // genderLabel: {
    //     marginLeft: "25px",
    //     marginTop: "20px",
    //     opacity: "0.5"
    // },
    // genderItem: {
    //     padding: "10px",
    //     width: "100px",

    //     margin: "5px",
    //     borderRadius: "5px",
    //     textAlign: "center",
    //     cursor: "pointer"
    // },

    // genderWrapper: {
    //     display: "flex",
    //     justifyContent: "space-between",
    //     paddingLeft: 20
    // },
    // phoneContainer: {
    //     width: "400px",
    //     paddingLeft: "25px",
    //     display: "flex",
    //     justifyContent: "space-between"
    // },
    // boxPhone: {
    //     display: "flex",
    //     flexDirection: "column",
    //     marginTop: "20px",
    //     marginBottom: "50px"
    // },
    // phoneInput: {
    //     height: "40px",
    //     borderRadius: "4px",
    //     paddingLeft: "15px",
    //     border: "2px solid grey",
    //     outline: "none",
    //     width: "375px"
    // }
}));
