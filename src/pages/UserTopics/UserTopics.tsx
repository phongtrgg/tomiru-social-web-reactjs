import React, { ReactElement, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import PageWrapper from "../../components/PageWrapper/PageWrapper";
import { fetchFollowedTopicsByUserId, resetTopicsState } from "../../store/ducks/topics/actionCreators";
import { selectFollowedTopicsItems, selectIsFollowedTopicsLoading } from "../../store/ducks/topics/selectors";
import Spinner from "../../components/Spinner/Spinner";
import TopicItem from "../Topics/TopicItem/TopicItem";
import { useGlobalStyles } from "../../util/globalClasses";
import EmptyPageDescription from "../../components/EmptyPageDescription/EmptyPageDescription";
import { fetchUserProfile } from "../../store/ducks/userProfile/actionCreators";
import { PROFILE } from "../../constants/path-constants";
import { selectUserProfile, selectUsersIsSuccessLoaded } from "../../store/ducks/userProfile/selectors";
import { useTranslation } from "react-i18next";

const UserTopics = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams<{ userId: string }>();
    const userProfile = useSelector(selectUserProfile);
    const isUserProfileLoaded = useSelector(selectUsersIsSuccessLoaded);
    const followedTopics = useSelector(selectFollowedTopicsItems);
    const isFollowedTopicsLoading = useSelector(selectIsFollowedTopicsLoading);
    const { t } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(fetchUserProfile(Number(params.userId)));

        return () => {
            dispatch(resetTopicsState());
        };
    }, [params]);

    useEffect(() => {
        if (isUserProfileLoaded && userProfile) {
            if ((userProfile.isPrivateProfile && !userProfile.isFollower) || userProfile.isMyProfileBlocked) {
                history.push(`${PROFILE}/${userProfile.id}`);
            } else {
                dispatch(fetchFollowedTopicsByUserId(Number(params.userId)));
            }
        }
    }, [isUserProfileLoaded]);

    return (
        <PageWrapper title={t("topics")}>
            <div className={globalClasses.contentWrapper}>
                {(isFollowedTopicsLoading && !followedTopics.length) ? (
                    <Spinner />
                ) : (
                    (!isFollowedTopicsLoading && !followedTopics.length) ? (
                        <EmptyPageDescription
                                title={t("user_isnt_following")}
                                subtitle={t("when_they_do")}
                        />
                    ) : (
                        followedTopics.map((topic) => <TopicItem key={topic.id} topic={topic} />)
                    )
                )}
            </div>
        </PageWrapper>
    );
};

export default UserTopics;
