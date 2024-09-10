import React, { FC, ReactElement } from "react";
import Button from "@material-ui/core/Button";
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined";
import { useAccountBalanceButtonStyles } from "./AccountBalanceButtonStyles";
import { useTranslation } from "react-i18next";

interface AccountBalanceSendButtonProps {
    size?: "small" | "medium" | "large";
    handleOpen: () => void;
}

const AccountBalanceSendButton: FC<any> = ({ size, handleOpen }: AccountBalanceSendButtonProps): ReactElement => {
    const { t } = useTranslation();
    const classes = useAccountBalanceButtonStyles();

    return (
        <Button className={classes.button} variant="contained" size={size} onClick={handleOpen}>
            {t("transfer")} <ArrowOutwardOutlinedIcon />
        </Button>
    );
};

export default AccountBalanceSendButton;
