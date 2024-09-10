import { AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { buyPackagesActionInterface, PackagesActionsType } from "./contracts/actionType";
import { walletAPI } from "../../../services/api/wallet-service/walletApi";
import { LoadingStatus } from "../../../types/common";
import { buyPackagesSuccess, setBuyPackageStatus, setPackages, setPackagesStatus } from "./actionCreators";
import { PackagesResponse } from "./contracts/state";
import { setOpenErrorSnackBar } from "../actionSnackbar/actionCreators";

export function* fetchPackagesRequest() {
    try {
        const response: AxiosResponse<PackagesResponse> = yield call(walletAPI.getPackages);
        yield put(setPackages(response.data));
    } catch (error) {
        yield put(setPackagesStatus(LoadingStatus.ERROR));
    }
}
export function* buyPackagesRequest({ payload }: buyPackagesActionInterface) {
    try {
        yield put(setBuyPackageStatus(LoadingStatus.LOADING));
        const response: AxiosResponse<boolean> = yield call(walletAPI.buyPackages, {
            packageName: payload.name
        });

        // yield put(setPackagesStatus(LoadingStatus.SUCCESS));
        yield put(buyPackagesSuccess(payload));
    } catch (error) {
        // yield put(setPackagesStatus(LoadingStatus.ERROR));
        yield put(setBuyPackageStatus(LoadingStatus.NEVER));
        yield put(setOpenErrorSnackBar(error.response.data.error.message));
    }
}

export function* packagesSaga() {
    yield takeLatest(PackagesActionsType.FETCH_PACKAGE, fetchPackagesRequest);
    yield takeLatest(PackagesActionsType.BUY_PACKAGES, buyPackagesRequest);
}
