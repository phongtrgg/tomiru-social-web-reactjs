import { call, put, takeLatest } from "redux-saga/effects";
import {
    setAccepFriendRequest,
    setDeleteFriendRequest,
    setFriendRequestAcceptLoadingStatus,
    setFriendRequests,
    setFriendRequestsLoadingStatus,
    setRelationshipSuccess
} from "./actionCreators";
import { LoadingStatus } from "../../../types/common";
import { AxiosResponse } from "axios";
import { FetchAcceptFriendRequest, FriendRequestResponse } from "./contract/state";
import { NotificationApi } from "../../../services/api/notification-service/notificationApi";
import {
    FetchAcceptFriendInterface,
    FetchDeleteFriendRequestInterface,
    FetchRelationshipRequestInterface,
    FriendRequestActionTypes
} from "./contract/actionTypes";
import { FriendApi } from "../../../services/api/user-service/friendApi";

export function* fetchFriendRequestsRequest() {
    try {
        yield put(setFriendRequestsLoadingStatus(LoadingStatus.LOADING));
        const response: AxiosResponse<FriendRequestResponse[]> = yield call(NotificationApi.getFriendRequests);
        yield put(setFriendRequests(response.data));
    } catch (e) {
        yield put(setFriendRequestsLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* fetchAcceptFriendRequestRequest({ payload }: FetchAcceptFriendInterface) {
    try {
        yield put(setFriendRequestsLoadingStatus(LoadingStatus.LOADING));

        yield put(setFriendRequestAcceptLoadingStatus({ status: LoadingStatus.LOADING, requestId: payload.requestId }));
        yield call(FriendApi.acceptFriend, payload.userId);
        yield put(setAccepFriendRequest(payload.requestId));
    } catch (e) {
        yield put(setFriendRequestsLoadingStatus(LoadingStatus.ERROR));
        yield put(setFriendRequestAcceptLoadingStatus({ status: LoadingStatus.ERROR, requestId: payload.requestId }));
    }
}
export function* fetchDeleteriendRequestRequest({ payload }: FetchDeleteFriendRequestInterface) {
    try {
        yield put(setFriendRequestsLoadingStatus(LoadingStatus.LOADING));

        yield put(setFriendRequestAcceptLoadingStatus({ status: LoadingStatus.LOADING, requestId: payload.requestId }));
        yield call(FriendApi.sendOrCancelOrRejectFriendRequestOrDeleteFriend, payload.userId);
        yield put(setDeleteFriendRequest(payload.requestId));
    } catch (e) {
        yield put(setFriendRequestsLoadingStatus(LoadingStatus.ERROR));
        yield put(setFriendRequestAcceptLoadingStatus({ status: LoadingStatus.ERROR, requestId: payload.requestId }));
    }
}
export function* fetchRelationshipRequest({ payload }: FetchRelationshipRequestInterface) {
    try {
        yield put(setFriendRequestsLoadingStatus(LoadingStatus.LOADING));

        yield put(setFriendRequestAcceptLoadingStatus({ status: LoadingStatus.LOADING, requestId: payload.userId }));
        const response: AxiosResponse<any> = yield call(FriendApi.relationshipFriend, payload.userId);
        console.log("call API Relationship", response);
        yield put(setRelationshipSuccess(response.data));
    } catch (e) {
        yield put(setFriendRequestsLoadingStatus(LoadingStatus.ERROR));
    }
}
export function* friendsRequestsSaga() {
    yield takeLatest(FriendRequestActionTypes.FETCH_FRIEND_REQUESTS, fetchFriendRequestsRequest);
    yield takeLatest(FriendRequestActionTypes.FETCH_ACCEPT_FRIEND, fetchAcceptFriendRequestRequest);
    yield takeLatest(FriendRequestActionTypes.FETCH_DELETE_FRIEND_REQUEST, fetchDeleteriendRequestRequest);
    yield takeLatest(FriendRequestActionTypes.RELATIONSHIP_USER, fetchRelationshipRequest);
}
