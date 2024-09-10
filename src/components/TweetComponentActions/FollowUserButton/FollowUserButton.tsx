import React, { FC, memo, ReactElement } from "react";
import { useDispatch } from "react-redux";
import { ListItem, Typography } from "@material-ui/core";

import { FollowIcon, UnfollowIcon } from "../../../icons";
import { followUser, unfollowUser } from "../../../store/ducks/user/actionCreators";
import { useTranslation } from "react-i18next";

interface FollowUserButtonProps {
    tweetId: number;
    userId: number;
    username: string;
    isFollower: boolean;
}

const FollowUserButton: FC<FollowUserButtonProps> = memo((
    {
        tweetId,
        userId,
        username,
        isFollower
    }
): ReactElement => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const handleFollow = (): void => {
        if (isFollower) {
            dispatch(unfollowUser({ userId, tweetId }));
        } else {
            dispatch(followUser({ userId, tweetId }));
        }
    };

    return (
        <ListItem id={"handleFollow"} onClick={handleFollow}>
            <>{isFollower ? UnfollowIcon : FollowIcon}</>
            <Typography variant={"body1"} component={"span"}>
                {isFollower ? t("unfollow") : t("follow")} @{username}
            </Typography>
        </ListItem>
    );
});

export default FollowUserButton;
