import React, { ReactElement } from "react";

import { List, ListItem, Paper, Typography } from "@material-ui/core";

import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import iconTomiru from "../../../assets/icontomiru.png";
import { useAccountBalanceTagsStyles } from "../AccountBalanceStyles";
import HideShowTomxu from "./HideShowTomxu";
import { useSelector } from "react-redux";
import { selectTomxuBalance } from "../../../store/ducks/wallet/selectors";
import { formatUserBalance } from "../../../util/format-number";

const Tomxu = (): ReactElement => {
    const classes = useAccountBalanceTagsStyles();
    const tXU = useSelector(selectTomxuBalance);

    return (
        <>
            <Paper style={{ outline: "none", border: "none" }}>
                <Typography
                    component="h6"
                    variant="body2"
                    style={{ fontWeight: 500, fontSize: 26, display: "flex", alignItems: "center", color: "#1D9BF0" }}
                >
                    Tomxu <img src={iconTomiru} alt="" style={{ width: 17, marginLeft: 10 }} />
                </Typography>

                <HideShowTomxu number={tXU ? formatUserBalance(tXU) : "0"} />
            </Paper>
        </>
    );
};

export default Tomxu;
