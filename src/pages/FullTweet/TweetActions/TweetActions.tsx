import React, { memo, ReactElement } from "react";
import { useSelector } from "react-redux";

import TweetActionResult, { TweetActionResults } from "../../../components/TweetActionResult/TweetActionResult";
import { selectIsTweetRetweeted, selectTweetId } from "../../../store/ducks/tweet/selectors";
import { selectUserPinnedTweetId } from "../../../store/ducks/user/selectors";
import { useTranslation } from "react-i18next";

const TweetActions = memo((): ReactElement => {
    const tweetId = useSelector(selectTweetId);
    const isTweetRetweeted = useSelector(selectIsTweetRetweeted);
    const pinnedTweetId = useSelector(selectUserPinnedTweetId);
    const { t } = useTranslation()


    return (
        <>
            {isTweetRetweeted && (
                <TweetActionResult action={TweetActionResults.RETWEET} text={t("you_retweeted")} />
            )}
            {(pinnedTweetId === tweetId) && (
                <TweetActionResult action={TweetActionResults.PIN} text={t("pinned_tweet")} />
            )}
        </>
    );
});

export default TweetActions;
