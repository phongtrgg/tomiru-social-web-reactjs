import { TagResponse } from "./../../../types/tag";
import { call, put, takeLatest } from "redux-saga/effects";
import { setUserTweetsLoadingStatus } from "../userTweets/actionCreators";
import { AxiosResponse } from "axios";
import { FriendUserResponse } from "../../../types/user";
import { LoadingStatus } from "../../../types/common";
import {
    CheckFollowRequestInterface,
    FetchListFriendInterface,
    FriendUserActionTypes,
    UnfollowFriendInterface,
    UnfriendRequestInterface
} from "./contracts/actionTypes";
import { UserApi } from "../../../services/api/user-service/userApi";
import { checkFollowResponse, setListFriend } from "./actionCreators";

// lấy ra danh sách bạn bè
export function* fetchListFriendRequest({ payload }: FetchListFriendInterface) {
    try {
        yield put(setUserTweetsLoadingStatus(LoadingStatus.LOADING));
        const response: AxiosResponse<FriendUserResponse[]> = yield call(UserApi.fetchListFriend, payload);
        yield put(setListFriend(response.data));
    } catch (e) {
        yield put(setUserTweetsLoadingStatus(LoadingStatus.ERROR));
    }
}

// hủy bạn bè
export function* unfriendRequest({ payload }: UnfriendRequestInterface) {
    try {
        yield put(setUserTweetsLoadingStatus(LoadingStatus.LOADING));
        const response: AxiosResponse<boolean> = yield call(UserApi.unfriendRequest, payload);
        // if(response) {
        //     old put(unFriendResponse(payload))
        // }else {
        //     yield put(setUserTweetsLoadingStatus(LoadingStatus.ERROR));
        // }
    } catch (e) {
        yield put(setUserTweetsLoadingStatus(LoadingStatus.ERROR));
    }
}

// check follow
export function* checkFollowRequest({ payload }: CheckFollowRequestInterface) {
    try {
        yield put(setUserTweetsLoadingStatus(LoadingStatus.LOADING));
        const response: AxiosResponse<boolean> = yield call(UserApi.checkFollowRequest, payload);

        yield put(checkFollowResponse(payload, response.data));
    } catch (e) {
        yield put(setUserTweetsLoadingStatus(LoadingStatus.ERROR));
    }
}
export function* friendsUserSaga() {
    // lấy ra danh sách bạn bè
    yield takeLatest(FriendUserActionTypes.FETCH_LIST_FRIEND, fetchListFriendRequest);
    // yield takeLatest(FriendUserActionTypes.UNFOLLOW_FRIEND_REQUEST, unfollowFriendRequest)
    yield takeLatest(FriendUserActionTypes.UNFRIEND_REQUEST, unfriendRequest);
    yield takeLatest(FriendUserActionTypes.CHECK_FOLLOW_REQUEST, checkFollowRequest);
}
