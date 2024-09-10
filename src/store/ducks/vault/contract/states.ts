import { LoadingStatus } from "../../../../types/common";


export interface VaultResponse {
    name: string;
    icon: string;
    unit: string;
    end: number;
    percent: number;
    total: number;
    value: string;
}
export interface VaultState {
    vaults: VaultResponse[];
    loadingStatus: LoadingStatus;
}
