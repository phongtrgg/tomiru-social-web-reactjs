import React, { ReactElement, useState } from "react";

import { Paper, Typography } from "@material-ui/core";

import iconTomiru from "../../../assets/icontomiru.png";
import { useAccountBalanceTagsStyles } from "../AccountBalanceStyles";
import HideShowTomxu from "./HideShowTomxu";
import { useSelector } from "react-redux";
import { select } from "redux-saga/effects";
import { selectPTomxuBalance } from "../../../store/ducks/wallet/selectors";
import { formatUserBalance } from "../../../util/format-number";

const PTomxu = (): ReactElement => {
    const classes = useAccountBalanceTagsStyles();
    const [hidden, setHidden] = useState(false);
    const toggleVisibility = () => {
        setHidden(!hidden);
    };
    const pXu = useSelector(selectPTomxuBalance);
    return (
        <>
            <Paper style={{ outline: "none", border: "none", marginTop: 20 }}>
                <Typography component="h6" variant="body2" style={{ fontWeight: 500, fontSize: 26, color: "#1D9BF0" }}>
                    pTomxu <img src={iconTomiru} alt="" style={{ width: 17, marginLeft: 7 }} />
                </Typography>

                <HideShowTomxu number={pXu ? formatUserBalance(pXu) : "0"} />
            </Paper>
        </>
    );
};

export default PTomxu;
