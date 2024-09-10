import { LoadingStatus } from "../../../../types/common";

export interface FriendRequestResponse {
    id: number;
    status: string;
    created_at: string;
    updated_at: string;
    userId: number;
    fullName: string;
    username: string;
    avatar: string;
    privateProfile: boolean;
    acceptLoadingstatus: LoadingStatus;
}
export interface FriendRequestsState {
    items: FriendRequestResponse[];
    loadingStatus: LoadingStatus;
    relationshipStatus: string;
}
export interface FetchAcceptFriendRequest {
    userId: number;
    requestId: number;
}
export interface AccepFriendLoadingStatusPayload {
    status: LoadingStatus;
    requestId: number;
}
export interface FetchRelationshipUser {
    userId: number;
}
