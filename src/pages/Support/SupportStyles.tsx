import { makeStyles } from "@material-ui/core";

export const useSupportStyles = makeStyles((theme) => ({
    header: {
        paddingTop: 20,
        paddingBottom: 20,
        justifyContent: "space-between",
        "& .MuiTypography-h5": {
            marginLeft: 16,

            display: "inline-block",
            verticalAlign: "middle"
        }
    },
    headerIcon: {
        paddingRight: 10
    },
    addForm: {
        padding: "100px 20px 0px ",
        width: "100%",

        justifyContent: "center",
        alignItems: "center"
    },
    divider: {
        height: 12,
        backgroundColor: theme.palette.divider
    },
    tabs: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: `1px solid ${theme.palette.divider}`,
        "& .MuiTabs-indicator": {
            marginLeft: 65,
            maxWidth: 110,
            height: 4,
            backgroundColor: theme.palette.primary.main
        },
        "& .MuiTab-root": {
            fontWeight: 700
        },
        "& .MuiTab-labelIcon": {
            minHeight: 0,
            paddingTop: 0
        },
        paddingBottom: 2
    },
    tab: {
        minWidth: 240,
        textTransform: "none",
        "&:hover": {
            backgroundColor: theme.palette.secondary.light
        }
    },
    card: {
        margin: "10px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "30px",
        border: "1px solid #A1A1A1",
        width: "270px",
        height: "270px",
        cursor: "pointer",
        backgroundColor: "white", // Màu nền mặc định
        transition: "background-color 0.3s", // Thêm hiệu ứng chuyển đổi
        "&:hover": {
            backgroundColor: theme.palette.secondary.light // Màu nền khi hover
        }
    }
}));
