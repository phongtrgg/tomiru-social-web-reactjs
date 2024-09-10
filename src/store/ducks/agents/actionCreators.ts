import { LoadingStatus } from "../../../types/common";
import {
    AGENTS_ACTION_TYPES,
    FetchAgentsActionInterface,
    SetAgentsActionInterface,
    SetAgentsLoadingStatusActionInterface
} from "./contract/actionTypes";
import { AgentsResponse, AgentsState } from "./contract/states";

export const fetchAgents = (): FetchAgentsActionInterface => ({ type: AGENTS_ACTION_TYPES.FETCH_AGENTS });
export const setAgents = (payload: AgentsResponse): SetAgentsActionInterface => ({
    type: AGENTS_ACTION_TYPES.SET_AGENTS,
    payload
});
export const setAgentsLoadingStatus = (payload: LoadingStatus): SetAgentsLoadingStatusActionInterface => ({
    type: AGENTS_ACTION_TYPES.SET_AGENTS_LOADING_STATUS,
    payload
});
