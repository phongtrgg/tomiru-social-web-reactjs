import React, { FC, ReactElement, useState } from "react";
import Button from "@material-ui/core/Button";
// import { useDispatch } from 'react-redux';
import { useAccountBalanceButtonStyles } from "./AccountBalanceButtonStyles";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import QRCodeModalReceive from "./ModalReceive/ModalReceive";
import { useTranslation } from "react-i18next";

const AccountBalanceReceiveButton: FC = (): ReactElement => {
    const { t } = useTranslation();
    const classes = useAccountBalanceButtonStyles();
    // const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            <Button className={classes.button} variant="contained" onClick={handleOpenModal}>
                {t("receive")} <FileDownloadOutlinedIcon />
            </Button>
            <QRCodeModalReceive open={modalOpen} handleClose={handleCloseModal} />
        </>
    );
};

export default AccountBalanceReceiveButton;
