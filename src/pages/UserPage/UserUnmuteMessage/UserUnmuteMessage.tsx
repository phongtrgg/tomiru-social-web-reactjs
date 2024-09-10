import React, { memo, ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@material-ui/core";

import { processUserToMuteList } from "../../../store/ducks/user/actionCreators";
import { setOpenSnackBar } from "../../../store/ducks/actionSnackbar/actionCreators";
import {
    selectUserProfileId,
    selectUserProfileIsUserMuted,
    selectUserProfileUsername
} from "../../../store/ducks/userProfile/selectors";
import { useUserPageStyles } from "../UserPageStyles";
import { useTranslation } from "react-i18next";

const UserUnmuteMessage = memo((): ReactElement => {
    const classes = useUserPageStyles();
    const dispatch = useDispatch();
    const userProfileId = useSelector(selectUserProfileId);
    const username = useSelector(selectUserProfileUsername);
    const isUserMuted = useSelector(selectUserProfileIsUserMuted);
    const { t } = useTranslation();
    const onMuteUser = (): void => {
        dispatch(processUserToMuteList({ userId: userProfileId! }));
        dispatch(setOpenSnackBar(`@${username} ${t("has_been")} ${isUserMuted ? t("unmute") : t("mute")}.`));
    };

    return (
        <>
            {userProfileId && (
                isUserMuted && (
                    <Typography variant={"subtitle1"} component={"div"} className={classes.description}>
                        {t("you_have_muted_tweet")}
                        <Typography
                            id={"unmuteUser"}
                            className={classes.unfollowLink}
                            onClick={onMuteUser}
                            variant={"subtitle1"}
                            component={"span"}
                        >
                            {t("unmute")}.
                        </Typography>
                    </Typography>
                )
            )}
        </>
    );
});

export default UserUnmuteMessage;
