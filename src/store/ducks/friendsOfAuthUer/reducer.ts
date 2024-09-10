import produce, { Draft } from "immer";
import { LoadingStatus } from "../../../types/common";
import { FriendsOfAuthUserState } from "./contract/states";
import { FriendsOfAuthUserActions, FriendsOfAuthUserActionTypes } from "./contract/actionTypes";

export const initialFriendRequestsState: FriendsOfAuthUserState = {
    items: [],
    loadingStatus: LoadingStatus.LOADING
};
export const friendsOfAuthUserReducer = produce(
    (draft: Draft<FriendsOfAuthUserState>, action: FriendsOfAuthUserActions) => {
        switch (action.type) {
            case FriendsOfAuthUserActionTypes.SET_FRIENDS:
                draft.items = action.payload;
                draft.loadingStatus = LoadingStatus.LOADED;
                break;
            case FriendsOfAuthUserActionTypes.SET_LOADING_STATUS:
                draft.loadingStatus = action.payload;
                break;
            default:
                break;
        }
    },
    initialFriendRequestsState
);
