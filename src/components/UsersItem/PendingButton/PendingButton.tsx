import React, { FC, ReactElement, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button/Button";

import { usePendingButtonStyles } from "./PendingButtonStyles";
import { processFollowRequest } from "../../../store/ducks/user/actionCreators";
import { UserResponse } from "../../../types/user";
import { useTranslation } from "react-i18next";

interface PendingButtonProps {
    user?: UserResponse;
}

const PendingButton: FC<PendingButtonProps> = ({ user }): ReactElement => {
    const classes = usePendingButtonStyles();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [btnText, setBtnText] = useState<string>(t("pending"));

    const cancelFollow = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        dispatch(processFollowRequest(user!.id));
    };

    return (
        <Button
            className={classes.outlinedButton}
            onClick={cancelFollow}
            onMouseOver={() => setBtnText(t("cancel"))}
            onMouseLeave={() => setBtnText(t("pending"))}
            color="primary"
            variant="outlined"
            size="small"
        >
            {btnText}
        </Button>
    );
};

export default PendingButton;
