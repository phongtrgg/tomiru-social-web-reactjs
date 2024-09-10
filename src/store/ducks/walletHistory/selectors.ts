import { LoadingStatus } from "../../../types/common";
import { WalletHistoryData, WalletHistoryPage } from "../../../types/walletHistory";
import { RootState } from "../../store";

export const selectWalletHistoryList = (state: RootState): WalletHistoryData[] | undefined =>
    state.walletHistory.data?.data;
export const selectWalletHistoryCurrentPage = (state: RootState): number | undefined =>
    state.walletHistory.data?.meta.currentPage;
export const selectWalletHistoryNumberOfItemsPerPage = (state: RootState): number | undefined =>
    state.walletHistory.data?.meta.itemsPerPage;
export const selectWalletHistoryTotalItems = (state: RootState): number | undefined =>
    state.walletHistory.data?.meta.totalItems;
export const selectWalletHistoryTotalPages = (state: RootState): number | undefined =>
    state.walletHistory.data?.meta.totalPages;
export const selectWalletHistoryLoadingStatus = (state: RootState): LoadingStatus => state.walletHistory.loadingStatus;
