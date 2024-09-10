import { LoadingStatus } from './../../../types/common';
import produce, { Draft } from "immer";
import { FriendUserActions, FriendUserActionTypes } from "./contracts/actionTypes";
import { FriendsUserState } from "./contracts/state";

export const initialFriendsUserState : FriendsUserState = {
    items: [],
    loadingState: LoadingStatus.LOADING,
    error: undefined,
    selectedFriend: null
}

export const friendsUserReducer = produce((draft: Draft<FriendsUserState>, action: FriendUserActions) => {
    switch (action.type){
        case FriendUserActionTypes.SET_LIST_FRIEND:
            draft.items = action.payload;
            draft.loadingState = LoadingStatus.LOADED;
            break;
        case FriendUserActionTypes.UNFRIEND_SUCCESS:
            draft.items.filter(friend => friend.id != action.payload);
            draft.loadingState = LoadingStatus.LOADED;
            break;
        case FriendUserActionTypes.CHECK_FOLLOW_REQUEST:
            draft.loadingState = LoadingStatus.LOADING;
            break;
        case FriendUserActionTypes.CHECK_FOLLOW_RESPONSE:
            draft.items = draft.items.map(friend => friend.userId === action.payload.userId ? 
                {...friend, statusFollow : action.payload.checkFollow} : friend
            );
            draft.loadingState = LoadingStatus.LOADED;
            break;
        case FriendUserActionTypes.UNFOLLOW_FRIEND_SUCCESS:
            draft.items = draft.items.map(friend => friend.userId === action.payload.userId ? 
                {...friend, statusFollow : action.payload.unfollowed} : friend
            );
            draft.loadingState = LoadingStatus.LOADED;
            break;
         case FriendUserActionTypes.SET_SELECTED_FRIEND:
            draft.selectedFriend = action.payload;
            draft.loadingState = LoadingStatus.LOADED;
            break;
        default:
            break
    }
}, initialFriendsUserState)