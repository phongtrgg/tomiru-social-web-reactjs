import { call, put, takeLatest } from "redux-saga/effects";
import { setVault, setVaultLoadingStatus } from "./actionCreators";
import { LoadingStatus } from "../../../types/common";
import { AxiosResponse } from "axios";
import { VaultResponse } from "./contract/states";
import { walletAPI } from "../../../services/api/wallet-service/walletApi";
import { VaultActionTypes } from "./contract/actionTypes";

export function* fetchVaulRequest() {
    try {
        yield put(setVaultLoadingStatus(LoadingStatus.LOADING));
        const response: AxiosResponse<any> = yield call(walletAPI.getVaultInfo);
        yield put(setVault(response.data.data));
    } catch (error) {
        yield put(setVaultLoadingStatus(LoadingStatus.ERROR));
    }
}
export function* vaultSaga() {
    yield takeLatest(VaultActionTypes.FETCH_VAULT, fetchVaulRequest);
}
