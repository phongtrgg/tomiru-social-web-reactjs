import React, { ReactElement, useState } from "react";

import { useAccountBalanceTagsStyles } from "./AccountBalanceStyles";
import AccountBalanceSendButton from "../Buttons/AccountBalanceButton/AccountBalanceSendButton";
import AccountBalanceReceiveButton from "../Buttons/AccountBalanceButton/AccountBalanceReceiveButton";
import PTomxu from "./AcountBalanceItem/PTomxu";
import Tomxu from "./AcountBalanceItem/Tomxu";
import ModalTransfer from "../Buttons/AccountBalanceButton/ModalTransfer/ModalTransfer";
const AccountBalance = (): ReactElement => {
    const classes = useAccountBalanceTagsStyles();

    const [modalOpen, setModalOpen] = useState(false);

    const handleOpen = () => {
        setModalOpen(true);
    };

    const handleClose = () => {
        setModalOpen(false);
    };

    return (
        <>
            <div>
                <Tomxu />
                <PTomxu />
            </div>
            <div>
                <AccountBalanceSendButton size="medium" handleOpen={handleOpen}/>
                <AccountBalanceReceiveButton />
                <ModalTransfer open={modalOpen} onClose={handleClose} />
            </div>
        </>
    );
};

export default AccountBalance;
