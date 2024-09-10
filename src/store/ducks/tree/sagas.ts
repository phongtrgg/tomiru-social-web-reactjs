import { AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { walletAPI } from "../../../services/api/wallet-service/walletApi";
import { LoadingStatus } from "../../../types/common";
import { TreeResponse } from "./contracts/state";
import { fetchTreeByUsernameActionInterface, TreeActionsType } from "./contracts/actionType";
import { setTree, setTreeByUsername, settTreeStatus } from "./actionCreators";

export function* fetchTree() {
    try {
        const response: AxiosResponse<TreeResponse> = yield call(walletAPI.getTree);

        yield put(setTree(response.data));
    } catch (error) {
        yield put(settTreeStatus(LoadingStatus.ERROR));
    }
}

export function* fetchTreeByUsernameRequest({ payload }: fetchTreeByUsernameActionInterface) {
    try {
        const response: AxiosResponse<TreeResponse> = yield call(walletAPI.getTreeByUsername, payload);

        yield put(settTreeStatus(LoadingStatus.SUCCESS));

        yield put(setTreeByUsername(response.data));
    } catch (error) {
        yield put(settTreeStatus(LoadingStatus.ERROR));
    }
}

export function* treeSaga() {
    yield takeLatest(TreeActionsType.FETCH_TREE, fetchTree);
    yield takeLatest(TreeActionsType.FETCH_TREE_USERNAME, fetchTreeByUsernameRequest);
}
