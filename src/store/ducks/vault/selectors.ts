import { RootState } from "../../store";

export const selectVaultsList = (st: RootState) => st.vaults.vaults;
export const selectVaultsLoadingStatus = (st: RootState) => st.vaults.loadingStatus;
