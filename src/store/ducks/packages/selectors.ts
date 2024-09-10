import { PackageResponse, PackagesState } from "./contracts/state";
import { RootState } from "../../store";
import { LoadingStatus } from "../../../types/common";

const selectPackages = (state: RootState): PackagesState => state.packages;

export const selectPackagesResult = (state: RootState): PackageResponse[] | undefined =>
    state.packages.packagesResult?.packages;
export const selectPackagesStatus = (state: RootState): LoadingStatus => selectPackages(state).packagesLoadingState;
export const selectVAT = (state: RootState): number | undefined => state.packages.packagesResult?.vat;
export const selectBuyPackageStatus = (state: RootState): LoadingStatus => state.packages.buyStatus;
export const selectBuySuccessPackage = (state: RootState): PackageResponse | undefined =>
    state.packages.buySuccessPackage;
