import { makeStyles } from "@material-ui/core";

export const useModalTransferStyles = makeStyles((theme) => ({
    dialogPaper: {
        width: "360px", 
        height: "auto", 
        marginLeft: "590px" 
    },
    dialogTitle: {
        borderBottom: "none",
    },
    closeIcon: {
        cursor: "pointer"
    },
    titleModal1: {
        marginTop: "30px"
    },
    titleModal2: {
        marginRight: '86px', 
        fontSize: "12px",
        fontWeight: 500, 
        lineHeight: "24px", 
        color: "#151515"
    },
    fee: {
        marginTop: "5px", 
        fontSize: "13px", 
        fontWeight: 400, 
        lineHeight: "21px", 
        color: "#474747" 
    },
    buttonSend: {
        width: "100%", 
        margin: "10px 0 20px 0" 
    },
    dialogProgress: {
        width: "300px", 
        textAlign: "center", 
        marginLeft: "620px", 
        marginBottom: "60px"
    },
    dialogTitleProgress: {
        borderBottom: "none", 
        width: "100px", 
        height: "100px", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center" 
    },
    buttonBack: {
        width: "85%",
        marginBottom: "35px", 
        color: "#000", 
        backgroundColor: "#fff", 
        border: "1px solid #000", 
    },
    buttonSendModal3: {
        marginBottom: "10px", 
        width: "85%"
    },
    areaClose: {
        display: "flex", 
        justifyContent: "flex-end", 
        alignItems: "center", 
        width: "100%", 
        position: "absolute", 
        top: 10, 
        left: -10,
        border: "none",
        boxShadow: "none"
    },
    areaDecision: {
        display: "flex", 
        alignItems:"center", 
        flexDirection: "column"
    },
    mainBodyScanQr: {
        width: "293px", 
        height: "340px", 
        marginTop: "10px", 
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center", 
        alignItems: "center", 
    },
    mainBodyScanQrDetails: {
        width: "85%", 
        height: "80%", 
        border: "3.5px solid #1D9BF0", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
    },
    areaScanQr: {
        width: "71%", 
        height: "78%", 
        border: "1.5px solid #1D9BF0"
    },
    mainBodyModalConfirm: {
        width: "293px", 
        height: "190px",
        marginTop: "30px", 
        display: "flex", 
        flexDirection: "column", 
        alignItems:"center", 
        justifyContent: "center",
        border: "none"
    },
    mainBodyModalConfirmDetails: {
        width: "60%", 
        height: "85%", 
        display: "flex", 
        flexDirection: "column", 
        alignItems:"center", 
        justifyContent: "flex-start",
        border: "none"
    },
    confirmText: {
        fontSize: "12px", 
        fontWeight: 400, 
        lineHeight: "20px", 
        color: "#474747" ,
        border: "none"
    },
    amountText: {
        fontSize: "15px", 
        fontWeight: 700, 
        lineHeight: "27px", 
        color: "#0F1419",
        border: "none"
    },
    toText: {
        fontSize: "12px",
        fontWeight: 400,
        lineHeight: "22px", 
        color: "#474747",
        border: "none"
    },
    emailText: {
        fontSize: "15px", 
        fontWeight: 700, 
        lineHeight: "27px", 
        color: "#0F1419",
        border: "none"
    },
    feeText: {
        fontSize: "13.5px", 
        fontWeight: 400, 
        lineHeight: "21px", 
        color: "#474747",
        border: "none"
    },
    dialogContent: {
        width: "100%", 
        height: "auto",
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        borderTop: "none",
        border: "none"
    },
    dialogContentDetails: {
        width: "85%", 
        height: "auto",
        display: "flex", 
        justifyContent: "center", 
        flexDirection: "column",
        border: "none"
    },
    labelFields: {
        fontSize: "13px", 
        fontWeight: 400, 
        lineHeight: "23px", 
        color: "#A1A1A1"
    },
    noteField: {
        resize: 'none', 
        // height: "61px", 
        width: "250px", 
        paddingLeft: "10px", 
        paddingRight: "10px", 
        paddingTop: "8px", 
        outline: "none", 
        border: "1.5px solid black", 
        borderRadius: "3px"
    },
    notiError: {
        height: "auto", 
        width: "auto", 
        display: "flex", 
        alignItems: "center", 
        marginBottom: "2px",
        border: "none"
    },
    quantityField: {
        height: "35px", 
        padding: "0 10px", 
        outline: "none", 
        border: "1.5px solid black", 
        borderRadius: "3px" 
    },
    receiveAddressField: {
        width: "100%", 
        height: "35px", 
        paddingLeft: "10px", 
        outline: "none", 
        paddingRight: "40px", 
        border: "1.5px solid black", 
        borderRadius: "3px" 
    },
    otpField: {
        width: "100%", 
        height: "35px", 
        paddingLeft: "10px", 
        outline: "none", 
        paddingRight: "60px", 
        border: "1.5px solid black", 
        borderRadius: "3px",
    },
    areaIconQr: {
        position: "absolute", 
        right: "1px", 
        top: "70%", 
        transform: "translateY(-50%)",
        border: "none",
        backgroundColor: "transparent"
    },
    areaReceiveAddressField: {
        width: "100%", 
        position: "relative",
        border: "none"
    },
    errorText: {
        fontSize: "10px", 
        fontWeight: 400, 
        lineHeight: "15px", 
        color: "#E03C39", 
        fontFamily: "Be Vietnam Pro" 
    },
    clickSendOTP: {
        width: "auto", 
        height: "auto", 
        cursor: "pointer", 
        fontSize: "13.5px", 
        fontWeight: 400, 
        lineHeight: "21px", 
        color: "#474747", 
        border: "none"
    },
    areaClickSendOTP: {
        position: "absolute", 
        right: "3px", 
        top: "70%", 
        transform: "translateY(-50%)",
        border: "none"
    },
    areaOTPField: {
        width: "100%", 
        position: "relative", 
        marginTop: "5px", 
        border: "none"
    },
    areaReceiveField: {
        width: "100%", 
        position: "relative",
        borer: "none"
    }
}))