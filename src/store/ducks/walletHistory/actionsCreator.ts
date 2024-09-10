import { LoadingStatus } from "../../../types/common";
import { WalletHistoryPage } from "../../../types/walletHistory";
import {
    FetchWalletHistoryInterface,
    FetchWalletIncomeHistoryInterface,
    SetWalletHistoryInterface,
    SetWalletHistoryLoadingStatusInterface,
    WalletHistoryActionTypes
} from "./contract/actionTypes";

export const fetchWalletHistory = (
    orderBy: string,
    page: number,
    tomxuType: string,
    transactionType: string
): FetchWalletHistoryInterface => ({
    type: WalletHistoryActionTypes.FETCH_WALLET_HISTORY,
    payload: { orderBy, page, tomxuType, transactionType }
});
export const fetchWalletIncomeHistory = (
    orderBy: string,
    page: number,
    tomxuType: string,
    transactionType: string
): FetchWalletIncomeHistoryInterface => ({
    type: WalletHistoryActionTypes.FETCH_WALLET_INCOME_HISTORY,
    payload: { orderBy, page, tomxuType, transactionType }
});
export const setWalletHistorySuccess = (payload: WalletHistoryPage): SetWalletHistoryInterface => ({
    type: WalletHistoryActionTypes.SET_WALLET_HISTORY,
    payload
});
export const setWalletHistoryLoadingStatus = (payload: LoadingStatus): SetWalletHistoryLoadingStatusInterface => ({
    type: WalletHistoryActionTypes.SET_WALLET_HISTORY_STATUS,
    payload
});
