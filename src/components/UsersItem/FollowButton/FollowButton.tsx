import React, { FC, ReactElement } from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button/Button";

import { followUser, processFollowRequest } from "../../../store/ducks/user/actionCreators";
import { useFollowButtonStyles } from "./FollowButtonStyles";
import { UserResponse } from "../../../types/user";
import { useTranslation } from "react-i18next";

interface FollowButtonProps {
    user?: UserResponse;
}

const FollowButton: FC<FollowButtonProps> = ({ user }): ReactElement => {
    const classes = useFollowButtonStyles();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const handleFollow = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();

        if (user?.isPrivateProfile) {
            dispatch(processFollowRequest(user.id));
        } else {
            dispatch(followUser({ userId: user!.id! }));
        }
    };

    return (
        <Button
            className={classes.outlinedButton}
            onClick={handleFollow}
            color="primary"
            variant="outlined"
            size="small"
        >
            {t("follow")}
        </Button>
    );
};

export default FollowButton;
