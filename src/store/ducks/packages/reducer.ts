import produce, { Draft } from "immer";

import { LoadingStatus } from "../../../types/common";
import { PackagesState } from "./contracts/state";
import { PackagesActions, PackagesActionsType } from "./contracts/actionType";

export const initialSearchState: PackagesState = {
    packagesResult: undefined,
    packagesLoadingState: LoadingStatus.LOADING,
    buyStatus: LoadingStatus.NEVER,
    buySuccessPackage: undefined
};

export const packagesReducer = produce((draft: Draft<PackagesState>, action: PackagesActions) => {
    switch (action.type) {
        case PackagesActionsType.SET_PACKAGES:
            draft.packagesResult = action.payload.data;
            draft.packagesLoadingState = LoadingStatus.SUCCESS;
            break;
        case PackagesActionsType.PACKAGES_STATUS:
            draft.packagesLoadingState = action.payload;
            break;
        case PackagesActionsType.BUY_PACKAGES_SUCCESS:
            draft.buyStatus = LoadingStatus.SUCCESS;
            draft.buySuccessPackage = action.payload;
            break;
        case PackagesActionsType.SET_BUY_STATUS:
            draft.buyStatus = action.payload;
            break;
        default:
            break;
    }
}, initialSearchState);
