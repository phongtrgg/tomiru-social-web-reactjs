export interface buyPackagesRequest {
    packageName: string;
}
export interface sendTokenRequest {
    value: number;
    codeOtp: string;
    email: string;
    message: string;
}
export interface WalletUserRespone {
    data: WalletUserData;
    meta: any;
}
export interface WalletUserData {
    buyPackageAt: number;
    checkInBonus: number;
    checkedIn: boolean;
    coverImage: string;
    coverImageFull: string;
    createdAt: number;
    email: string;
    expiredPremiumAt: number;
    firstName: string;
    gender: string;
    introduce: string;
    kycStatus: string;
    lastName: string;
    package: WalletUserPackageResponse;
    phone: string;
    phoneCode: string;
    profileImage: string;
    profileImageFull: string;
    refCode: string;
    slug: any;
    status: string;
    twoFaEnabled: boolean;
    username: string;
    usersBalances: usersBalancesRespose[];
}
export interface WalletUserPackageResponse {
    createdAt: number;
    name: string;
    price: number;
    validInDay: number;
    description: string;
    discount: number;
    updatedAt: number;
}
export interface usersBalancesRespose {
    balance: string;
    token: tokenResponse;
}

export interface tokenResponse {
    logo: string;
    name: string;
    symbol: string;
}
export interface UserCheckInResponse {
    data: boolean;
    message: string;
}
export interface SendTokenOTPResponse {
    data: {
        sent: boolean;
    };
}

export const TRANSACTION_TYPES = [
    { key: "buy_package", color: "#07b2f5" },
    { key: "send_token", color: "red" },
    { key: "receive_token", color: "#07f5a6" },
    { key: "daily_bonus", color: "#f5ae07" },
    { key: "com_f1", color: "#07f51f" },
    { key: "com_f2", color: "#07f51f" },
    { key: "com_f3", color: "#07f51f" },
    { key: "com_f4", color: "#07f51f" },
    { key: "com_f5", color: "#07f51f" },
    { key: "com_f6", color: "#07f51f" },
    { key: "com_f7", color: "#07f51f" },
    { key: "com_f8", color: "#07f51f" },
    { key: "com_f9", color: "#07f51f" },
    { key: "com_f10", color: "#07f51f" },
    { key: "signup_bonus_f1", color: "#07f51f" },
    { key: "signup_bonus_f2", color: "#07f51f" },
    { key: "signup_bonus", color: "#07f51f" },
    { key: "passive_f1_lv2", color: "#07f51f" },
    { key: "passive_f1_lv1", color: "#07f51f" },

    { key: "change_ptomxu_tomxu", color: "#07f51f" },
    { key: "change_ptomxu_tomxu_redeem", color: "#07f51f" },
    { key: "revoke_ptomxu", color: "#07f51f" },
    { key: "user_refund_vault", color: "#07f51f" },
    { key: "vault_distribute_redeem", color: "#07f51f" },
    { key: "auto_change_ptomxu_tomxu", color: "#07f51f" },
    { key: "auto_change_ptomxu_tomxu_redeem", color: "#07f51f" }
];

export const TOMXU_TYPES = [
    { key: "Xu", display: "TOMXU" },
    { key: "pXu", display: "pTOMXU" }
];
export const TRANSACTION_ICOME_HISTORY_TYPES = [
    { key: "com_f1", color: "#07f51f" },
    { key: "com_f2", color: "#07f51f" },
    { key: "com_f3", color: "#07f51f" },
    { key: "com_f4", color: "#07f51f" },
    { key: "com_f5", color: "#07f51f" },
    { key: "com_f6", color: "#07f51f" },
    { key: "com_f7", color: "#07f51f" },
    { key: "com_f8", color: "#07f51f" },
    { key: "com_f9", color: "#07f51f" },
    { key: "com_f10", color: "#07f51f" },
    { key: "signup_bonus_f1", color: "#07f51f" },
    { key: "signup_bonus_f2", color: "#07f51f" },
    { key: "signup_bonus", color: "#07f51f" },
    { key: "passive_f1_lv2", color: "#07f51f" },
    { key: "passive_f1_lv1", color: "#07f51f" }
];
