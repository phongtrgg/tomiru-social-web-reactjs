import { Action } from "redux-saga";
import { FriendUserResponse } from "../../../../types/user";
import { LoadingStatus } from "../../../../types/common";

export enum FriendsOfAuthUserActionTypes {
    FETCH_FRIENDS = "friendsOfAuthUser/FETCH_FRIENDS",
    SET_FRIENDS = "friendsOfAuthUser/SET_FRIENDS",
    SET_LOADING_STATUS = "friendsOfAuthUser/SET_LOADING_STATUS"
}
export interface FetchFriendsOfAuthUserInterface extends Action<FriendsOfAuthUserActionTypes> {
    type: FriendsOfAuthUserActionTypes.FETCH_FRIENDS;
    payload: number;
}
export interface SetFriendsOfAuthUserInterface extends Action<FriendsOfAuthUserActionTypes> {
    type: FriendsOfAuthUserActionTypes.SET_FRIENDS;
    payload: FriendUserResponse[];
}
export interface SetFriendsOfAuthUserLoadingStatusInterface extends Action<FriendsOfAuthUserActionTypes> {
    type: FriendsOfAuthUserActionTypes.SET_LOADING_STATUS;
    payload: LoadingStatus;
}
export type FriendsOfAuthUserActions =
    | FetchFriendsOfAuthUserInterface
    | SetFriendsOfAuthUserInterface
    | SetFriendsOfAuthUserLoadingStatusInterface;
