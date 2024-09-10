import React, { FC, memo, ReactElement } from "react";
import { useDispatch } from "react-redux";
import { ListItem, Typography } from "@material-ui/core";

import { MuteIcon, UnmuteIcon } from "../../../icons";
import { processUserToMuteList } from "../../../store/ducks/user/actionCreators";
import { setOpenSnackBar } from "../../../store/ducks/actionSnackbar/actionCreators";
import { useTranslation } from "react-i18next";

interface MuteUserButtonProps {
    tweetId: number;
    userId: number;
    username: string;
    isUserMuted: boolean;
}

const MuteUserButton: FC<MuteUserButtonProps> = memo((
    {
        tweetId,
        userId,
        username,
        isUserMuted
    }
): ReactElement => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const onMuteUser = (): void => {
        dispatch(processUserToMuteList({ userId, tweetId }));
        dispatch(setOpenSnackBar(`@${username} ${t("has_been")} ${isUserMuted ? t("unmute") : t("mute")}.`));
    };

    return (
        <ListItem id={"onMuteUser"} onClick={onMuteUser}>
            <>{isUserMuted ? UnmuteIcon : MuteIcon}</>
            <Typography variant={"body1"} component={"span"}>
                {isUserMuted ? t("unmute") : t("mute")} @{username}
            </Typography>
        </ListItem>
    );
});

export default MuteUserButton;
