import { AxiosResponse } from "axios";
import tokenAxios from "../../../core/newaxios";
import {
    API_V1_0_AGENCY_LIST,
    API_V1_0_TERNARY_TREE_LIST_USERNAME,
    API_V1_0_TERNARY_TREE_MY_LIST,
    API_V1_0_USERS_BUY_PACKAGES,
    API_V1_0_USERS_CHECKIN,
    API_V1_0_USERS_INCOME_HISTORY,
    API_V1_0_USERS_PACKAGES,
    API_V1_0_USERS_SEND_TOKEN,
    API_V1_0_USERS_SEND_TOKEN_OTP,
    API_V1_0_USERS_WALLET_HISTORY,
    API_V1_0_VAULT_INFO,
    API_V1_ME
} from "../../../constants/endpoint-constants";
import { buyPackagesRequest, SendTokenOTPResponse, sendTokenRequest, WalletUserData } from "../../../types/wallet";
import { WalletHistoryPage } from "../../../types/walletHistory";
import { AgentsResponse } from "../../../store/ducks/agents/contract/states";
import { PackageResponse, PackagesResponse } from "../../../store/ducks/packages/contracts/state";
import { VaultResponse } from "../../../store/ducks/vault/contract/states";

export const walletAPI = {
    async getUser(): Promise<AxiosResponse<WalletUserData>> {
        return await tokenAxios.get<WalletUserData>(API_V1_ME);
    },
    async sendToken(payload: sendTokenRequest): Promise<AxiosResponse<string>> {
        return await tokenAxios.post<string>(API_V1_0_USERS_SEND_TOKEN, payload);
    },
    async sendTokenOTP(): Promise<AxiosResponse<SendTokenOTPResponse>> {
        return await tokenAxios.post<SendTokenOTPResponse>(API_V1_0_USERS_SEND_TOKEN_OTP);
    },
    async walletHistory(
        orderBy: string,
        page: number,
        tomxuType: string,
        transactionType: string
    ): Promise<AxiosResponse<WalletHistoryPage>> {
        return await tokenAxios.get<WalletHistoryPage>(
            `${API_V1_0_USERS_WALLET_HISTORY}?page=${page}&order=value:${orderBy}&filters[token]=${tomxuType}${transactionType}`
        );
    },
    async incomeHistory(
        orderBy: string,
        page: number,
        tomxuType: string,
        transactionType: string
    ): Promise<AxiosResponse<WalletHistoryPage>> {
        return await tokenAxios.get<WalletHistoryPage>(
            `${API_V1_0_USERS_INCOME_HISTORY}?page=${page}&order=value:${orderBy}&filters[token]=${tomxuType}${transactionType}`
        );
    },
    async userCheckin(): Promise<AxiosResponse<string>> {
        return await tokenAxios.post<string>(API_V1_0_USERS_CHECKIN);
    },
    async getPackages(): Promise<AxiosResponse<PackagesResponse>> {
        return await tokenAxios.get<PackagesResponse>(API_V1_0_USERS_PACKAGES);
    },
    async buyPackages(payload: buyPackagesRequest): Promise<AxiosResponse<boolean>> {
        return await tokenAxios.post<boolean>(API_V1_0_USERS_BUY_PACKAGES, payload);
    },
    async getAgencyList(): Promise<AxiosResponse<AgentsResponse>> {
        return await tokenAxios.get<AgentsResponse>(API_V1_0_AGENCY_LIST);
    },
    async getTree(): Promise<AxiosResponse<string>> {
        return await tokenAxios.get<string>(API_V1_0_TERNARY_TREE_MY_LIST);
    },
    async getTreeByUsername(username: string): Promise<AxiosResponse<string>> {
        return await tokenAxios.get<string>(API_V1_0_TERNARY_TREE_LIST_USERNAME(username));
    },
    async getVaultInfo(): Promise<AxiosResponse<any>> {
        return await tokenAxios.get<any>(API_V1_0_VAULT_INFO);
    }
};
