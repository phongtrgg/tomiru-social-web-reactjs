import { TRANSACTION_HISTORY_TAB, TRANSACTION_HISTORY_TYPES } from "../states";

export enum TRANSACTION_HISTORY_DISPLAY_TYPES {
    SET_TYPE = "TRANSACTION_HISTORY_DISPLAY_TYPES/SET_TYPE",
    SET_TAB = "TRANSACTION_HISTORY_DISPLAY_TYPES/SET_TAB"
}
export interface SetTransactionDisplayTypeActionInterface {
    type: TRANSACTION_HISTORY_DISPLAY_TYPES.SET_TYPE;
    payload: TRANSACTION_HISTORY_TYPES;
}
export interface SetTransactionDisplayTabActionInterface {
    type: TRANSACTION_HISTORY_DISPLAY_TYPES.SET_TAB;
    payload: TRANSACTION_HISTORY_TAB;
}
export type TransactionHistoryDisplayTypes =
    | SetTransactionDisplayTabActionInterface
    | SetTransactionDisplayTypeActionInterface;
