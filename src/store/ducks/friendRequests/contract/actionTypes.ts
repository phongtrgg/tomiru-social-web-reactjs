import { Action } from "redux-saga";
import {
    AccepFriendLoadingStatusPayload,
    FetchAcceptFriendRequest,
    FetchRelationshipUser,
    FriendRequestResponse
} from "./state";
import { LoadingStatus } from "../../../../types/common";

export enum FriendRequestActionTypes {
    FETCH_FRIEND_REQUESTS = "friendRequest/FETCH_FRIEND_REQUETS",
    SET_FRIEND_REQUESTS = "friendRequest/SET_FRIEND_REQUETS",
    SET_FRIEND_REQUESTS_LOADING_STATUS = "friendRequest/SET_LOADING_STATUS",
    SET_FRIEND_REQUEST_ACCEPT_LOADING_STATUS = "friendRequest/SET_FRIEND_REQUEST_ACCEPT_LOADING_STATUS",
    FETCH_ACCEPT_FRIEND = "friendRequest/FETCH_ACCEPT_FRIEND",
    SET_ACCEPT_REQUEST = "friendRequest/SET_ACCEPT_REQUEST",
    FETCH_DELETE_FRIEND_REQUEST = "friendRequest/FETCH_DELETE_FRIEND_REQUEST",
    DELETE_FRIEND_REQUEST = "friendRequest/DELETE_FRIEND_REQUEST",
    RELATIONSHIP_USER = "friendRequest/RELATIONSHIP_USER",
    RELATIONSHIP_USER_SUCCESS = "friendRequest/RELATIONSHIP_USER_SUCCESS"
}
export interface FetchFriendRequestsInterface extends Action<FriendRequestActionTypes> {
    type: FriendRequestActionTypes.FETCH_FRIEND_REQUESTS;
}

export interface SetFriendRequestsInterface extends Action<FriendRequestActionTypes> {
    type: FriendRequestActionTypes.SET_FRIEND_REQUESTS;
    payload: FriendRequestResponse[];
}
export interface SetFriendRequestsLoadingStatusInterface extends Action<FriendRequestActionTypes> {
    type: FriendRequestActionTypes.SET_FRIEND_REQUESTS_LOADING_STATUS;
    payload: LoadingStatus;
}
export interface SetFriendRequestAcceptLoadingStatusInterface extends Action<FriendRequestActionTypes> {
    type: FriendRequestActionTypes.SET_FRIEND_REQUEST_ACCEPT_LOADING_STATUS;
    payload: AccepFriendLoadingStatusPayload;
}
export interface FetchAcceptFriendInterface extends Action<FriendRequestActionTypes> {
    type: FriendRequestActionTypes.FETCH_ACCEPT_FRIEND;
    payload: FetchAcceptFriendRequest;
}
export interface SetAcceptFriendInterface extends Action<FriendRequestActionTypes> {
    type: FriendRequestActionTypes.SET_ACCEPT_REQUEST;
    payload: number;
}
export interface FetchDeleteFriendRequestInterface extends Action<FriendRequestActionTypes> {
    type: FriendRequestActionTypes.FETCH_DELETE_FRIEND_REQUEST;
    payload: FetchAcceptFriendRequest;
}
export interface FetchRelationshipRequestInterface extends Action<FriendRequestActionTypes> {
    type: FriendRequestActionTypes.RELATIONSHIP_USER;
    payload: FetchRelationshipUser;
}
export interface SetDeleteFriendRequestInterface extends Action<FriendRequestActionTypes> {
    type: FriendRequestActionTypes.DELETE_FRIEND_REQUEST;
    payload: number;
}
export interface SetRelationshipSuccessInterface extends Action<FriendRequestActionTypes> {
    type: FriendRequestActionTypes.RELATIONSHIP_USER_SUCCESS;
    payload: any;
}
export type FriendRequestAction =
    | FetchFriendRequestsInterface
    | SetFriendRequestsInterface
    | SetAcceptFriendInterface
    | FetchAcceptFriendInterface
    | SetFriendRequestAcceptLoadingStatusInterface
    | SetFriendRequestsLoadingStatusInterface
    | FetchDeleteFriendRequestInterface
    | FetchRelationshipRequestInterface
    | SetRelationshipSuccessInterface
    | SetDeleteFriendRequestInterface;
