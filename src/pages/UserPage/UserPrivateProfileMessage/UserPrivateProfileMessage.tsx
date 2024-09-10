import React, { memo, ReactElement } from "react";
import { useSelector } from "react-redux";
import { Link as MuiLink, Typography } from "@material-ui/core";

import { PUBLIC_AND_PROTECTED_TWEETS } from "../../../constants/url-constants";
import { selectUserProfileUsername } from "../../../store/ducks/userProfile/selectors";
import { useUserPageStyles } from "../UserPageStyles";
import { useTranslation } from "react-i18next";

const UserPrivateProfileMessage = memo((): ReactElement => {
    const classes = useUserPageStyles();
    const username = useSelector(selectUserProfileUsername);
    const { t } = useTranslation();
    return (
        <div className={classes.privateProfileInfo}>
            <Typography variant={"h4"} component={"div"}>
                {t("tweet_protected")}
            </Typography>
            <Typography variant={"subtitle1"} component={"div"}>
                {`${t("followers_user_private_profile")}: @${username}.`}
                <MuiLink href={PUBLIC_AND_PROTECTED_TWEETS} variant="subtitle1" target="_blank" rel="noopener">
                    {t("learn_more")}
                </MuiLink>
            </Typography>
        </div>
    );
});

export default UserPrivateProfileMessage;
