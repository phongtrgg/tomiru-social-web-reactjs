import { call, put, takeLatest } from "redux-saga/effects";
import { setFriendsOfAuhUser, setFriendsOfAuhUserLoadingStatus } from "./actionsCreator";
import { FetchFriendsOfAuthUserInterface, FriendsOfAuthUserActionTypes } from "./contract/actionTypes";
import { AxiosResponse } from "axios";
import { FriendUserResponse } from "../../../types/user";
import { UserApi } from "../../../services/api/user-service/userApi";
import { LoadingStatus } from "../../../types/common";

export function* fetchFriendsOfAuthUserRequest({ payload }: FetchFriendsOfAuthUserInterface) {
    try {
        yield put(setFriendsOfAuhUserLoadingStatus(LoadingStatus.LOADING));
        const response: AxiosResponse<FriendUserResponse[]> = yield call(UserApi.fetchListFriend, payload);
        yield put(setFriendsOfAuhUser(response.data));
    } catch (e) {
        yield put(setFriendsOfAuhUserLoadingStatus(LoadingStatus.ERROR));
    }
}
export function* friendsOfAuthUserSaga() {
    yield takeLatest(FriendsOfAuthUserActionTypes.FETCH_FRIENDS, fetchFriendsOfAuthUserRequest);
}
