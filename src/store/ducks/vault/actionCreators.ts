import { LoadingStatus } from "../../../types/common";
import {
    FetchVaulActionInterface,
    SetVaultActionInterface,
    SetVaultLoadingStatusActionInterface,
    VaultActionTypes
} from "./contract/actionTypes";
import { VaultResponse } from "./contract/states";

export const fetchVault = (): FetchVaulActionInterface => ({ type: VaultActionTypes.FETCH_VAULT });
export const setVault = (payload: VaultResponse[]): SetVaultActionInterface => ({
    type: VaultActionTypes.SET_VAULT,
    payload
});
export const setVaultLoadingStatus = (payload: LoadingStatus): SetVaultLoadingStatusActionInterface => ({
    type: VaultActionTypes.SET_VAULT_LOADING_STATUS,
    payload
});
