import React, { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Divider, Link as MuiLink, Typography } from "@material-ui/core";
import classnames from "classnames";

import { ACCESSING_YOUR_TWITTER_DATA } from "../../../constants/url-constants";
import { FOLLOW_AND_UNFOLLOW_TOPICS } from "../../../constants/path-constants";
import { useGlobalStyles } from "../../../util/globalClasses";
import { useTopicsStyles } from "../TopicsStyles";
import TopicsCarousel from "../TopicsCarousel/TopicsCarousel";
import {
    selectFollowedTopicsItems,
    selectIsFollowedTopicsLoading,
    selectIsTopicsLoading,
    selectTopicsItems
} from "../../../store/ducks/topics/selectors";
import { fetchFollowedTopics, fetchTopicsByIds, resetTopicsState } from "../../../store/ducks/topics/actionCreators";
import TopicBlock from "../TopicBlock/TopicBlock";
import Spinner from "../../../components/Spinner/Spinner";
import TopicItem from "../TopicItem/TopicItem";
import { useTranslation } from "react-i18next";

export const topicsIds = [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012, 1013, 1014, 1015, 1016, 1017, 1018, 1019, 1020];

const Followed = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const topicClasses = useTopicsStyles();
    const dispatch = useDispatch();
    const topics = useSelector(selectTopicsItems);
    const followedTopics = useSelector(selectFollowedTopicsItems);
    const isTopicsLoading = useSelector(selectIsTopicsLoading);
    const isFollowedTopicsLoading = useSelector(selectIsFollowedTopicsLoading);
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(fetchTopicsByIds({ topicsIds }));
        dispatch(fetchFollowedTopics());

        return () => {
            dispatch(resetTopicsState());
        };
    }, []);

    return (
        <>
            <Typography variant={"subtitle1"} component={"div"} className={globalClasses.itemInfoWrapper}>
                {t("the_topics_you")}
            </Typography>
            <Divider />
            {isFollowedTopicsLoading ? (
                <Spinner />
            ) : (
                followedTopics.map((topic) => <TopicItem key={topic.id} topic={topic} />)
            )}
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"h5"} component={"div"}>
                    {t("suggested_topics")}
                </Typography>
                <Typography variant={"subtitle2"} component={"div"}>
                    {t("Youll_see_top")}
                </Typography>
            </div>
            <div className={topicClasses.topicsItems}>
                {isTopicsLoading ? (
                    <Spinner />
                ) : (
                    <TopicsCarousel>
                        <div className={classnames(globalClasses.itemInfoWrapper, topicClasses.topicsInfo)}>
                            <TopicBlock topics={topics} startTopicValue={0} endTopicValue={5} isFollowedTopic />
                            <TopicBlock topics={topics} startTopicValue={5} endTopicValue={10} isFollowedTopic />
                            <TopicBlock topics={topics} startTopicValue={10} endTopicValue={15} isFollowedTopic />
                        </div>
                        <div className={classnames(globalClasses.itemInfoWrapper, topicClasses.topicsInfo)}>
                            <TopicBlock topics={topics} startTopicValue={10} endTopicValue={15} isFollowedTopic />
                            <TopicBlock topics={topics} startTopicValue={15} endTopicValue={20} isFollowedTopic />
                        </div>
                    </TopicsCarousel>
                )}
            </div>
            <Typography variant={"body1"} component={"div"} className={topicClasses.moreTopics}>
                {t("more_topics")}
            </Typography>
            <Divider />
            <Typography variant={"subtitle1"} component={"div"} className={globalClasses.itemInfoWrapper}>
                {t("topics_that_you")}{" "}
                <MuiLink href={ACCESSING_YOUR_TWITTER_DATA} variant="subtitle1" target="_blank" rel="noopener">
                    {t("topics_that_you")}
                </MuiLink>{t("you_can_also")}
                <MuiLink href={FOLLOW_AND_UNFOLLOW_TOPICS} variant="subtitle1" target="_blank" rel="noopener">
                    {t("learn_more")}
                </MuiLink> {t("about_following_topics")}
            </Typography>
        </>
    );
};

export default Followed;
