import { LoadingStatus } from "../../../../types/common";
import { WalletHistoryPage } from "../../../../types/walletHistory";

export enum WalletHistoryActionTypes {
    FETCH_WALLET_HISTORY = "walletHistory/FETCH_WALLET_HISTORY",
    FETCH_WALLET_INCOME_HISTORY = "walletHistory/FETCH_WALLET_INCOME_HISTORY",
    SET_WALLET_HISTORY = "walletHistory/SET_WALLET_HISTORY",
    SET_WALLET_HISTORY_STATUS = "walletHistory/SET_WALLET_HISTORY_STATUS"
}
export interface FetchWalletHistoryInterface {
    type: WalletHistoryActionTypes.FETCH_WALLET_HISTORY;
    payload: { orderBy: string; page: number; tomxuType: string; transactionType: string };
}
export interface FetchWalletIncomeHistoryInterface {
    type: WalletHistoryActionTypes.FETCH_WALLET_INCOME_HISTORY;
    payload: { orderBy: string; page: number; tomxuType: string; transactionType: string };
}
export interface SetWalletHistoryInterface {
    type: WalletHistoryActionTypes.SET_WALLET_HISTORY;
    payload: WalletHistoryPage;
}
export interface SetWalletHistoryLoadingStatusInterface {
    type: WalletHistoryActionTypes.SET_WALLET_HISTORY_STATUS;
    payload: LoadingStatus;
}
export type WalletHistoryActions =
    | FetchWalletHistoryInterface
    | SetWalletHistoryInterface
    | SetWalletHistoryLoadingStatusInterface;
