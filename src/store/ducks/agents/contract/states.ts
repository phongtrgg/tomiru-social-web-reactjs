import { LoadingStatus } from "../../../../types/common";

export interface AgentsState {
    data: AgentsResponse | undefined;
    loadingStatus: LoadingStatus;
}
export interface AgentsResponse {
    data: AgentResponse[];
    meta: {
        totalItems: number;
        itemCount: number;
        itemsPerPage: number;
        totalPages: number;
        currentPage: number;
    };
}
export interface AgentResponse {
    zaloLink: string;
    telegramLink: string;
    displayName: string;
    status: string;
    numTrading: number;
    volumeTrading: number;
    createdAt: string;
}
