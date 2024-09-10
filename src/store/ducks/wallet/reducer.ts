import produce, { Draft } from "immer";
import { LoadingStatus } from "../../../types/common";
import { TypeApi, WalletUserState } from "./contract/state";
import { WalletActions, WalletActionTypes } from "./contract/actionTypes";

export const initialWalletUser: WalletUserState = {
    user: undefined,
    loadingStatus: LoadingStatus.LOADING,
    message: "",
    typeApi: TypeApi.DEFAULT
};
export const walletUserReducer = produce((draft: Draft<WalletUserState>, action: WalletActions) => {
    switch (action.type) {
        case WalletActionTypes.SET_USER:
            draft.user = action.payload;
            draft.loadingStatus = LoadingStatus.LOADED;
            break;
        case WalletActionTypes.SET_LOADING_STATUS:
            draft.loadingStatus = action.payload;
            break;
        case WalletActionTypes.SET_MESSAGE_RES:
            draft.message = action.payload;
            break;
        case WalletActionTypes.SET_TYPE_API:
            draft.typeApi = action.payload;
            break;
        default:
            break;
    }
}, initialWalletUser);
