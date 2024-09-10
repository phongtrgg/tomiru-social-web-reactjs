import produce, { Draft } from "immer";

import { LoadingStatus } from "../../../types/common";
import { VaultState } from "./contract/states";
import { VaultActions, VaultActionTypes } from "./contract/actionTypes";

export const initialVaultState: VaultState = {
    vaults: [],
    loadingStatus: LoadingStatus.LOADING
};

export const vaultReducer = produce((draft: Draft<VaultState>, action: VaultActions) => {
    switch (action.type) {
        case VaultActionTypes.SET_VAULT:
            draft.vaults = action.payload;
            draft.loadingStatus = LoadingStatus.LOADED;
            break;

        case VaultActionTypes.SET_VAULT_LOADING_STATUS:
            draft.loadingStatus = action.payload;
            break;
        default:
            break;
    }
}, initialVaultState);
