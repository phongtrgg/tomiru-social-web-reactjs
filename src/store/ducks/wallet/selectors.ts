import { LoadingStatus } from "../../../types/common";
import { WalletUserData } from "../../../types/wallet";
import { RootState } from "../../store";
import { TypeApi } from "./contract/state";
export const selectWalletUser = (state: RootState): WalletUserData | undefined => state.walletUser.user;

export const selectTomxuBalance = (state: RootState): number => {
    const balance = state.walletUser.user?.usersBalances.find((b) => b.token.symbol === "XU")?.balance;
    return balance !== undefined ? Math.floor(parseFloat(balance)) : 0;
};
export const selectPTomxuBalance = (state: RootState): number => {
    const balance = state.walletUser.user?.usersBalances.find((b) => b.token.symbol === "pXU")?.balance;
    return balance !== undefined ? Math.floor(parseFloat(balance)) : 0;
};

export const selectWalletUserMessage = (state: RootState): string => state.walletUser.message;

export const selectWalletUserLoadingStatus = (state: RootState): LoadingStatus => state.walletUser.loadingStatus;
export const selectWalletUserTypeApi = (state: RootState): TypeApi => state.walletUser.typeApi;
