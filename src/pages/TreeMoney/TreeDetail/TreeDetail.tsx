import React, { ChangeEvent, FC, ReactElement, useEffect, useState } from "react";
import logo from "../../../assets/Logo.png";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Button, Divider, Typography } from "@material-ui/core";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import TransactionTable from "./TreeTable";
import { useTranslation } from "react-i18next";

const TreeDetail: FC = (): ReactElement => {
    const { t } = useTranslation();
    return (
        <>
            <Container fixed style={{ padding: "10px 0" }}>
                <div style={{ position: "absolute", left: "40px", top: "20px" }}>
                    <img src={logo} alt="" />
                </div>
                <Box>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                            fontSize: "14px",
                            gap: "5px",
                            margin: "10px 0",
                            position: "relative"
                        }}
                    >
                        <span style={{ color: "#474747" }}>{t("home")}</span>

                        <ArrowForwardIosOutlinedIcon style={{ color: "#474747", fontSize: "14px" }} />

                        <span>Quản Lý Tomxu</span>
                        <ArrowForwardIosOutlinedIcon style={{ color: "#474747", fontSize: "14px" }} />

                        <span>Chi tiết thu nhập</span>
                    </div>
                </Box>
                <Divider />
                <Box style={{ display: "flex", justifyContent: "left", gap: "10px", marginTop: "20px" }}>
                    <Box>
                        <div>
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
                                    <p
                                        style={{
                                            fontSize: "20px",
                                            fontWeight: 500,
                                            color: "#0F1419",
                                            marginBottom: "10px"
                                        }}
                                    >
                                        Thu nhập từ hệ thống
                                    </p>
                                    <div>
                                        <span
                                            style={{
                                                fontSize: "32px",
                                                color: "#0F1419",
                                                fontWeight: 500,
                                                marginRight: "10px"
                                            }}
                                        >
                                            1,1123.12
                                        </span>
                                        <span style={{ fontSize: "16px", color: "#0F1419", fontWeight: 700 }}>
                                            pTOMXU
                                        </span>
                                    </div>
                                </Box>
                            </div>
                        </div>
                    </Box>
                    <TransactionTable />
                </Box>
            </Container>

            <Container></Container>
        </>
    );
};

export default TreeDetail;
