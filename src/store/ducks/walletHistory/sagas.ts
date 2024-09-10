import { call, put, takeLatest } from "redux-saga/effects";
import { setWalletHistoryLoadingStatus, setWalletHistorySuccess } from "./actionsCreator";
import { LoadingStatus } from "../../../types/common";
import { AxiosResponse } from "axios";
import { walletAPI } from "../../../services/api/wallet-service/walletApi";
import {
    FetchWalletHistoryInterface,
    FetchWalletIncomeHistoryInterface,
    WalletHistoryActionTypes
} from "./contract/actionTypes";
import { WalletHistoryPage } from "../../../types/walletHistory";

export function* fetchWalletHistoryRequest({ payload }: FetchWalletHistoryInterface) {
    try {
        yield put(setWalletHistoryLoadingStatus(LoadingStatus.LOADING));
        const response: AxiosResponse<WalletHistoryPage> = yield call(
            walletAPI.walletHistory,
            payload.orderBy,
            payload.page,
            payload.tomxuType,
            payload.transactionType
        );

        yield put(setWalletHistorySuccess(response.data));
    } catch (error) {
        yield put(setWalletHistoryLoadingStatus(LoadingStatus.ERROR));
    }
}
export function* fetchWalletIncomeHistoryRequest({ payload }: FetchWalletIncomeHistoryInterface) {
    try {
        yield put(setWalletHistoryLoadingStatus(LoadingStatus.LOADING));
        const response: AxiosResponse<WalletHistoryPage> = yield call(
            walletAPI.incomeHistory,
            payload.orderBy,
            payload.page,
            payload.tomxuType,
            payload.transactionType
        );

        yield put(setWalletHistorySuccess(response.data));
    } catch (error) {
        yield put(setWalletHistoryLoadingStatus(LoadingStatus.ERROR));
    }
}
export function* walletHistorySaga() {
    yield takeLatest(WalletHistoryActionTypes.FETCH_WALLET_HISTORY, fetchWalletHistoryRequest);
    yield takeLatest(WalletHistoryActionTypes.FETCH_WALLET_INCOME_HISTORY, fetchWalletIncomeHistoryRequest);
}
