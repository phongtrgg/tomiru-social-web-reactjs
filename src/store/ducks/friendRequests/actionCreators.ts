import { LoadingStatus } from "../../../types/common";
import {
    FetchAcceptFriendInterface,
    FetchDeleteFriendRequestInterface,
    FetchFriendRequestsInterface,
    FetchRelationshipRequestInterface,
    FriendRequestActionTypes,
    SetAcceptFriendInterface,
    SetDeleteFriendRequestInterface,
    SetFriendRequestAcceptLoadingStatusInterface,
    SetFriendRequestsInterface,
    SetFriendRequestsLoadingStatusInterface,
    SetRelationshipSuccessInterface
} from "./contract/actionTypes";
import {
    AccepFriendLoadingStatusPayload,
    FetchAcceptFriendRequest,
    FetchRelationshipUser,
    FriendRequestResponse
} from "./contract/state";

export const fetchFriendRequests = (): FetchFriendRequestsInterface => ({
    type: FriendRequestActionTypes.FETCH_FRIEND_REQUESTS
});

export const setFriendRequests = (payload: FriendRequestResponse[]): SetFriendRequestsInterface => ({
    type: FriendRequestActionTypes.SET_FRIEND_REQUESTS,
    payload
});
export const setFriendRequestsLoadingStatus = (payload: LoadingStatus): SetFriendRequestsLoadingStatusInterface => ({
    type: FriendRequestActionTypes.SET_FRIEND_REQUESTS_LOADING_STATUS,
    payload
});
export const setFriendRequestAcceptLoadingStatus = (
    payload: AccepFriendLoadingStatusPayload
): SetFriendRequestAcceptLoadingStatusInterface => ({
    type: FriendRequestActionTypes.SET_FRIEND_REQUEST_ACCEPT_LOADING_STATUS,
    payload
});
export const fetchAcceptFriendRequest = (payload: FetchAcceptFriendRequest): FetchAcceptFriendInterface => ({
    type: FriendRequestActionTypes.FETCH_ACCEPT_FRIEND,
    payload
});
export const setAccepFriendRequest = (payload: number): SetAcceptFriendInterface => ({
    type: FriendRequestActionTypes.SET_ACCEPT_REQUEST,
    payload
});
export const fetchDeleteFriendRequest = (payload: FetchAcceptFriendRequest): FetchDeleteFriendRequestInterface => ({
    type: FriendRequestActionTypes.FETCH_DELETE_FRIEND_REQUEST,
    payload
});

export const setDeleteFriendRequest = (payload: number): SetDeleteFriendRequestInterface => ({
    type: FriendRequestActionTypes.DELETE_FRIEND_REQUEST,
    payload
});
export const fetchRelationshipRequest = (payload: FetchRelationshipUser): FetchRelationshipRequestInterface => ({
    type: FriendRequestActionTypes.RELATIONSHIP_USER,
    payload
});
export const setRelationshipSuccess = (payload: any): SetRelationshipSuccessInterface => ({
    type: FriendRequestActionTypes.RELATIONSHIP_USER_SUCCESS,
    payload
});
