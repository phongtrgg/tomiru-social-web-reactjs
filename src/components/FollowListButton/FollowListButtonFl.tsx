import React, { FC, ReactElement, useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@material-ui/core";

import { useFollowListButtonStyles } from "./FollowListButtonStyles";
import { followList, unfollowList } from "../../store/ducks/lists/actionCreators";

interface FollowListButtonProps {
    listId: number;
    isFollower: boolean;
}

const FollowListButtonFl: FC<FollowListButtonProps> = ({ listId, isFollower }): ReactElement => {
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

    return (
        <Button
            className={classes[isFollower ? "listPrimaryButton" : "listOutlinedButton"]}
            variant={isFollower ? "contained" : "outlined"}
            color="primary"
            size="small"
        >
            Đã theo dõi
        </Button>
    );
};

export default FollowListButtonFl;
