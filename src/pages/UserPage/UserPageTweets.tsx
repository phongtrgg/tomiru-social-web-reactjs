import React, { FC, memo, ReactElement } from "react";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { Button, Typography } from "@material-ui/core";

import TweetComponent from "../../components/TweetComponent/TweetComponent";
import { useUserPageStyles } from "./UserPageStyles";
import AddTweetModal from "../../components/AddTweetModal/AddTweetModal";
import Spinner from "../../components/Spinner/Spinner";
import {
    selectIsUserTweetsLoading,
    selectPagesCount,
    selectUserTweetsItems
} from "../../store/ducks/userTweets/selectors";
import { selectUserDataId } from "../../store/ducks/user/selectors";
import { selectUserProfileId, selectUserProfileUsername } from "../../store/ducks/userProfile/selectors";
import { useModalWindow } from "../../hook/useModalWindow";
import { useTranslation } from "react-i18next";

interface UserPageTweetsProps {
    activeTab: number;
    page: number;
    loadUserTweets: () => void;
}

const UserPageTweets: FC<UserPageTweetsProps> = memo(({ activeTab, page, loadUserTweets }): ReactElement => {
    const classes = useUserPageStyles();
    const myProfileId = useSelector(selectUserDataId);
    const userProfileId = useSelector(selectUserProfileId);
    const username = useSelector(selectUserProfileUsername);
    const tweets = useSelector(selectUserTweetsItems);
    const isTweetsLoading = useSelector(selectIsUserTweetsLoading);
    const pagesCount = useSelector(selectPagesCount);
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();
    const { t } = useTranslation();

    const renderTweets = () => {
        if (tweets?.length === 0 && activeTab === 0 && !isTweetsLoading) {
            return (
                <div className={classes.textWrapper}>
                    <Typography variant={"h5"}>
                        {userProfileId === myProfileId ? t("havent_tweet") : `@${username} ${t("user_havent_tweet")}`}
                    </Typography>
                    <Typography variant={"subtitle1"}>
                        {userProfileId === myProfileId ? t("tweet_message") : t("tweet_here")}
                    </Typography>
                    {userProfileId === myProfileId && (
                        <Button
                            className={classes.button}
                            onClick={onOpenModalWindow}
                            variant="contained"
                            color="primary"
                            size="medium"
                        >
                            {t("send_tweet")}
                        </Button>
                    )}
                </div>
            );
        } else if (tweets?.length === 0 && activeTab === 1 && !isTweetsLoading) {
            return (
                <div className={classes.textWrapper}>
                    <Typography variant={"h5"}>
                        {userProfileId === myProfileId ? t("no_replies_yet") : `@${username} ${t("no_replies")}`}
                    </Typography>
                    <Typography variant={"subtitle1"}>
                        {userProfileId === myProfileId
                            ? t("reply_tweets_show_up_here")
                            : t("their_replies_show_up_here")}
                    </Typography>
                </div>
            );
        } else if (tweets?.length === 0 && activeTab === 2 && !isTweetsLoading) {
            return (
                <div className={classes.textWrapper}>
                    <Typography variant={"h5"}>
                        {userProfileId === myProfileId
                            ? t("no_photos_or_videos_yet")
                            : `@${username} ${t("no_media_tweeted")}`}
                    </Typography>
                    <Typography variant={"subtitle1"}>
                        {userProfileId === myProfileId
                            ? t("tweets_with_media_show_up_here")
                            : t("their_media_show_up_here")}
                    </Typography>
                    {userProfileId === myProfileId && (
                        <Button
                            className={classes.button}
                            onClick={onOpenModalWindow}
                            variant="contained"
                            color="primary"
                            size="medium"
                        >
                            {t("tweet_photo_or_video")}
                        </Button>
                    )}
                </div>
            );
        } else if (tweets?.length === 0 && activeTab === 3 && !isTweetsLoading) {
            return (
                <div className={classes.textWrapper}>
                    <Typography variant={"h5"}>
                        {userProfileId === myProfileId ? t("no_likes_yet") : `@${username} ${t("no_tweets_liked")}`}
                    </Typography>
                    <Typography variant={"subtitle1"}>
                        {userProfileId === myProfileId ? t("tap_tweet_heart_show_love") : t("when_you_do_shows_here")}
                    </Typography>
                </div>
            );
        } else {
            return (
                <>
                    {tweets?.map((tweet) => (
                        <TweetComponent key={tweet.id} tweet={tweet} activeTab={activeTab} isProfile={true} />
                    ))}
                    {isTweetsLoading && <Spinner />}
                </>
            );
        }
    };

    return (
        <InfiniteScroll
            style={{ overflow: "unset" }}
            dataLength={tweets.length}
            next={loadUserTweets}
            hasMore={page < pagesCount}
            loader={null}
        >
            {renderTweets()}
            <AddTweetModal visible={visibleModalWindow} onClose={onCloseModalWindow} />
        </InfiniteScroll>
    );
});

export default UserPageTweets;
