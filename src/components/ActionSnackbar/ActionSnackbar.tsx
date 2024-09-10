import React, { ReactElement } from "react";
import { Box, Divider, Snackbar } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { useActionSnackbarStyles } from "./ActionSnackbarStyles";
import {
    selectOpenSnackBar,
    selectSnackBarMessage,
    selectErrorSnackBar
} from "../../store/ducks/actionSnackbar/selector";
import { setCloseSnackBar } from "../../store/ducks/actionSnackbar/actionCreators";
import { Check, Error, CloseOutlined } from "@material-ui/icons";

const ActionSnackbar = (): ReactElement => {
    const classes = useActionSnackbarStyles();
    const dispatch = useDispatch();
    const snackBarMessage = useSelector(selectSnackBarMessage);
    const openSnackBar = useSelector(selectOpenSnackBar);
    const isError = useSelector(selectErrorSnackBar);
    const backgroundColor = isError ? "#d32f2f" : "#1D9BF0";
    const icon = isError ? <CloseOutlined /> : <Check />;

    return (
        <Snackbar
            className={classes.snackBar}
            anchorOrigin={{ horizontal: "center", vertical: "top" }}
            open={openSnackBar}
            message={
                <Box display="flex" alignItems="center">
                    <Box
                        style={{
                            marginRight: "8px",
                            backgroundColor,
                            color: "white",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "4px"
                        }}
                    >
                        {icon}
                    </Box>
                    <Divider
                        orientation="vertical"
                        variant="middle"
                        flexItem
                        style={{ paddingRight: "1px", backgroundColor: `${backgroundColor}80` }}
                    />
                    <Box
                        style={{
                            color: isError ? "#d32f2f" : "#1D9BF0",
                            marginLeft: "8px"
                        }}
                    >
                        {snackBarMessage || "Error"}
                    </Box>
                </Box>
            }
            onClose={() => dispatch(setCloseSnackBar())}
            autoHideDuration={3000}
        />
    );
};

export default ActionSnackbar;
