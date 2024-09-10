import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { List, ListItem, Paper, Typography } from "@material-ui/core";

import { selectIsTagsLoading, selectTagsItems } from "../../store/ducks/tags/selectors";

import { useTransactionStyles } from "./TransactionStyles";
import HistoryTransactionButton from "../Buttons/TransactionButton/HistoryTransactionButton";
import TransactionButton from "../Buttons/TransactionButton/TransactionButton";

const Transaction = (): ReactElement => {
    const classes = useTransactionStyles();

    const tags = useSelector(selectTagsItems);
    const isTagsLoading = useSelector(selectIsTagsLoading);

    return (
        <>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <HistoryTransactionButton />
                <TransactionButton />
            </div>
        </>
    );
};

export default Transaction;
