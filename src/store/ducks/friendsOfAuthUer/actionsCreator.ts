import { LoadingStatus } from "../../../types/common";
import { FriendUserResponse } from "../../../types/user";
import {
    FetchFriendsOfAuthUserInterface,
    FriendsOfAuthUserActionTypes,
    SetFriendsOfAuthUserInterface,
    SetFriendsOfAuthUserLoadingStatusInterface
} from "./contract/actionTypes";

export const fetchFriendsOfAuhUser = (userId: number): FetchFriendsOfAuthUserInterface => ({
    type: FriendsOfAuthUserActionTypes.FETCH_FRIENDS,
    payload: userId
});
export const setFriendsOfAuhUser = (payload: FriendUserResponse[]): SetFriendsOfAuthUserInterface => ({
    type: FriendsOfAuthUserActionTypes.SET_FRIENDS,
    payload
});
export const setFriendsOfAuhUserLoadingStatus = (
    payload: LoadingStatus
): SetFriendsOfAuthUserLoadingStatusInterface => ({
    type: FriendsOfAuthUserActionTypes.SET_LOADING_STATUS,
    payload
});
