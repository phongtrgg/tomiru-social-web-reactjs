export enum TRANSACTION_HISTORY_TYPES {
    ALL = "TRANSACTION_HISTORY_TYPES/ALL",
    INCOME = "TRANSACTION_HISTORY_TYPES/INCOME"
}
export enum TRANSACTION_HISTORY_TAB {
    TRANSACTION_TAB = 0,
    P2P_TAB = 1
}
export interface TransactionDisplayState {
    type: TRANSACTION_HISTORY_TYPES;
    tab: TRANSACTION_HISTORY_TAB;
}
