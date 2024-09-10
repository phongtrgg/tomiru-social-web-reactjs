import { LoadingStatus } from "../../../../types/common";
import { WalletHistoryPage } from "../../../../types/walletHistory";

export interface WalletHistoryState {
    data: WalletHistoryPage | undefined;
    loadingStatus: LoadingStatus;
}
