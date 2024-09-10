import React, { ChangeEvent, FC, ReactElement, useEffect, useState } from "react";
import logo from "../../../assets/icontomiru.png";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Button, Divider, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { t } from "i18next";

const TreeHeader: FC = (): ReactElement => {
    return (
        <>
            <Container fixed style={{ padding: "10px 0" }}>
                <div style={{ position: "absolute", left: "30px", top: "8px" }}>
                    <Link
                        to={"/home"}
                        style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}
                    >
                        <img src={logo} alt="" />
                        <p style={{ fontSize: "20px" }}>Tomiru</p>
                    </Link>
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
                        <Link to={"/home"} style={{ color: "#474747", textDecoration: "none" }}>
                            {t("home")}
                        </Link>

                        <ArrowForwardIosOutlinedIcon style={{ color: "#474747", fontSize: "14px" }} />

                        <span> {t("network")}</span>
                    </div>
                </Box>
            </Container>
            <Divider />
        </>
    );
};

export default TreeHeader;
