import * as React from "react";
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Paper,
    Select,
    MenuItem,
    Typography,
    IconButton,
    FormControl,
    InputLabel
} from "@mui/material";
import SouthOutlinedIcon from "@mui/icons-material/SouthOutlined";
import classNames from "classnames";
import { useTreePlantStyles } from "../TreePlantStyles";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
interface Data {
    transactionId: number;
    transactionType: string;
    amount: string;
    from: string;
    to: string;
    token: string;
    time: string;
}

function createData(
    transactionId: number,
    transactionType: string,
    amount: string,
    from: string,
    to: string,
    token: string,
    time: string
): Data {
    return { transactionId, transactionType, amount, from, to, token, time };
}

const rows = [
    createData(1231241241, "Thưởng đăng ký", "+12,123.45", "NguyenVanA", "NguyenVanA", "pTOMXU", "23:43:12 24/10/2023"),
    createData(
        1231241241,
        "Thưởng hoa hồng",
        "+12,123.45",
        "NguyenVanA",
        "NguyenVanA",
        "pTOMXU",
        "23:43:12 24/10/2023"
    ),
    createData(1231241241, "Thưởng đăng ký", "+12,123.45", "NguyenVanA", "NguyenVanA", "pTOMXU", "23:43:12 24/10/2023")
];
export default function CustomTable() {
    const [page, setPage] = React.useState(0);
    const classes = useTreePlantStyles();
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    return (
        <Box sx={{ width: "100%", p: 2, boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", borderRadius: "10px" }}>
            <Box sx={{ width: "100%", mb: 2 }}>
                <Box
                    sx={{ display: "flex", justifyContent: "left", alignItems: "center", gap: "10px", padding: "10px" }}
                >
                    <div style={{ border: "1px solid #ccc", padding: "5px 10px", width: "190px", borderRadius: "8px" }}>
                        {" "}
                        <label style={{ color: "#474747" }}>Loại giao dịch</label>
                        <select
                            id="cars"
                            style={{
                                padding: "5px  10px",

                                outline: "none",
                                border: "none",
                                color: "#0F1419",
                                fontWeight: 700
                            }}
                        >
                            <option
                                value="volvo"
                                style={{
                                    padding: "15px  10px",
                                    outline: "none",
                                    border: "none",
                                    color: "#0F1419",
                                    fontWeight: 700
                                }}
                            >
                                Tất cả
                            </option>
                            {/* <option
                                value="saab"
                                style={{
                                    padding: "15px  10px",
                                    outline: "none",
                                    border: "none",
                                    color: "#0F1419",
                                    fontWeight: 700
                                }}
                            >
                                Thưởng đăng ký
                            </option>
                            <option
                                value="opel"
                                style={{
                                    padding: "15px  10px",
                                    outline: "none",
                                    border: "none",
                                    color: "#0F1419",
                                    fontWeight: 700
                                }}
                            >
                                Thưởng hoa hồng
                            </option> */}
                        </select>
                    </div>
                    <div
                        style={{
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            padding: "5px 10px",
                            width: "205px",
                            display: "flex",
                            alignItems: "center"
                        }}
                    >
                        {" "}
                        <label style={{ color: "#474747" }}>
                            Loại TOMXU: <SouthOutlinedIcon style={{ fontSize: "14px" }} />{" "}
                        </label>
                        <select
                            id="cars"
                            style={{
                                padding: "5px  10px",
                                outline: "none",
                                border: "none",
                                color: "#0F1419",
                                fontWeight: 700
                            }}
                        >
                            <option
                                value="volvo"
                                style={{
                                    padding: "15px  10px",
                                    outline: "none",
                                    border: "none",
                                    color: "#0F1419",
                                    fontWeight: 700
                                }}
                            >
                                Tất cả
                            </option>
                        </select>
                    </div>
                </Box>
                <TableContainer sx={{ padding: "10px" }}>
                    <div>
                        {" "}
                        <Table>
                            <TableHead className={classes.tableHead}>
                                <TableCell
                                    align="right"
                                    className={classes.tableHeadCellFirst}
                                    sx={{ padding: "10px" }}
                                >
                                    Mã giao dịch
                                </TableCell>
                                <TableCell align="right">
                                    <span
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            position: "relative",
                                            justifyContent: "center",
                                            backgroundColor: "#EBEBEB",
                                            padding: "5px 25px 5px 5px",
                                            borderRadius: "8px",
                                            cursor: "pointer"
                                        }}
                                    >
                                        Loại giao dịch{" "}
                                        <ArrowDropDownOutlinedIcon style={{ position: "absolute", right: "-2px" }} />
                                    </span>
                                </TableCell>
                                <TableCell align="right">Số lượng</TableCell>
                                <TableCell align="right">
                                    <span
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            position: "relative",
                                            justifyContent: "center",
                                            backgroundColor: "#EBEBEB",
                                            padding: "5px 0px",
                                            borderRadius: "8px",
                                            cursor: "pointer"
                                        }}
                                    >
                                        Từ <ArrowDropDownOutlinedIcon />
                                    </span>
                                </TableCell>
                                <TableCell align="right">
                                    <span
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            position: "relative",
                                            justifyContent: "center",
                                            backgroundColor: "#EBEBEB",
                                            padding: "5px 0px",
                                            borderRadius: "8px",
                                            cursor: "pointer"
                                        }}
                                    >
                                        Đến <ArrowDropDownOutlinedIcon />
                                    </span>
                                </TableCell>
                                <TableCell align="right">
                                    <span
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            position: "relative",
                                            justifyContent: "center",
                                            backgroundColor: "#EBEBEB",
                                            padding: "5px",
                                            borderRadius: "8px",
                                            cursor: "pointer"
                                        }}
                                    >
                                        Token <ArrowDropDownOutlinedIcon />
                                    </span>
                                </TableCell>
                                <TableCell className={classes.tableHeadCellEnd} align="right">
                                    Thời gian
                                </TableCell>
                            </TableHead>
                            <TableBody>
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                    <TableRow key={row.transactionId}>
                                        <TableCell align="right">{row.transactionId}</TableCell>
                                        <TableCell align="left">
                                            <span
                                                style={{
                                                    padding: "5px 10px",
                                                    backgroundColor: "#2FABFF",
                                                    color: "white",
                                                    borderRadius: "53px"
                                                }}
                                            >
                                                {" "}
                                                {row.transactionType}
                                            </span>
                                        </TableCell>
                                        <TableCell align="right">{row.amount}</TableCell>
                                        <TableCell align="right">{row.from}</TableCell>
                                        <TableCell align="right">{row.to}</TableCell>
                                        <TableCell align="right">{row.token}</TableCell>
                                        <TableCell align="right">{row.time}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                            <Stack spacing={2}>
                                <Pagination
                                    count={10}
                                    color="primary"
                                    variant="outlined"
                                    className={classes.pagination}
                                    hidePrevButton
                                    hideNextButton
                                />
                            </Stack>
                        </div>
                    </div>
                </TableContainer>
            </Box>
        </Box>
    );
}
