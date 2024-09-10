import React, { ChangeEvent, FC, useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    Button,
    Tabs,
    Tab,
    InputAdornment,
    Typography,
    TextField,
    IconButton,
    Snackbar,
    CircularProgress
} from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";
import Groups2Icon from "@mui/icons-material/Groups2";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import classnames from "classnames";
import { useFollowerRequestsModalStyles } from "../../../SideMenu/SideMenuMoreItem/FollowerRequestsModal/FollowerRequestsModalSyles";
import { Alert } from "@material-ui/lab";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useDispatch } from "react-redux";
import { setOpenErrorSnackBar, setOpenSnackBar } from "../../../../store/ducks/actionSnackbar/actionCreators";
import { useModalTransferStyles } from "./ModalTransferStyles";
import Card from "@mui/material/Card";
import ScanQR from "./ScanQR";
import { useTranslation } from "react-i18next";
import { walletAPI } from "../../../../services/api/wallet-service/walletApi";

interface MembersModalProps {
    open: boolean;
    onClose: () => void;
}

const ModalTransfer: FC<MembersModalProps> = ({ open, onClose }) => {
    const classes = useModalTransferStyles();
    const isPositiveRealNumber = (value: any): boolean => {
        return typeof value === "number" && !isNaN(value) && isFinite(value) && value > 0;
    };
    const [quantity, setQuantity] = useState<number | string>("");
    const [quantityError, setQuantityError] = useState<string>("");
    const [qrModalOpen, setQrModalOpen] = useState<boolean>(false);
    const [confirmationModalOpen, setConfirmationModalOpen] = useState<boolean>(false);
    const [loadingModalOpen, setLoadingModalOpen] = useState<boolean>(false);

    const [adress, setAddress] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [otp, setOtp] = useState<string>("");
    const resetValue = () => {
        setOtp("");
        setMessage("");
        setAddress("");
        setQuantity(0);
    };
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const handleChangeQUantity = (event: { target: { value: any } }) => {
        const value = event.target.value;
        setQuantity(value);

        const quantityNumber = parseFloat(value);

        if (isNaN(quantityNumber)) {
            setQuantityError("Vui lòng nhập số");
        } else if (quantityNumber <= 0) {
            setQuantityError("Số lượng phải lớn hơn 0");
        } else {
            setQuantityError("");
        }
    };

    const handleClickQr = () => {
        setQrModalOpen(true);
    };
    const handleCloseQr = () => {
        setQrModalOpen(false);
    };

    const handleQrScanComplete = () => {
        setQrModalOpen(false);
        setConfirmationModalOpen(true);
        setLoadingModalOpen(false);
        onClose();
    };

    const handleConfirmationModalClose = () => {
        setConfirmationModalOpen(false);
        // onClose();
    };

    const handleBack = () => {
        setConfirmationModalOpen(false);
    };

    const handleSend = async () => {
        try {
            setConfirmationModalOpen(false);
            onClose();
            setLoadingModalOpen(true);
            const data = await walletAPI.sendToken({
                codeOtp: otp,
                message: message,
                value: parseFloat(quantity as string),
                email: adress
            });
            setLoadingModalOpen(false);

            dispatch(setOpenSnackBar(t("sent-success")));
        } catch (error) {
            setConfirmationModalOpen(false);
            onClose();
            setLoadingModalOpen(false);
            dispatch(setOpenErrorSnackBar(error.response.data.error.message));
        }
    };

    const handleClickOTP = async () => {
        try {
            const { data } = await walletAPI.sendTokenOTP();

            if (data.data.sent) {
                dispatch(setOpenSnackBar(t("otp-was-sent-please-check-email")));
            }
        } catch {
            dispatch(setOpenErrorSnackBar(t("otp-wasn't-sent")));
        }
    };
    const handleClickSend = () => {
        const quantityNumber = parseFloat(quantity as string);
        if (isPositiveRealNumber(quantityNumber)) {
            if (adress.trim() !== "" && otp.trim() !== "") {
                setConfirmationModalOpen(true);
            } else {
                dispatch(setOpenErrorSnackBar(t("otp-and-address-cannot-be-empty")));
            }
        } else {
            dispatch(setOpenErrorSnackBar(t("Invalid-TOMXU-quantity")));
        }
    };
    return (
        <>
            {/* <Toaster
                    position="top-center"
                    reverseOrder={false}
                    toastOptions={{
                        style: {
                          zIndex: 9999,
                        },
                      }}
        /> */}
            <Dialog open={open} onClose={onClose} className={classes.dialogPaper}>
                <DialogTitle className={classes.dialogTitle}>
                    <Card sx={{ boxShadow: "none" }} className={classes.areaClose}>
                        <CloseIcon onClick={onClose} className={classes.closeIcon} />
                    </Card>
                </DialogTitle>
                <Card sx={{ boxShadow: "none" }} className={classes.dialogContent}>
                    <Card sx={{ boxShadow: "none" }} className={classes.dialogContentDetails}>
                        <Typography variant="h3" className={classes.titleModal1}>
                            {`${t("send")} TOMXU`}
                        </Typography>

                        <label className={classes.labelFields}>{t("amount")}</label>
                        <input
                            type="text"
                            placeholder={t("amount")}
                            className={classes.quantityField}
                            value={quantity}
                            onChange={handleChangeQUantity}
                        />
                        <Card sx={{ boxShadow: "none" }} className={classes.notiError}>
                            {quantityError && <span className={classes.errorText}>{quantityError}</span>}
                        </Card>

                        <Card sx={{ boxShadow: "none" }} className={classes.areaReceiveField}>
                            <label className={classes.labelFields}>{t("name-or-email-of-receiver")}</label>
                            <input
                                type="text"
                                placeholder={t("wallet's address")}
                                className={classes.receiveAddressField}
                                value={adress}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            <IconButton onClick={handleClickQr} className={classes.areaIconQr}>
                                <QrCodeScannerIcon />
                            </IconButton>
                        </Card>

                        <label className={classes.labelFields}>{t("note")}</label>
                        <textarea
                            rows={6}
                            placeholder={t("message-to-receiver")}
                            className={classes.noteField}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        ></textarea>

                        <Card sx={{ boxShadow: "none" }} className={classes.areaOTPField}>
                            <label className={classes.labelFields}>{`${t("OTP-confirm")}`}</label>
                            <input
                                type="text"
                                placeholder="OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className={classes.otpField}
                            />
                            <Card sx={{ boxShadow: "none" }} className={classes.areaClickSendOTP}>
                                <Card
                                    sx={{ boxShadow: "none" }}
                                    className={classes.clickSendOTP}
                                    onClick={handleClickOTP}
                                >
                                    {`${t("send")} OTP`}
                                </Card>
                            </Card>
                        </Card>

                        <Typography variant="body2" color="textSecondary" className={classes.fee}>
                            {`${t("cost")}: 0.005 TOMXU`}
                        </Typography>
                        <Button
                            onClick={handleClickSend}
                            color="primary"
                            variant="contained"
                            className={classes.buttonSend}
                        >
                            {t("send")}
                        </Button>
                    </Card>
                </Card>
            </Dialog>

            <Dialog open={qrModalOpen} onClose={handleCloseQr} className={classes.dialogPaper}>
                <DialogTitle className={classes.dialogTitle}>
                    <Card sx={{ boxShadow: "none" }} className={classes.areaClose}>
                        <CloseIcon onClick={handleCloseQr} className={classes.closeIcon} />
                    </Card>
                </DialogTitle>

                <Card sx={{ boxShadow: "none" }} className={classes.mainBodyScanQr}>
                    <Typography className={classes.titleModal2}>Hướng camera về phía mã QR</Typography>
                    <Card sx={{ boxShadow: "none" }} className={classes.mainBodyScanQrDetails}>
                        {/* <Card sx={{ boxShadow: 'none' }} className={classes.areaScanQr}>
                                <ScanQR/>
                            </Card> */}
                        <ScanQR transferScreen={handleQrScanComplete} close={handleCloseQr} />
                    </Card>
                </Card>

                <Button onClick={handleQrScanComplete} color="primary">
                    Xong
                </Button>
            </Dialog>

            <Dialog open={confirmationModalOpen} onClose={handleConfirmationModalClose} className={classes.dialogPaper}>
                <DialogTitle className={classes.dialogTitle}>
                    <Card sx={{ boxShadow: "none" }} className={classes.areaClose}>
                        <CloseIcon onClick={handleConfirmationModalClose} className={classes.closeIcon} />
                    </Card>
                </DialogTitle>
                <Card sx={{ boxShadow: "none" }} className={classes.mainBodyModalConfirm}>
                    <Card sx={{ boxShadow: "none" }} className={classes.mainBodyModalConfirmDetails}>
                        <Card sx={{ boxShadow: "none" }} className={classes.confirmText}>
                            {`${t("confirm")} ${t("send")}`}
                        </Card>
                        <Card sx={{ boxShadow: "none" }} className={classes.amountText}>
                            {`${quantity} TOMXU`}
                        </Card>
                        <Card sx={{ boxShadow: "none" }} className={classes.toText}>
                            {t("to")}
                        </Card>
                        <Card sx={{ boxShadow: "none" }} className={classes.emailText}>
                            {adress}
                        </Card>
                        <Card sx={{ boxShadow: "none" }} className={classes.feeText}>
                            {`${t("cost")}: 0.005 TOMXU`}
                        </Card>
                    </Card>
                </Card>
                <Card sx={{ boxShadow: "none" }} className={classes.areaDecision}>
                    <Button
                        onClick={handleSend}
                        color="primary"
                        variant="contained"
                        className={classes.buttonSendModal3}
                    >
                        {t("send")}
                    </Button>
                    <Button onClick={handleBack} color="primary" className={classes.buttonBack}>
                        {t("back")}
                    </Button>
                </Card>
            </Dialog>

            <Dialog open={loadingModalOpen} className={classes.dialogProgress}>
                <DialogTitle className={classes.dialogTitleProgress}>
                    <Typography variant="h5">
                        <CircularProgress />
                    </Typography>
                </DialogTitle>
            </Dialog>
        </>
    );
};

export default ModalTransfer;
