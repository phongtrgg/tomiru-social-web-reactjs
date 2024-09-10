import { LoadingStatus } from "../../../../types/common";
import { sendTokenRequest, WalletUserData } from "../../../../types/wallet";
import { TypeApi } from "./state";

export enum WalletActionTypes {
    FECTH_USER = "wallet/FECTH_USER",
    SET_USER = "wallet/SET_USER",
    SET_LOADING_STATUS = "wallet/SET_LOADING_STATUS",
    FETCH_SEND_TOKEN = "wallet/FETCH_SEND_TOKEN",
    FETCH_SEND_TOKEN_OTP = "wallet/FETCH_SEND_TOKEN_OTP",
    SEND_TOKEN_SUCCESS = "wallet/SEND_TOKEN_SUCCESS",
    DAILY_CHECKIN = "wallet/DAILY_CHECKIN",
    SET_MESSAGE_RES = "wallet/SET_MESSAGE_RES",
    SET_TYPE_API = "wallet/SET_TYPE_API"
}
export interface FetchWalletUserInterface {
    type: WalletActionTypes.FECTH_USER;
}
export interface SetWalletUserInterface {
    type: WalletActionTypes.SET_USER;
    payload: WalletUserData;
}
export interface SetWalletUserLoadingStatusInterface {
    type: WalletActionTypes.SET_LOADING_STATUS;
    payload: LoadingStatus;
}
export interface FetchSendTokenInterface {
    type: WalletActionTypes.FETCH_SEND_TOKEN;
    payload: sendTokenRequest;
}
export interface sendTokenOTPInterface {
    type: WalletActionTypes.FETCH_SEND_TOKEN_OTP;
}
export interface SendTokenSuccessInterface {
    type: WalletActionTypes.SEND_TOKEN_SUCCESS;
    payload: string;
}
export interface DailyCheckinInterface {
    type: WalletActionTypes.DAILY_CHECKIN;
}
export interface MessageResinInterface {
    type: WalletActionTypes.SET_MESSAGE_RES;
    payload: string;
}
export interface SetTypeApiInterface {
    type: WalletActionTypes.SET_TYPE_API;
    payload: TypeApi;
}

export type WalletActions =
    | FetchWalletUserInterface
    | SetWalletUserInterface
    | SetWalletUserLoadingStatusInterface
    | SendTokenSuccessInterface
    | DailyCheckinInterface
    | MessageResinInterface
    | SetTypeApiInterface
    | FetchSendTokenInterface;
