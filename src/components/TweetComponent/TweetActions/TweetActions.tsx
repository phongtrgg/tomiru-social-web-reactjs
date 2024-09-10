import React, { FC, memo, ReactElement } from "react";
import TweetActionResult, { TweetActionResults } from "../../TweetActionResult/TweetActionResult";
import { useSelector } from "react-redux";

import {
    selectUserProfileFullName,
    selectUserProfileId,
    selectUserProfilePinnedTweetId
} from "../../../store/ducks/userProfile/selectors";
import { selectUserDataId, selectUserPinnedTweetId } from "../../../store/ducks/user/selectors";
import { useTranslation } from "react-i18next";

interface TweetActionsProps {
    retweetsUserIds?: number[];
    tweetId?: number;
    activeTab?: number;
}

const TweetActions: FC<TweetActionsProps> = memo(({ retweetsUserIds, tweetId, activeTab }): ReactElement => {
    const userProfileId = useSelector(selectUserProfileId);
    const userProfilePinnedTweetId = useSelector(selectUserProfilePinnedTweetId);
    const fullName = useSelector(selectUserProfileFullName);
    const myProfileId = useSelector(selectUserDataId);
    const myProfilePinnedTweetId = useSelector(selectUserPinnedTweetId);
    const isTweetRetweetedByUser = retweetsUserIds?.findIndex((id) => id === userProfileId) !== -1;
    const { t } = useTranslation();

    return (
        <>
            {activeTab === 0 && isTweetRetweetedByUser && userProfileId ? (
                <TweetActionResult
                    action={TweetActionResults.RETWEET}
                    text={((myProfileId === userProfileId) ? t("you") : (fullName)) + t("retweeted")}
                />
            ) : null}
            {((myProfilePinnedTweetId === tweetId || userProfilePinnedTweetId === tweetId) && activeTab === 0) && (
                <TweetActionResult action={TweetActionResults.PIN} text={t("pinned_tweet")} />
            )}
        </>
    );
});

export default TweetActions;
