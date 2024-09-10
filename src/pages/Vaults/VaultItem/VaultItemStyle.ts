import { makeStyles } from "@material-ui/core";

export const useVaultItemStyles = makeStyles((theme) => ({
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
    vaultsTitle: {
        marginLeft: "32px",
        fontSize: "32px",
        fontWeight: 600
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
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "30px",
        border: "1px solid #A1A1A1",
        width: "270px",
        height: "270px",
        margin: "0px 10px 7px 10px",
        cursor: "pointer",
        backgroundColor: "white", // Màu nền mặc định
        transition: "background-color 0.3s", // Thêm hiệu ứng chuyển đổi
        "&:hover": {
            backgroundColor: theme.palette.secondary.light // Màu nền khi hover
        }
    },
    vaultNameBar: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px"
    },
    vaultName: { fontSize: "24px", fontWeight: 600 },
    vaultIconDiv: {
        height: "100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "end",
        paddingTop: "10px",
        paddingBottom: "10px"
    },
    vaultIcon: { width: "80%" },
    vaultValueDiv: {
        display: "flex",

        alignItems: "center",
        gap: "5px",
        textAlign: "left"
    },
    vaultValue: { fontSize: "32px", fontWeight: 600, textAlign: "left" },
    vaultUnitDiv: {
        marginTop: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "5px"
    },
    vaultUnit: { marginLeft: "5px", fontSize: "16px", fontWeight: 400 },
    vaultInfoDiv: { padding: "5px ", marginLeft: "-12px" },
    vaultInfoCount: { fontSize: "16px", fontWeight: 700 },
    vaultInfo: { marginLeft: "5px", fontSize: "8px", fontWeight: 400 },
    vaultEndTime: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "5px",
        textAlign: "left"
    },
    modalHeader: {
        display: "flex",
        justifyContent: "left",
        alignItems: "center",
        gap: "10px",
        padding: "10px",
        marginBottom: "10px"
    }
}));
