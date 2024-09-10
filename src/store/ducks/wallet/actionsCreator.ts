import { LoadingStatus } from "../../../types/common";
import { sendTokenRequest, WalletUserData } from "../../../types/wallet";
import {
    DailyCheckinInterface,
    FetchSendTokenInterface,
    FetchWalletUserInterface,
    MessageResinInterface,
    sendTokenOTPInterface,
    SendTokenSuccessInterface,
    SetTypeApiInterface,
    SetWalletUserInterface,
    SetWalletUserLoadingStatusInterface,
    WalletActionTypes
} from "./contract/actionTypes";
import { TypeApi } from "./contract/state";

export const fetchWalletUser = (): FetchWalletUserInterface => ({ type: WalletActionTypes.FECTH_USER });
export const setWalletUser = (payload: WalletUserData): SetWalletUserInterface => ({
    type: WalletActionTypes.SET_USER,
    payload
});
export const setWalletUserLoadingStatus = (payload: LoadingStatus): SetWalletUserLoadingStatusInterface => ({
    type: WalletActionTypes.SET_LOADING_STATUS,
    payload
});
export const fetchSendToken = (payload: sendTokenRequest): FetchSendTokenInterface => ({
    type: WalletActionTypes.FETCH_SEND_TOKEN,
    payload
});
export const sendTokenOTP = (): sendTokenOTPInterface => ({
    type: WalletActionTypes.FETCH_SEND_TOKEN_OTP
});
export const sendTokenSuccess = (payload: string): SendTokenSuccessInterface => ({
    type: WalletActionTypes.SEND_TOKEN_SUCCESS,
    payload
});
export const dailyCheckin = (): DailyCheckinInterface => ({
    type: WalletActionTypes.DAILY_CHECKIN
});
export const setMessage = (payload: string): MessageResinInterface => ({
    type: WalletActionTypes.SET_MESSAGE_RES,
    payload
});
export const setTypeApi = (payload: TypeApi): SetTypeApiInterface => ({
    type: WalletActionTypes.SET_TYPE_API,
    payload
});
