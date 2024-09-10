import React, { FC, ReactElement, useEffect, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useTransactionPageStyles } from "../TransactionPageStyles";
import { useTranslation } from "react-i18next";
import { LoadingStatus } from "../../../types/common";
import { Pagination } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import { fetchWalletHistory, fetchWalletIncomeHistory } from "../../../store/ducks/walletHistory/actionsCreator";
import {
    selectWalletHistoryList,
    selectWalletHistoryLoadingStatus,
    selectWalletHistoryTotalPages
} from "../../../store/ducks/walletHistory/selectors";
import { formatTimestamp } from "../../../util/format-date-helper";
import { TOMXU_TYPES, TRANSACTION_ICOME_HISTORY_TYPES, TRANSACTION_TYPES } from "../../../types/wallet";
import EmptyTransactionItem from "./EmptyTransactionItem";
import { truncateString } from "../../../util/text-formatter";
import { selectTransactionDisplayType } from "../../../store/ducks/transactionHistoryDisplayType/selectors";
import { TRANSACTION_HISTORY_TYPES } from "../../../store/ducks/transactionHistoryDisplayType/states";
import { formatUserBalance } from "../../../util/format-number";
const Transaction: FC<any> = (): ReactElement => {
    const dispatch = useDispatch();
    const classes = useTransactionPageStyles();
    const { t } = useTranslation();
    const walletHistoryList = useSelector(selectWalletHistoryList);
    const displayType = useSelector(selectTransactionDisplayType);
    const [orderBy, setOrderBy] = useState<string>("DESC");
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [tomxuType, setTomxuType] = useState<string>("");
    const [transactionType, setTransactionType] = useState<string>("");
    const totalPages = useSelector(selectWalletHistoryTotalPages);
    const status = useSelector(selectWalletHistoryLoadingStatus);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPageNumber(value);
    };
    useEffect(() => {
        if (displayType === TRANSACTION_HISTORY_TYPES.ALL) {
            dispatch(fetchWalletHistory(orderBy, pageNumber, tomxuType, transactionType));
        } else {
            dispatch(fetchWalletIncomeHistory(orderBy, pageNumber, tomxuType, transactionType));
        }
    }, [pageNumber, tomxuType, transactionType, orderBy, displayType]);
    return (
        <div>
            <div className={classes.select}>
                <span className={classes.spanSelect}>
                    <span>{`${t("Transaction-type")} :`}</span>

                    {/* <ArrowDropDownIcon /> */}
                    <select
                        value={transactionType}
                        onChange={(e) => {
                            setTransactionType(e.target.value);
                            setPageNumber(1);
                        }}
                    >
                        <option value="">{t("all")}</option>
                        {displayType === TRANSACTION_HISTORY_TYPES.ALL
                            ? TRANSACTION_TYPES.map((type: any, i: number) => (
                                  <option value={`&filters[type]=${type.key}`} key={i}>
                                      {t(type.key)}
                                  </option>
                              ))
                            : TRANSACTION_ICOME_HISTORY_TYPES.map((type: any, i: number) => (
                                  <option value={`&filters[type]=${type.key}`} key={i}>
                                      {t(type.key)}
                                  </option>
                              ))}
                    </select>
                </span>
                <span className={classes.spanSelect2}>
                    <span>{t("TOMXU-type")}</span>
                    <select
                        value={tomxuType}
                        onChange={(e) => {
                            setPageNumber(1);
                            setTomxuType(e.target.value);
                        }}
                    >
                        <option value="">{t("all")}</option>
                        {TOMXU_TYPES.map((type: any, i: number) => (
                            <option value={type.key}>{type.display}</option>
                        ))}
                    </select>
                </span>
            </div>

            <div
                style={{
                    borderRadius: "10px",
                    border: "1px solid #F4F8FB",
                    boxShadow: "0 2px 10px rgba(244, 248, 251, 1)",
                    marginTop: "20px"
                }}
            >
                <table className={classes.table}>
                    <thead className={classes.tableThead}>
                        <th>{t("Transaction-code")}</th>
                        <th>
                            <span className={classes.tableTitle}>{t("Transaction-type")}</span>
                        </th>
                        <th>
                            <span
                                onClick={() => {
                                    if (orderBy === "DESC") {
                                        setOrderBy("ASC");
                                    } else {
                                        setOrderBy("DESC");
                                    }
                                }}
                                className={classes.tableTitle}
                            >
                                {t("amount")}
                                {orderBy === "DESC" ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
                            </span>
                        </th>
                        <th>
                            <span className={classes.tableTitle}>{t("from")}</span>
                        </th>
                        <th>
                            <span className={classes.tableTitle}>{t("to")}</span>
                        </th>
                        <th>
                            <span className={classes.tableTitle}>Token</span>
                        </th>
                        <th>{t("time")}</th>
                    </thead>
                    <tbody className={classes.tbody}>
                        {status === LoadingStatus.LOADING ? (
                            <EmptyTransactionItem title={t("loading")} />
                        ) : status === LoadingStatus.ERROR ? (
                            <EmptyTransactionItem title={t("error")} />
                        ) : walletHistoryList && walletHistoryList.length > 0 ? (
                            walletHistoryList.map((item, index) => (
                                <tr
                                    key={index}
                                    className={classes.tr}
                                    style={{
                                        backgroundColor: index % 2 === 0 ? "#f0f2f1" : "white"
                                    }}
                                >
                                    <td className={classes.td}>{truncateString(item.hash, 15)}</td>
                                    <td className={classes.td}>
                                        <span>
                                            <small
                                                style={{
                                                    borderRadius: "10px",
                                                    paddingLeft: "10px",
                                                    paddingRight: "10px",
                                                    backgroundColor: TRANSACTION_TYPES.find((t) => t.key === item.type)
                                                        ?.color
                                                }}
                                            >
                                                {t(item.type)}
                                            </small>
                                        </span>
                                    </td>
                                    <td className={classes.td}>{`${item.typeValue} ${formatUserBalance(
                                        item.value
                                    )}`}</td>
                                    <td className={classes.td}>{item.toName}</td>
                                    <td className={classes.td}>{item.fromName}</td>
                                    <td className={classes.td}>{item.token === "Doanh Thu" ? "TOMXU" : "pTOMXU"}</td>
                                    <td className={classes.td}>{formatTimestamp(item.createdAt.toString())}</td>
                                </tr>
                            ))
                        ) : (
                            <EmptyTransactionItem title={t("nothing-to-show")} />
                        )}
                    </tbody>
                </table>
            </div>

            <div className={classes.pagination}>
                <Pagination
                    onChange={handlePageChange}
                    page={pageNumber}
                    count={totalPages}
                    hidePrevButton
                    hideNextButton
                    color="primary"
                />
            </div>
        </div>
    );
};
export default Transaction;
