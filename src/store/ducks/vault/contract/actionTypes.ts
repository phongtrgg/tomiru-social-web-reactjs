import { LoadingStatus } from "../../../../types/common";
import { VaultResponse } from "./states";

export enum VaultActionTypes {
    FETCH_VAULT = "VaultActionType/FETCH_VAULT",
    SET_VAULT = "VaultActionType/SET_VAULT",
    SET_VAULT_LOADING_STATUS = "VaultActionType/SET_VAULT_LOADING_STATUS"
}
export interface FetchVaulActionInterface {
    type: VaultActionTypes.FETCH_VAULT;
}
export interface SetVaultActionInterface {
    payload: VaultResponse[];
    type: VaultActionTypes.SET_VAULT;
}
export interface SetVaultLoadingStatusActionInterface {
    type: VaultActionTypes.SET_VAULT_LOADING_STATUS;
    payload: LoadingStatus;
}
export type VaultActions = SetVaultActionInterface | SetVaultLoadingStatusActionInterface | FetchVaulActionInterface;
