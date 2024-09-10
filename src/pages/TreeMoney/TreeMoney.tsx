import React, { ChangeEvent, FC, ReactElement, useEffect, useState } from "react";
import { withDocumentTitle } from "../../hoc/withDocumentTitle";
import logo from "../../assets/Logo.png";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Button, Divider, Modal, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import SendIcon from "@mui/icons-material/Send";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import OrgChartTree from "./TreePlant";
import TreeHeader from "./TreeHeader/TreeHeader";
import BasicTabs from "./TreeModal/TreeModal";

import { fetchTree } from "../../store/ducks/tree/actionCreators";
import { useDispatch, useSelector } from "react-redux";
import { selectTreeF1, selectTreeResult, selectTrees, selectTreesToken } from "../../store/ducks/tree/selectors";
import { RawNodeDatum } from "react-d3-tree";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import {
    setTabToDisplayTransaction,
    setTypeToDisplayTransaction
} from "../../store/ducks/transactionHistoryDisplayType/actionCreators";
import {
    TRANSACTION_HISTORY_TAB,
    TRANSACTION_HISTORY_TYPES
} from "../../store/ducks/transactionHistoryDisplayType/states";
const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    height: 700,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4
};
const TreeMoney: FC = (): ReactElement => {
    const history = useHistory();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        history.push("/account/transaction");
        dispatch(setTabToDisplayTransaction(TRANSACTION_HISTORY_TAB.TRANSACTION_TAB));
        dispatch(setTypeToDisplayTransaction(TRANSACTION_HISTORY_TYPES.INCOME));
    };
    const handleClose = () => setOpen(false);
    const theme = useTheme();
    // const nodeSize = { x: 50, y: 150 };
    // const translate = { x: 700, y: 50 };
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTree());
    }, []);
    const { t } = useTranslation();
    const data = useSelector(selectTreeResult);
    const f1 = useSelector(selectTreeF1);
    const tree = useSelector(selectTrees);
    const token = useSelector(selectTreesToken);
    const transformData = (data: any, depth: number = 0): RawNodeDatum => {
        return {
            name: data.firstName + " " + data.lastName,
            attributes: {
                email: data.email
            },
            children: data.children ? data.children.map((child: any) => transformData(child, depth + 1)) : []
        };
    };
    const [showData, setShowData] = useState<any>();
    useEffect(() => {
        if (tree) {
            const transformedData = tree ? transformData(tree) : undefined;
            setShowData(transformedData);
        }
    }, [tree]);
    const [openUserDetails, setOpenUserDetails] = React.useState(false);
    const [infoUserDetails, setInfoUserDetails] = React.useState({});

    const showDetails = (email: string) => {
        const item = tree ? findItemByEmail(tree, email) : null;

        if (item) {
            setInfoUserDetails(item);
            setOpenUserDetails(true);
        } else {
            console.log("Item not found");
        }
    };
    const closeUserDetails = () => {
        setOpenUserDetails(false);
    };
    const findItemByEmail = (node: any, email: string): any => {
        if (node.email === email) {
            return node;
        }
        if (node.children) {
            for (const child of node.children) {
                const result = findItemByEmail(child, email);

                if (result) return result;
            }
        }
        return null;
    };
    const [nodeSize, setNodeSize] = useState({ x: 50, y: 150 });
    const [translate, setTranslate] = useState({ x: 700, y: 50 });
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            setNodeSize({
                x: width < 600 ? 30 : 50,
                y: height < 600 ? 100 : 150
            });

            setTranslate({
                x: width / 2 - 50,
                y: height / 2 - 350
            });
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            <TreeHeader />
            <div style={{ height: "100%", margin: "0 30px" }}>
                <div
                    style={{
                        padding: "30px 0",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                        height: "100%"
                    }}
                >
                    <Box>
                        <div>
                            <p
                                style={{
                                    fontSize: "20px",
                                    fontWeight: 500,
                                    color: "#0F1419",
                                    marginBottom: "10px"
                                }}
                            >
                                {t("detail")}
                            </p>
                            <div style={{ display: "flex", justifyContent: "left", gap: "10px" }}>
                                {" "}
                                <Box
                                    sx={{
                                        width: "295px",
                                        padding: "20px",
                                        backgroundColor: "#F4F8FB",
                                        borderRadius: "10px"
                                    }}
                                >
                                    <p style={{ fontSize: "16px", color: "#6D6D6D", fontWeight: 600 }}>
                                        {`F1 (${t("member")})`}
                                    </p>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center"
                                        }}
                                    >
                                        {showData && showData?.children && (
                                            <span style={{ fontSize: "32px", color: "#0F1419", fontWeight: 500 }}>
                                                {showData?.children.length}
                                            </span>
                                        )}

                                        <Button
                                            variant="contained"
                                            style={{
                                                color: "white",
                                                backgroundColor: "#1D9BF0",
                                                padding: "10px 15px"
                                            }}
                                            endIcon={<FileDownloadOutlinedIcon />}
                                        >
                                            {t("download")}
                                        </Button>
                                    </div>
                                </Box>
                                <Box
                                    sx={{
                                        width: "295px",
                                        padding: "20px",
                                        backgroundColor: "#F4F8FB",
                                        borderRadius: "10px"
                                    }}
                                >
                                    <p style={{ fontSize: "16px", color: "#6D6D6D", fontWeight: 600 }}>
                                        {`F1 (${t("non-member")})`}
                                    </p>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center"
                                        }}
                                    >
                                        {f1 && (
                                            <span style={{ fontSize: "32px", color: "#0F1419", fontWeight: 500 }}>
                                                {f1.length}
                                            </span>
                                        )}

                                        <Button
                                            variant="contained"
                                            style={{
                                                color: "white",
                                                backgroundColor: "#1D9BF0",
                                                padding: "10px 15px"
                                            }}
                                            endIcon={<FileDownloadOutlinedIcon />}
                                        >
                                            {t("download")}
                                        </Button>
                                    </div>
                                </Box>
                            </div>
                        </div>
                    </Box>
                    <Box>
                        <div>
                            <p
                                style={{
                                    fontSize: "20px",
                                    fontWeight: 500,
                                    color: "#0F1419",
                                    marginBottom: "10px"
                                }}
                            >
                                {t("income-from-system")}
                            </p>
                            <div style={{ display: "flex", justifyContent: "left", gap: "10px" }}>
                                <Box
                                    sx={{
                                        width: "295px",
                                        padding: "10px",
                                        backgroundColor: "#F4F8FB",
                                        borderRadius: "10px"
                                    }}
                                >
                                    <div>
                                        {token && (
                                            <span
                                                style={{
                                                    fontSize: "32px",
                                                    color: "#0F1419",
                                                    fontWeight: 500,
                                                    marginRight: "10px"
                                                }}
                                            >
                                                {token}
                                            </span>
                                        )}

                                        <span style={{ fontSize: "16px", color: "#0F1419", fontWeight: 700 }}>
                                            pTOMXU
                                        </span>

                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                            <div></div>
                                            <Button
                                                onClick={handleOpen}
                                                variant="contained"
                                                style={{
                                                    color: "white",
                                                    backgroundColor: "#1D9BF0",
                                                    padding: "10px 15px"
                                                }}
                                                endIcon={<FileDownloadOutlinedIcon />}
                                            >
                                                {t("view-detail")}
                                            </Button>
                                        </div>
                                    </div>
                                </Box>
                            </div>
                        </div>
                    </Box>
                </div>
                <Box
                    sx={{
                        textAlign: "center",
                        padding: "10px 20px",
                        backgroundColor: "#F4F8FB",
                        width: "100%",
                        borderRadius: "10px"
                    }}
                >
                    <h3 style={{ fontSize: "20px", fontWeight: 500, color: "#0F1419" }}>{t("network-discovery")}</h3>
                </Box>
                <Box
                    sx={{
                        // backgroundColor: "#F4F8FB",
                        width: "100%",
                        height: "100%"
                    }}
                >
                    {showData && (
                        <OrgChartTree nodeSize={nodeSize} translate={translate} data={showData} action={showDetails} />
                    )}
                </Box>
            </div>

            <Modal
                open={openUserDetails}
                onClose={closeUserDetails}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <BasicTabs data={infoUserDetails} onClose={closeUserDetails} />
                </Box>
            </Modal>
        </>
    );
};

export default withDocumentTitle(TreeMoney)("TreeMoney");
