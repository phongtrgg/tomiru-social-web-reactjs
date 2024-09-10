import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Divider, Paper } from "@material-ui/core";

import { useFullListStyles } from "./FullListStyles";
import {
    selectIsListLoaded,
    selectIsListLoading,
    selectListItem,
    selectListItemId,
    selectListItemIsFollower,
    selectListItemName,
    selectListItemOwnerId,
    selectListItemOwnerUsername
} from "../../store/ducks/list/selectors";
import { fetchListById, resetListState } from "../../store/ducks/list/actionCreators";
import { selectUserDataId } from "../../store/ducks/user/selectors";
import Spinner from "../../components/Spinner/Spinner";
import { useGlobalStyles } from "../../util/globalClasses";
import FollowListButton from "../../components/FollowListButton/FollowListButton";
import FullListTweets from "./FullListTweets/FullListTweets";
import MembersAndFollowers from "./MembersAndFollowers/MembersAndFollowers";
import EditListButton from "./EditListButton/EditListButton";
import FullListHeader from "./FullListHeader/FullListHeader";
import FullListWallpaper from "./FullListWallpaper/FullListWallpaper";
import FullListDescription from "./FullListDescription/FullListDescription";
import AddTweetForm from "../../components/AddTweetForm/AddTweetForm";
import { t } from "i18next";

const FullList: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useFullListStyles();
    const dispatch = useDispatch();
    const myProfileId = useSelector(selectUserDataId);
    const list = useSelector(selectListItem);
    const listId = useSelector(selectListItemId);
    const listName = useSelector(selectListItemName);
    const listIsFollower = useSelector(selectListItemIsFollower);
    const listOwnerId = useSelector(selectListItemOwnerId);
    const listOwnerUsername = useSelector(selectListItemOwnerUsername);
    const isListLoading = useSelector(selectIsListLoading);
    const isListLoaded = useSelector(selectIsListLoaded);
    const params = useParams<{ listId: string }>();

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(fetchListById(parseInt(params.listId)));

        return () => {
            dispatch(resetListState());
        };
    }, [params.listId]);

    useEffect(() => {
        if (isListLoaded) {
            document.title = `@${listOwnerUsername}/${listName} / Twitter`;
        }
    }, [isListLoaded]);

    return (
        <Paper className={globalClasses.pageContainer} variant="outlined">
            <FullListHeader />

            <div className={globalClasses.contentWrapper}>
                {isListLoading ? (
                    <Spinner paddingTop={250} />
                ) : (
                    <>
                        <FullListWallpaper />
                        <Paper className={classes.listInfo} variant="outlined">
                            <FullListDescription />
                            <MembersAndFollowers />
                            <div className={classes.buttonWrapper}>
                                {myProfileId === listOwnerId ? (
                                    <EditListButton />
                                ) : (
                                    <FollowListButton listId={listId!} isFollower={listIsFollower!} />
                                )}
                            </div>
                        </Paper>
                    </>
                )}
                <div className={classes.tweetForm}>
                    <AddTweetForm title={t("write-something")} buttonName={"reply"} />
                </div>
                <Divider
                    style={{
                        marginBottom: 20
                    }}
                />
                <FullListTweets />
            </div>
        </Paper>
    );
};

export default FullList;
