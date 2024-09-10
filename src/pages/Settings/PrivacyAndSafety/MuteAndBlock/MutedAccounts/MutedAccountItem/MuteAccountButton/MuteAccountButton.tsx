import React, { FC, memo, ReactElement } from "react";
import { useDispatch } from "react-redux";

import ActionIconButton from "../../../../../../../components/ActionIconButton/ActionIconButton";
import { MuteIcon, UnmuteIcon } from "../../../../../../../icons";
import { processUserToMuteList } from "../../../../../../../store/ducks/user/actionCreators";
import { setOpenSnackBar } from "../../../../../../../store/ducks/actionSnackbar/actionCreators";
import { useMuteAccountButtonStyles } from "./MuteAccountButtonStyles";
import { useTranslation } from "react-i18next";

interface MuteAccountButtonProps {
    userId: number;
    username: string;
    isUserMuted: boolean;
}

const MuteAccountButton: FC<MuteAccountButtonProps> = memo(({ userId, username, isUserMuted }): ReactElement => {
    const dispatch = useDispatch();
    const classes = useMuteAccountButtonStyles({ isUserMuted });
    const { t } = useTranslation();
    const unmuteUser = (): void => {
        dispatch(processUserToMuteList({ userId }));
        dispatch(setOpenSnackBar(`@${username} ${t("has_been")} ${isUserMuted ? t("unmute") : t("mute")}.`));
    };

    return (
        <div className={classes.muteButton}>
            <ActionIconButton
                onClick={unmuteUser}
                actionText={isUserMuted ? t("unmute") : t("mute")}
                icon={isUserMuted ? MuteIcon : UnmuteIcon}
            />
        </div>
    );
});

export default MuteAccountButton;
