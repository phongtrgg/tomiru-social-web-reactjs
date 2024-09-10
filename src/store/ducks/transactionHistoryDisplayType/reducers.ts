import produce, { Draft } from "immer";
import { TRANSACTION_HISTORY_TAB, TRANSACTION_HISTORY_TYPES, TransactionDisplayState } from "./states";
import { TRANSACTION_HISTORY_DISPLAY_TYPES, TransactionHistoryDisplayTypes } from "./contract/actionTypes";

export const initialWalletHistory: TransactionDisplayState = {
    type: TRANSACTION_HISTORY_TYPES.ALL,
    tab: TRANSACTION_HISTORY_TAB.TRANSACTION_TAB
};
export const transactionDisplayReducer = produce(
    (draft: Draft<TransactionDisplayState>, action: TransactionHistoryDisplayTypes) => {
        switch (action.type) {
            case TRANSACTION_HISTORY_DISPLAY_TYPES.SET_TYPE:
                draft.type = action.payload;
                break;
            case TRANSACTION_HISTORY_DISPLAY_TYPES.SET_TAB:
                draft.tab = action.payload;
                break;
            default:
                break;
        }
    },
    initialWalletHistory
);
