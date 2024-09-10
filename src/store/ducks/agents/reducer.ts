import produce, { Draft } from "immer";
import { LoadingStatus } from "../../../types/common";
import { AgentsState } from "./contract/states";
import { AGENTS_ACTION_TYPES, AgentsActions } from "./contract/actionTypes";

export const initialAgents: AgentsState = {
    data: undefined,
    loadingStatus: LoadingStatus.LOADING
};
export const agentsReducer = produce((draft: Draft<AgentsState>, action: AgentsActions) => {
    switch (action.type) {
        case AGENTS_ACTION_TYPES.SET_AGENTS:
            draft.data = action.payload;
            draft.loadingStatus = LoadingStatus.LOADED;

            break;
        case AGENTS_ACTION_TYPES.SET_AGENTS_LOADING_STATUS:
            draft.loadingStatus = action.payload;
            break;

        default:
            break;
    }
}, initialAgents);
