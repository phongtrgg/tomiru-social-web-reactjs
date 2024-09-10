import { call, put, takeLatest } from "redux-saga/effects";
import { LoadingStatus } from "../../../types/common";
import { setMessage, setTypeApi, setWalletUser, setWalletUserLoadingStatus } from "./actionsCreator";
import { AxiosResponse } from "axios";
import { walletAPI } from "../../../services/api/wallet-service/walletApi";
import { FetchSendTokenInterface, WalletActionTypes } from "./contract/actionTypes";
import { WalletUserRespone } from "../../../types/wallet";
import { TypeApi } from "./contract/state";

export function* fetchWalletUserRequest() {
    try {
        yield put(setWalletUserLoadingStatus(LoadingStatus.LOADING));
        const response: AxiosResponse<WalletUserRespone> = yield call(walletAPI.getUser);

        yield put(setWalletUser(response.data.data));
    } catch (error) {
        yield put(setWalletUserLoadingStatus(LoadingStatus.ERROR));
    }
}
export function* fetchSendTokenRequest({ payload }: FetchSendTokenInterface) {
    try {
        yield put(setWalletUserLoadingStatus(LoadingStatus.LOADING));
        const response: AxiosResponse<string> = yield call(walletAPI.sendToken, payload);
        //Xử lý tiếp vào đây
    } catch (error) {
        yield put(setWalletUserLoadingStatus(LoadingStatus.ERROR));
    }
}
export function* sendTokenOTPRequest() {
    try {
        yield put(setWalletUserLoadingStatus(LoadingStatus.LOADING));
        const response: AxiosResponse<string> = yield call(walletAPI.sendTokenOTP);

        yield put(setTypeApi(TypeApi.SEND_OTP));
        yield put(setWalletUserLoadingStatus(LoadingStatus.SUCCESS));
    } catch (error) {
        yield put(setWalletUserLoadingStatus(LoadingStatus.ERROR));
    }
}
export function* dailyCheckin() {
    try {
        yield put(setWalletUserLoadingStatus(LoadingStatus.LOADING));
        const response: AxiosResponse<string> = yield call(walletAPI.userCheckin);
        yield put(setTypeApi(TypeApi.CHECKIN));
        yield put(setWalletUserLoadingStatus(LoadingStatus.SUCCESS));
    } catch (error) {
        yield put(setMessage(error.response.data.error.message));
        yield put(setWalletUserLoadingStatus(LoadingStatus.ERROR));
    }
}
export function* walletUserSaga() {
    yield takeLatest(WalletActionTypes.FECTH_USER, fetchWalletUserRequest);
    yield takeLatest(WalletActionTypes.FETCH_SEND_TOKEN, fetchSendTokenRequest);
    yield takeLatest(WalletActionTypes.DAILY_CHECKIN, dailyCheckin);
    yield takeLatest(WalletActionTypes.FETCH_SEND_TOKEN_OTP, sendTokenOTPRequest);
}
