import React, { FC, ReactElement } from "react";
import Button from "@material-ui/core/Button/Button";
import { useDispatch } from "react-redux";

import { useTransactionButtonStyles } from "./TransactionButtonStyles";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { setTabToDisplayTransaction } from "../../../store/ducks/transactionHistoryDisplayType/actionCreators";
import { TRANSACTION_HISTORY_TAB } from "../../../store/ducks/transactionHistoryDisplayType/states";

const TransactionButton: FC<any> = ({ userId, isPrivateProfile, size }): ReactElement => {
    const { t } = useTranslation();
    const classes = useTransactionButtonStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const handleClick = () => {
        history.push("/account/transaction");
        dispatch(setTabToDisplayTransaction(TRANSACTION_HISTORY_TAB.P2P_TAB));
    };
    return (
        <Button onClick={handleClick} className={classes.outlinedButton} color="primary" variant="outlined">
            <CloseFullscreenIcon className={classes.icon} /> {t("TOMXU-exchange")}
        </Button>
    );
};

export default TransactionButton;
