import React, { FC, memo, ReactElement } from "react";
import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";

import { LockIcon } from "../../../icons";
import PageHeaderWrapper from "../../../components/PageHeaderWrapper/PageHeaderWrapper";
import {
    selectUserProfileFullName,
    selectUserProfileId,
    selectUserProfileIsPrivateProfile,
    selectUserProfileLikeCount,
    selectUserProfileMediaTweetCount,
    selectUserProfileTweetCount
} from "../../../store/ducks/userProfile/selectors";
import { useUserPageStyles } from "../UserPageStyles";
import { useTranslation } from "react-i18next";

interface UserPageHeaderProps {
    activeTab: number;
}

const UserPageHeader: FC<UserPageHeaderProps> = memo(({ activeTab }): ReactElement => {
    const classes = useUserPageStyles();
    const userProfileId = useSelector(selectUserProfileId);
    const fullName = useSelector(selectUserProfileFullName);
    const mediaTweetCount = useSelector(selectUserProfileMediaTweetCount);
    const likeCount = useSelector(selectUserProfileLikeCount);
    const tweetCount = useSelector(selectUserProfileTweetCount);
    const isPrivateProfile = useSelector(selectUserProfileIsPrivateProfile);
    const { t } = useTranslation();
    const showTweetCount = (): string => {
        if (userProfileId) {
            if (activeTab === 2) {
                return `${mediaTweetCount} ${mediaTweetCount === 1 ? t("photo_and_video") : t("photo_and_video")} `;
            } else if (activeTab === 3) {
                return `${likeCount} ${likeCount === 1 ? t("like") : t("like")} `;
            } else {
                return `${tweetCount} ${tweetCount === 1 ? t("tweets") : t("tweets")} `;
            }
        }
        return "";
    };

    return (
        <PageHeaderWrapper backButton>
            <div>
                <Typography variant={"h5"} component={"span"}>
                    {fullName}
                </Typography>
                {isPrivateProfile && <span className={classes.lockIcon}>{LockIcon}</span>}
                <Typography variant={"subtitle2"} component={"div"}>
                    {showTweetCount()}
                </Typography>
            </div>
        </PageHeaderWrapper>
    );
});

export default UserPageHeader;
