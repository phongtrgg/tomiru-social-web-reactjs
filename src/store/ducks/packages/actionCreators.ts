import { LoadingStatus } from "../../../types/common";
import { buyPackagesRequest } from "../../../types/wallet";
import {
    buyPackagesActionInterface,
    buyPackagesSuccessActionInterface,
    fetchPackagesActionInterface,
    PackagesActionsType,
    setBuyStatusActionInterface,
    setPackagesActionInterface,
    setStatusActionInterface
} from "./contracts/actionType";
import { PackageResponse, PackagesResponse } from "./contracts/state";

export const fetchPackages = (): fetchPackagesActionInterface => ({
    type: PackagesActionsType.FETCH_PACKAGE
});
export const setPackages = (payload: PackagesResponse): setPackagesActionInterface => ({
    type: PackagesActionsType.SET_PACKAGES,
    payload
});
export const buyPackages = (payload: PackageResponse): buyPackagesActionInterface => ({
    type: PackagesActionsType.BUY_PACKAGES,
    payload
});
export const buyPackagesSuccess = (payload: PackageResponse): buyPackagesSuccessActionInterface => ({
    type: PackagesActionsType.BUY_PACKAGES_SUCCESS,
    payload
});

export const setPackagesStatus = (payload: LoadingStatus): setStatusActionInterface => ({
    type: PackagesActionsType.PACKAGES_STATUS,
    payload
});
export const setBuyPackageStatus = (payload: LoadingStatus): setBuyStatusActionInterface => ({
    type: PackagesActionsType.SET_BUY_STATUS,
    payload
});
