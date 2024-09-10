import React, { FC, ReactElement } from "react";
import Button from "@material-ui/core/Button/Button";
import { useDispatch } from "react-redux";
import { useTransactionButtonStyles } from "./TransactionButtonStyles";
import ReplayIcon from "@mui/icons-material/Replay";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom"; // Import useHistory
import {
    setTabToDisplayTransaction,
    setTypeToDisplayTransaction
} from "../../../store/ducks/transactionHistoryDisplayType/actionCreators";
import {
    TRANSACTION_HISTORY_TAB,
    TRANSACTION_HISTORY_TYPES
} from "../../../store/ducks/transactionHistoryDisplayType/states";

const HistoryTransactionButton: FC<any> = ({ userId, isPrivateProfile, size }): ReactElement => {
    const classes = useTransactionButtonStyles();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();

    const handleClick = () => {
        history.push("/account/transaction");
        dispatch(setTabToDisplayTransaction(TRANSACTION_HISTORY_TAB.TRANSACTION_TAB));
        dispatch(setTypeToDisplayTransaction(TRANSACTION_HISTORY_TYPES.ALL));
    };

    return (
        <Button onClick={handleClick} className={classes.outlinedButton} color="primary" variant="outlined" size={size}>
            <ReplayIcon className={classes.icon} /> {t("transaction-history")}
        </Button>
    );
};

export default HistoryTransactionButton;
