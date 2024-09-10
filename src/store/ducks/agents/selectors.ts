import { LoadingStatus } from "../../../types/common";
import { RootState } from "../../store";
import { AgentResponse } from "./contract/states";

export const selectAgentsList = (st: RootState): AgentResponse[] | undefined => st.agents.data?.data;
export const selectAgentsLoadingStatus = (st: RootState): LoadingStatus => st.agents.loadingStatus;
export const selectAgentsCurrentPage = (st: RootState): number | undefined => st.agents.data?.meta.currentPage;
export const selectAgentsTotalPages = (st: RootState): number | undefined => st.agents.data?.meta.totalPages;
