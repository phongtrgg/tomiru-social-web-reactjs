import React, { FC, ReactElement, useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@material-ui/core";

import { useFollowListButtonStyles } from "./FollowListButtonStyles";
import { followList, unfollowList } from "../../store/ducks/lists/actionCreators";
import { t } from "i18next";

interface FollowListButtonProps {
    listId: number;
    isFollower: boolean;
}
//nút theo dõi trong nhóm
const FollowListButton: FC<FollowListButtonProps> = ({ listId, isFollower }): ReactElement => {
    const classes = useFollowListButtonStyles();
    const dispatch = useDispatch();
    const [btnText, setBtnText] = useState<string>("Following");

    const onClickFollow = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        event.preventDefault();
        event.stopPropagation();

        if (isFollower) {
            dispatch(unfollowList(listId));
        } else {
            dispatch(followList(listId));
        }
    };
    const changeStatus = () => {};

    return (
        <Button
            className={classes["listOutlinedButton"]}
            variant={"outlined"}
            color="primary"
            size="small"
            onClick={onClickFollow}
        >
            {t("follow")}
        </Button>
    );
};

export default FollowListButton;
