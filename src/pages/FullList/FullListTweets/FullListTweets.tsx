import React, { memo, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import EmptyPageDescription from "../../../components/EmptyPageDescription/EmptyPageDescription";
import TweetComponent from "../../../components/TweetComponent/TweetComponent";
import Spinner from "../../../components/Spinner/Spinner";
import InfiniteScrollWrapper from "../../../components/InfiniteScrollWrapper/InfiniteScrollWrapper";
import { resetTweets } from "../../../store/ducks/tweets/actionCreators";
import {
    selectIsTweetsLoaded,
    selectIsTweetsLoading,
    selectListTweets,
    selectListTweetsPagesCount
} from "../../../store/ducks/list/selectors";
import { fetchTweetsByListId } from "../../../store/ducks/list/actionCreators";

const FullListTweets = memo((): ReactElement => {
    const dispatch = useDispatch();
    const params = useParams<{ listId: string }>();
    const tweets = useSelector(selectListTweets);
    const isTweetsLoading = useSelector(selectIsTweetsLoading);
    const isTweetsLoaded = useSelector(selectIsTweetsLoaded);
    const pagesCount = useSelector(selectListTweetsPagesCount);

    useEffect(() => {
        loadTweets(0);

        return () => {
            dispatch(resetTweets());
        };
    }, []);

    const loadTweets = (page: number): void => {
        dispatch(fetchTweetsByListId({ listId: parseInt(params.listId), pageNumber: page }));
    };

    return (
        <InfiniteScrollWrapper dataLength={tweets.length} pagesCount={pagesCount} loadItems={loadTweets}>
            {tweets.length === 0 && isTweetsLoaded ? (
                <EmptyPageDescription
                    title={"There aren’t any Tweets in this List"}
                    subtitle={"When anyone in this List Tweets, they’ll show up here."}
                />
            ) : (
                <>
                    {tweets.map((tweet) => (
                        <TweetComponent key={tweet.id} tweet={tweet} />
                    ))}
                    {isTweetsLoading && <Spinner paddingTop={150} />}
                </>
            )}
        </InfiniteScrollWrapper>
    );
});

export default FullListTweets;
