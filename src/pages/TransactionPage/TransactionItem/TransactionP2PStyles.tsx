import { makeStyles } from "@material-ui/core";

export const useTransactionP2PStyles = makeStyles((theme) => ({
    containerGroup: {
        display: "flex",
        gap: "20px",
        marginLeft: "200px"
    },
    leftSide: {
        width: "335px",
        border: "1px solid #F4F8FB",
        boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
        marginTop: "20px",
        height: 300,
        padding: "5px"
        // backgroundColor: "#F4F8FB",
    },
    rightSide: {
        marginTop: "20px",
        boxShadow: " rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;",
        width: 800,
        height: 600,
        padding: "10px",
        borderRadius: "10px"
    },
    header: {
        display: "flex",
        alignItems: "center",
        gap: "180px",
        margin: "20px 20px",
        "& h2": {
            fontSize: "14px",
            fontWeight: 400,
            cursor: "pointer"
        }
    },
    container1: {
        width: "280px",
        fontSize: "14px !important",
        marginLeft: "25px"
    },
    container2: {
        fontSize: "14px !important"
    },
    tabs: {
        fontWeight: 400,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10
    },
    tab: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        "& .MuiTabs-indicator": {
            marginLeft: 18,
            maxWidth: 100,
            height: 4,
            backgroundColor: theme.palette.primary.main
        },
        "& .MuiTab-root": {
            fontWeight: 700
        },
        "& .MuiTab-labelIcon": {
            minHeight: 0,
            paddingTop: 0
        }
    },
    tapItem: {
        display: "flex",
        alignItems: "center",
        gap: 10
    },
    select: {
        display: "flex",
        alignItems: "center",
        marginBottom: "20px",
        marginTop: "20px"
    },
    selectSpan: {
        paddingLeft: "10px",
        paddingRight: "10px",
        paddingTop: "5px",
        paddingBottom: "5px",
        borderWidth: "1px",
        borderRadius: "8px",
        borderColor: "black",
        marginRight: "20px",
        borderStyle: "solid", // Để đảm bảo rằng border được hiển thị
        display: "flex",
        cursor: "pointer",
        gap: "0.5rem"
    },
    selectContent: {
        border: "none",
        fontWeight: "bold",
        outline: "none",
        cursor: "pointer",
        ":hover": {
            backgroundColor: " red"
        }
    },
    box: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px",
        padding: "5px 15px"
    },
    boxContent: {
        width: "350px",
        padding: "10px",
        backgroundColor: "#E7E7E8",
        borderRadius: "16px",
        border: "1px solid #A1A1A1"
    },
    infor: {
        marginBottom: "10px",
        padding: "5px",
        "& p": {
            fontSize: "12px",
            fontWeight: 400
        }
    },
    headerContent: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "5px",
        "& h3": {
            fontSize: "16px !important",
            fontWeight: 600
        },
        "& P": {
            width: "53px",
            fontSize: "12px",
            fontWeight: "400",
            textAlign: "center",
            padding: "5px",
            backgroundColor: "#91FF7F",
            borderRadius: "16px"
        }
    },
    imageContent: {
        width: "16px",
        height: "16px"
    },
    contact: {
        display: "flex",
        alignItems: "center",
        gap: "5px",
        "& span": {
            fontSize: "14px",
            fontWeight: 400
        }
    },
    pagination: {
        marginTop: "50px",
        display: "flex",
        justifyContent: "center"
    }
}));
