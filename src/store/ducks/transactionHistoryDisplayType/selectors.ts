import { RootState } from "../../store";
import { TRANSACTION_HISTORY_TAB, TRANSACTION_HISTORY_TYPES } from "./states";

export const selectTransactionDisplayType = (st: RootState): TRANSACTION_HISTORY_TYPES =>
    st.transactionDisplayType.type;
export const selectTransactionDisplayTab = (st: RootState): TRANSACTION_HISTORY_TAB => st.transactionDisplayType.tab;
