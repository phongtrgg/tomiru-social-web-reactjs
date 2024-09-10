import { Action } from "redux";
import { FriendUserResponse } from "../../../../types/user";

export enum FriendUserActionTypes {
    // lấy ra danh sách bạn bè
    FETCH_LIST_FRIEND = 'FETCH_LIST_FRIEND',
    SET_LIST_FRIEND = 'SET_LIST_FRIEND',
    // hủy theo dõi bạn bè
    UNFOLLOW_FRIEND_REQUEST = 'UNFOLLOW_FRIEND_REQUEST',
    UNFOLLOW_FRIEND_SUCCESS = 'UNFOLLOW_FRIEND_SUCCESS',
    // hủy kết bạn
    UNFRIEND_REQUEST = 'UNFRIEND_REQUEST',
    UNFRIEND_SUCCESS = 'UNFRIEND_SUCCESS',
    // check follow
    CHECK_FOLLOW_REQUEST = 'CHECK_FOLLOW_REQUEST',
    CHECK_FOLLOW_RESPONSE = 'CHECK_FOLLOW_RESPONSE',
    SET_SELECTED_FRIEND = 'SET_SELECTED_FRIEND'
}

// lấy ra danh sách bạn bè
export interface FetchListFriendInterface extends Action<FriendUserActionTypes> {
    type: FriendUserActionTypes.FETCH_LIST_FRIEND;
    payload: number
}

export interface SetListFriendInterface extends Action<FriendUserActionTypes> {
    type: FriendUserActionTypes.SET_LIST_FRIEND;
    payload: FriendUserResponse[];
}

// hủy theo dõi bạn bè
export interface UnfollowFriendInterface extends Action<FriendUserActionTypes> {
    type: FriendUserActionTypes.UNFOLLOW_FRIEND_REQUEST;
    payload: number;
}

export interface UnfollowFriendSuccessInterface extends Action<FriendUserActionTypes> {
    type: FriendUserActionTypes.UNFOLLOW_FRIEND_SUCCESS;
    payload: {
        userId: number,
        unfollowed: boolean
    };
}

// hủy bạn bè
export interface UnfriendRequestInterface extends Action<FriendUserActionTypes> {
    type: FriendUserActionTypes.UNFRIEND_REQUEST;
    payload: number;
}

export interface UnfriendSuccessInterface extends Action<FriendUserActionTypes> {
    type: FriendUserActionTypes.UNFRIEND_SUCCESS;
    payload: number;
}

// check follow
export interface CheckFollowRequestInterface extends Action<FriendUserActionTypes> {
    type: FriendUserActionTypes.CHECK_FOLLOW_REQUEST;
    payload: number;
}

export interface CheckFollowResponseInterface extends Action<FriendUserActionTypes> {
    type: FriendUserActionTypes.CHECK_FOLLOW_RESPONSE;
    payload: {
        userId: number,
        checkFollow: boolean
    };
}

// Thêm interface cho action setSelectedFriend
export interface SetSelectedFriendInterface extends Action<FriendUserActionTypes> {
    type: FriendUserActionTypes.SET_SELECTED_FRIEND;
    payload: FriendUserResponse;
}




export type FriendUserActions =
    | FetchListFriendInterface
    | SetListFriendInterface
    | UnfollowFriendInterface
    | UnfollowFriendSuccessInterface
    | UnfriendRequestInterface
    | UnfriendSuccessInterface
    | CheckFollowRequestInterface
    | CheckFollowResponseInterface
    | SetSelectedFriendInterface
