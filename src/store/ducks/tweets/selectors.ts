import { RootState } from "../../store";
import { TweetsState } from "./contracts/state";
import { LoadingStatus } from "../../../types/common";
import { createSelector } from "reselect";

export const selectTweetsState = (state: RootState): TweetsState => state.tweets;
export const selectLoadingState = (state: RootState): LoadingStatus => selectTweetsState(state).loadingState;
export const selectIsTweetsLoading = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADING;
export const selectIsTweetsLoaded = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADED;

export const selectTweetsItems = (state: RootState) => selectTweetsState(state).items;
export const selectTweetsItemsSize = (state: RootState) => selectTweetsState(state).items.length;
export const selectPagesCount = (state: RootState) => selectTweetsState(state).pagesCount;

export const selectErrorMessage = (state: RootState) => selectTweetsState(state).error;
// lấy ra bài viết cần sửa
export const getTweetsState = (state: RootState) => state.tweets;
export const getTweetById = (tweetId: number) =>
    createSelector(getTweetsState, (tweetsState) => tweetsState.items.find((tweet) => tweet.id === tweetId));
