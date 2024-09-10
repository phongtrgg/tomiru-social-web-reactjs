import { call, put, takeLatest } from "redux-saga/effects";
import { setAgents, setAgentsLoadingStatus } from "./actionCreators";
import { LoadingStatus } from "../../../types/common";
import { AxiosResponse } from "axios";
import { walletAPI } from "../../../services/api/wallet-service/walletApi";
import { AGENTS_ACTION_TYPES } from "./contract/actionTypes";
import { AgentsResponse, AgentsState } from "./contract/states";

export function* fetchAgentsRequest() {
    try {
        yield put(setAgentsLoadingStatus(LoadingStatus.LOADING));
        const response: AxiosResponse<AgentsResponse> = yield call(walletAPI.getAgencyList);

        yield put(setAgents(response.data));
    } catch (error) {
        yield put(setAgentsLoadingStatus(LoadingStatus.ERROR));
    }
}
export function* agentsSaga() {
    yield takeLatest(AGENTS_ACTION_TYPES.FETCH_AGENTS, fetchAgentsRequest);
}
