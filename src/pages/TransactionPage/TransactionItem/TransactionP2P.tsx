import React, { FC, ReactElement, useEffect, useState } from "react";
import Button from "@material-ui/core/Button/Button";
import { useDispatch, useSelector } from "react-redux";

import ReplayIcon from "@mui/icons-material/Replay";
import IconTomiru from "../../../assets/Logo.png";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
    Chip,
    MenuItem,
    Select,
    Tab,
    Tabs,
    ThemeProvider,
    Typography,
    createTheme,
    makeStyles
} from "@material-ui/core";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Pagination } from "@material-ui/lab";
import { useGlobalStyles } from "../../../util/globalClasses";
import Tomxu from "../../../components/AccountBalance/AcountBalanceItem/Tomxu";
import PTomxu from "../../../components/AccountBalance/AcountBalanceItem/PTomxu";
import AccountBalanceSendButton from "../../../components/Buttons/AccountBalanceButton/AccountBalanceSendButton";
import AccountBalanceReceiveButton from "../../../components/Buttons/AccountBalanceButton/AccountBalanceReceiveButton";

import { Link, useHistory } from "react-router-dom";
import { TRANSACTION_PAGE, TRANSACTION_PAGE_P2P } from "../../../constants/path-constants";
import { useTranslation } from "react-i18next";
import AccountBalance from "../../../components/AccountBalance/AccountBalance";
import { useTransactionP2PStyles } from "./TransactionP2PStyles";
import { fetchAgents } from "../../../store/ducks/agents/actionCreators";
import {
    selectAgentsCurrentPage,
    selectAgentsList,
    selectAgentsLoadingStatus,
    selectAgentsTotalPages
} from "../../../store/ducks/agents/selectors";
import { LoadingStatus } from "../../../types/common";
import EmptyTransactionItem from "./EmptyTransactionItem";
import { AgentResponse } from "../../../store/ducks/agents/contract/states";
import TransactionP2PItem from "./TransactionP2PItem";
const TransactionP2P: FC<any> = ({ userId, isPrivateProfile, size }): ReactElement => {
    const { t } = useTranslation();
    const classes = useTransactionP2PStyles();
    const dispatch = useDispatch();
    const agentsList = useSelector(selectAgentsList);
    const agentsLoadingStatus = useSelector(selectAgentsLoadingStatus);
    const currentPage = useSelector(selectAgentsCurrentPage);
    const totalPages = useSelector(selectAgentsTotalPages);

    useEffect(() => {
        dispatch(fetchAgents());
    }, []);
    return (
        <>
            <div className={classes.select}>
                <span className={classes.selectSpan}>
                    <span
                        style={{
                            display: "flex",
                            alignItems: "center"
                        }}
                    >
                        Trạng thái:
                    </span>
                    <span>
                        <select style={{ border: "none", fontWeight: "bold", outline: "none" }}>
                            Tất cả
                            <option value="">Tất cả</option>
                            <option value="">Tất cả</option>
                            <option value="">Tất cả</option>
                            <option value="">Tất cả</option>
                        </select>
                    </span>
                    {/* <ArrowDropDownIcon /> */}
                </span>

                <span className={classes.selectSpan}>
                    <span
                        style={{
                            display: "flex",
                            alignItems: "center"
                        }}
                    >
                        Sắp xếp:
                    </span>
                    <select className={classes.selectContent}>
                        <option value="">Khối lượng giao dịch</option>
                        <option value="">Số lượng giao dịch</option>
                    </select>
                    {/* <ArrowDropDownIcon /> */}
                </span>
            </div>

            <div className={classes.box}>
                {agentsLoadingStatus === LoadingStatus.LOADING ? (
                    <EmptyTransactionItem title={t("loading")} />
                ) : agentsLoadingStatus === LoadingStatus.ERROR ? (
                    <EmptyTransactionItem title={t("nothing-to-show")} />
                ) : (
                    agentsList?.map((a: AgentResponse, i: number) => <TransactionP2PItem agent={a} key={i} />)
                )}
            </div>

            <div className={classes.pagination}>
                <Pagination count={totalPages} hidePrevButton hideNextButton color="primary" />
            </div>
        </>
    );
};

export default TransactionP2P;
