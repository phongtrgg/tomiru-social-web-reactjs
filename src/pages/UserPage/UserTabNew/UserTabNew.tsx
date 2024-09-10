import React, { ChangeEvent, FC, memo, ReactElement, useEffect, useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Divider } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import UserPageTweets from "../UserPageTweets";
import { useUserPageStyles } from "../UserPageStyles";
import {
    fetchUserLikedTweets,
    fetchUserMediaTweets,
    fetchUserRetweetsAndReplies,
    fetchUserTweets,
    resetUserTweets
} from "../../../store/ducks/userTweets/actionCreators";
import { selectIsUserTweetsLoaded } from "../../../store/ducks/userTweets/selectors";
import { selectUsersIsSuccessLoaded } from "../../../store/ducks/userProfile/selectors";
import { UserTabNewStyle } from "./UserTabNewStyle";
import InviteCode from "./InviteCode/InviteCode";
import IntroduceProfile from "./IntroduceProfile/IntroduceProfile/IntroduceProfile";
import ContentIntroduce from "./IntroduceProfile/ContentIntroduce/ContentIntroduce";
import FriendList from "./FriendList/FriendList";

interface UserTweetsProps {
    activeTab: number;
    handleChangeTab: (newValue: number) => void;
}

const UserTabNew: FC<UserTweetsProps> = memo(({ activeTab, handleChangeTab }): ReactElement => {
    const classes = UserTabNewStyle();
    const dispatch = useDispatch();
    const params = useParams<{ userId: string }>();
    const isUserProfileSuccessLoaded = useSelector(selectUsersIsSuccessLoaded);
    const isTweetsLoaded = useSelector(selectIsUserTweetsLoaded);
    const [page, setPage] = useState<number>(0);
    const [showContentIntroduce, setShowContentIntroduce] = useState(false);

    useEffect(() => {
        if (isUserProfileSuccessLoaded) {
            setPage((prevState) => prevState + 1);
        }
    }, [isUserProfileSuccessLoaded]);

    const loadUserTweets = (): void => {
        if (activeTab === 1) {
            dispatch(fetchUserRetweetsAndReplies({ userId: params.userId, page }));
        } else if (activeTab === 2) {
            dispatch(fetchUserMediaTweets({ userId: params.userId, page }));
        } else if (activeTab === 3) {
            dispatch(fetchUserLikedTweets({ userId: params.userId, page }));
        } else {
            dispatch(fetchUserTweets({ userId: params.userId, page, activeTab }));
        }

        if (isTweetsLoaded) {
            setPage((prevState) => prevState + 1);
        }
    };

    const handleChange = (event: ChangeEvent<{}>, newValue: number): void => {
        handleChangeTab(newValue);
        setShowContentIntroduce(false);
    };

    const handleShowTweets = (callback: () => void): void => {
        window.scrollTo(0, 0);
        setPage(0);
        dispatch(resetUserTweets());
        callback();
    };

    const handleShowUserTweets = (): void => {
        dispatch(fetchUserTweets({ userId: params.userId, page: 0 }));
        setPage((prevState) => prevState + 1);
    };

    const handleShowUserRetweetsAndReplies = (): void => {
        dispatch(fetchUserRetweetsAndReplies({ userId: params.userId, page: 0 }));
        setPage((prevState) => prevState + 1);
    };

    const handleShowMediaTweets = (): void => {
        dispatch(fetchUserMediaTweets({ userId: params.userId, page: 0 }));
        setPage((prevState) => prevState + 1);
    };

    const handleShowLikedTweets = (): void => {
        dispatch(fetchUserLikedTweets({ userId: params.userId, page: 0 }));
        setPage((prevState) => prevState + 1);
    };

    const handleShareClick = () => {
        setShowContentIntroduce(true);
    };

    const handleEditClick = () => {
        setShowContentIntroduce(false);
    };

    const renderInviteCode = () => {
        return <InviteCode />;
    };

    const renderIntroduceProfile = () => {
        return showContentIntroduce ? (
            <ContentIntroduce onEditClick={handleEditClick} />
        ) : (
            <IntroduceProfile onShareClick={handleShareClick} />
        );
    };

    const renderFriendList = () => {
        return <FriendList />;
    };

    const renderContent = () => {
        switch (activeTab) {
            case 3:
                return renderInviteCode();
            case 2:
                return renderIntroduceProfile();
            case 1:
                return renderFriendList();
            default:
                return (
                    <div className={classes.tweets}>
                        <UserPageTweets activeTab={activeTab} page={page} loadUserTweets={loadUserTweets} />
                    </div>
                );
        }
    };

    return (
        <>
            <div className={classes.tabs}>
                <Tabs value={activeTab} indicatorColor="primary" textColor="primary" onChange={handleChange}>
                    <Tab onClick={() => handleShowTweets(handleShowUserTweets)} label="Bài viết" />
                    <Tab onClick={() => handleShowTweets(handleShowUserRetweetsAndReplies)} label="Bạn bè" />
                    <Tab onClick={() => handleShowTweets(handleShowMediaTweets)} label="Giới thiệu " />
                    <Tab onClick={() => handleShowTweets(handleShowLikedTweets)} label="Mã giới thiệu" />
                </Tabs>
            </div>
            <Divider />
            {renderContent()}
        </>
    );
});

export default UserTabNew;
