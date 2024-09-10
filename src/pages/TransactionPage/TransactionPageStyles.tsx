import { makeStyles } from "@material-ui/core";
import { setBackgroundColor } from "../../store/ducks/user/actionCreators";

export const useTransactionPageStyles = makeStyles((theme) => ({
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
        fontSize: "14px !important"
    },
    select: {
        display: "flex",
        alignItems: "center",
        marginBottom: "20px",
        marginTop: "20px"
    },
    table: {
        width: "100%",
        borderRadius: "10px",
        overflow: "hidden",

        borderCollapse: "collapse"
    },
    tableTitle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    tableThead: {
        textAlign: "left",
        padding: "10px",
        backgroundColor: "#9e9e9e",

        marginTop: "20px",
        "& th": {
            padding: "10px"
        }
    },
    tbody: {
        width: "90%"
    },
    tr: {
        height: "30px",
        textAlign: "center",
        padding: "10px",
        backgroundColor: "#E7E7E866"
    },
    td: {
        paddingLeft: "10px",
        textAlign: "left",
        whiteSpace: "nowrap"
    },
    pagination: {
        marginTop: "30px",
        display: "flex",
        justifyContent: "center"
    },
    spanSelect: {
        paddingLeft: "10px",
        paddingRight: "10px",
        paddingTop: "5px",
        paddingBottom: "5px",
        borderWidth: "1px",
        borderRadius: "8px",
        borderColor: "black",
        marginRight: "20px",
        borderStyle: "solid",
        display: "flex",
        cursor: "pointer",
        gap: "0.5rem"
    },
    spanSelect2: {
        paddingLeft: "10px",
        paddingRight: "10px",
        paddingTop: "5px",
        paddingBottom: "5px",
        borderWidth: "1px",
        borderRadius: "8px",
        borderColor: "black",
        borderStyle: "solid",
        display: "flex",
        cursor: "pointer",
        gap: "0.5rem"
    }
}));
