import { Action } from "redux";
import { LoadingStatus } from "../../../../types/common";
import { PackageResponse, PackagesResponse } from "./state";

export enum PackagesActionsType {
    FETCH_PACKAGE = "pakage/FETCH_PACKAGE",
    SET_PACKAGES = "pakage/SET_PACKAGES",
    BUY_PACKAGES = "pakage/BUY_PACKAGES",
    BUY_PACKAGES_SUCCESS = "pakage/BUY_PACKAGES_SUCCESS",
    PACKAGES_STATUS = "pakage/PACKAGES_STATUS",
    SET_BUY_STATUS = "pakage/SET_BUY_STATUS"
}

export interface fetchPackagesActionInterface extends Action<PackagesActionsType> {
    type: PackagesActionsType.FETCH_PACKAGE;
}

export interface setPackagesActionInterface extends Action<PackagesActionsType> {
    type: PackagesActionsType.SET_PACKAGES;
    payload: PackagesResponse;
}
export interface buyPackagesActionInterface extends Action<PackagesActionsType> {
    type: PackagesActionsType.BUY_PACKAGES;
    payload: PackageResponse;
}
export interface buyPackagesSuccessActionInterface extends Action<PackagesActionsType> {
    type: PackagesActionsType.BUY_PACKAGES_SUCCESS;
    payload: PackageResponse;
}
export interface setStatusActionInterface extends Action<PackagesActionsType> {
    type: PackagesActionsType.PACKAGES_STATUS;
    payload: LoadingStatus;
}
export interface setBuyStatusActionInterface extends Action<PackagesActionsType> {
    type: PackagesActionsType.SET_BUY_STATUS;
    payload: LoadingStatus;
}

export type PackagesActions =
    | buyPackagesSuccessActionInterface
    | setBuyStatusActionInterface
    | fetchPackagesActionInterface
    | setStatusActionInterface
    | buyPackagesActionInterface
    | setPackagesActionInterface;
