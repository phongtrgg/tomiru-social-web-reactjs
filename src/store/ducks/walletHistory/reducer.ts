import produce, { Draft } from "immer";
import { LoadingStatus } from "../../../types/common";
import { WalletHistoryState } from "./contract/state";
import { WalletHistoryActions, WalletHistoryActionTypes } from "./contract/actionTypes";

export const initialWalletHistory: WalletHistoryState = {
    data: undefined,
    loadingStatus: LoadingStatus.LOADING
};
export const walletHistoryReducer = produce((draft: Draft<WalletHistoryState>, action: WalletHistoryActions) => {
    switch (action.type) {
        case WalletHistoryActionTypes.SET_WALLET_HISTORY:
            draft.data = action.payload;
            draft.loadingStatus = LoadingStatus.LOADED;
            break;
        case WalletHistoryActionTypes.SET_WALLET_HISTORY_STATUS:
            draft.loadingStatus = action.payload;
            break;
        default:
            break;
    }
}, initialWalletHistory);
