import { LoadingStatus } from "../../../../types/common";
import { AgentsResponse, AgentsState } from "./states";

export enum AGENTS_ACTION_TYPES {
    FETCH_AGENTS = "AGENTS_ACTION_TYPES/FETCH_AGENTS",
    SET_AGENTS = "AGENTS_ACTION_TYPES/SET_AGENTS",
    SET_AGENTS_LOADING_STATUS = "AGENTS_ACTION_TYPES/SET_AGENTS_LOADING_STATUS"
}
export interface FetchAgentsActionInterface {
    type: AGENTS_ACTION_TYPES.FETCH_AGENTS;
}
export interface SetAgentsActionInterface {
    type: AGENTS_ACTION_TYPES.SET_AGENTS;
    payload: AgentsResponse;
}
export interface SetAgentsLoadingStatusActionInterface {
    type: AGENTS_ACTION_TYPES.SET_AGENTS_LOADING_STATUS;
    payload: LoadingStatus;
}
export type AgentsActions =
    | SetAgentsActionInterface
    | FetchAgentsActionInterface
    | SetAgentsLoadingStatusActionInterface;
