export interface WalletHistoryPage {
    data: WalletHistoryData[];
    meta: MetaResponse;
}
export interface MetaResponse {
    currentPage: number;
    itemCount: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
}
export interface WalletHistoryData {
    createdAt: number;
    fee: number;
    fromName: string;
    hash: string;
    message: string;
    postBalance: number;
    preBalance: number;
    status: string;
    toName: string;
    token: string;
    type: string;
    typeValue: string;
    value: number;
}
