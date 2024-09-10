import React, { FC, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useTransactionPageStyles } from "./TransactionPageStyles";
import IconTomiru from "../../assets/Logo.png";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Tab, Tabs, ThemeProvider, createTheme } from "@material-ui/core";

import { useHistory } from "react-router-dom";

import { fetchWalletUser } from "../../store/ducks/wallet/actionsCreator";
import { useTranslation } from "react-i18next";
import AccountBalance from "../../components/AccountBalance/AccountBalance";
import Transaction from "./TransactionItem/Transaction";
import TransactionP2P from "./TransactionItem/TransactionP2P";
import { selectTransactionDisplayTab } from "../../store/ducks/transactionHistoryDisplayType/selectors";
import { setTabToDisplayTransaction } from "../../store/ducks/transactionHistoryDisplayType/actionCreators";
const TransactionPage: FC<any> = ({ userId, isPrivateProfile, size }): ReactElement => {
    const { t } = useTranslation();

    const displayTab = useSelector(selectTransactionDisplayTab);
    useEffect(() => {
        dispatch(fetchWalletUser());
    }, []);

    const classes = useTransactionPageStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const [value, setValue] = useState(0);
    // const [modalOpen, setModalOpen] = useState(false);

    // const handleOpen = () => {
    //     setModalOpen(true);
    // };

    // const handleClose = () => {
    //     setModalOpen(false);
    // };

    const handleChange = (event: any, newValue: any) => {
        // if (newValue === 0) {
        //     history.push(TRANSACTION_PAGE);
        // } else {
        //     history.push(TRANSACTION_PAGE_P2P);
        // }
        dispatch(setTabToDisplayTransaction(newValue));
    };
    const theme = createTheme({
        palette: {
            primary: {
                main: "#0F1419"
            },
            secondary: {
                main: "#00ff00"
            }
        }
    });
    return (
        <>
            <div>
                <div className={classes.header}>
                    <img style={{ cursor: "pointer" }} src={IconTomiru} alt="" onClick={() => history.push("/home")} />
                    <div style={{ display: "flex", gap: "10px" }}>
                        <h2 onClick={() => history.push("/home")}>
                            {t("home")}
                            <span>
                                <ArrowForwardIosIcon style={{ fontSize: "10px", marginLeft: "10px" }} />
                            </span>
                        </h2>
                        <p>{t("transaction-management")}</p>
                    </div>
                </div>
                <hr />

                <div className={classes.containerGroup}>
                    <div className={classes.leftSide}>
                        <AccountBalance />
                    </div>

                    <div className={classes.rightSide}>
                        <div>
                            <div className={classes.tabs}>
                                <ThemeProvider theme={theme}>
                                    <Tabs
                                        value={displayTab}
                                        onChange={handleChange}
                                        indicatorColor="primary"
                                        textColor="primary"
                                    >
                                        <Tab
                                            className={classes.tab}
                                            label={<p className={classes.tapItem}>{t("transaction-management")}</p>}
                                        />

                                        <Tab label={<p className={classes.tapItem}>{t("P2P-transaction")}</p>} />
                                    </Tabs>
                                </ThemeProvider>
                            </div>
                        </div>

                        {displayTab === 0 ? <Transaction /> : <TransactionP2P />}
                    </div>
                </div>
            </div>
        </>
    );
};

export default TransactionPage;
