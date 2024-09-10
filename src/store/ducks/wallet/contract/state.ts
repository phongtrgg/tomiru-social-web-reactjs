import { LoadingStatus } from "../../../../types/common";
import { WalletUserData } from "../../../../types/wallet";

export interface WalletUserState {
    user: WalletUserData | undefined;
    loadingStatus: LoadingStatus;
    message: string;
    typeApi: TypeApi;
}

export enum TypeApi {
    DEFAULT = 0,
    SEND_OTP = 1,
    CHECKIN = 2
}
