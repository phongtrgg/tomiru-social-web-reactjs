import {
    SetTransactionDisplayTabActionInterface,
    SetTransactionDisplayTypeActionInterface,
    TRANSACTION_HISTORY_DISPLAY_TYPES
} from "./contract/actionTypes";
import { TRANSACTION_HISTORY_TAB, TRANSACTION_HISTORY_TYPES } from "./states";

export const setTabToDisplayTransaction = (
    payload: TRANSACTION_HISTORY_TAB
): SetTransactionDisplayTabActionInterface => ({
    type: TRANSACTION_HISTORY_DISPLAY_TYPES.SET_TAB,
    payload
});
export const setTypeToDisplayTransaction = (
    payload: TRANSACTION_HISTORY_TYPES
): SetTransactionDisplayTypeActionInterface => ({
    type: TRANSACTION_HISTORY_DISPLAY_TYPES.SET_TYPE,
    payload
});
