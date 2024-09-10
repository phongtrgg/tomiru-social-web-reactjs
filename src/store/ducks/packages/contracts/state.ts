import { AnyAction } from "redux-saga";
import { LoadingStatus } from "../../../../types/common";

export interface PackagesState {
    packagesResult?: PackagesData;
    packagesLoadingState: LoadingStatus;
    buySuccessPackage: PackageResponse | undefined;
    buyStatus: LoadingStatus;
}

export interface PackagesData {
    packages: PackageResponse[];
    vat: number;
}
export interface PackagesResponse {
    data: PackagesData;
    message: string;
    meta: object;
}
export interface PackageResponse {
    id: number;
    name: string;
    description: string;
    price: number;
    discount: number;
    validInDay: number;
    nextPackageAllow: number;
    status: number;
    createdAt: number;
    updatedAt: number;
}
