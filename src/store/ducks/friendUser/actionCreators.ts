import { FriendUserResponse } from "../../../types/user"
import { CheckFollowRequestInterface, CheckFollowResponseInterface, FetchListFriendInterface, FriendUserActionTypes, SetListFriendInterface, SetSelectedFriendInterface, UnfollowFriendInterface, UnfollowFriendSuccessInterface, UnfriendRequestInterface, UnfriendSuccessInterface } from "./contracts/actionTypes"

// lấy ra danh sách bạn bè
export const fetchListFriend = (userId: number) : FetchListFriendInterface => ({
    type: FriendUserActionTypes.FETCH_LIST_FRIEND,
    payload: userId
})

export const setListFriend = (listFriend: FriendUserResponse[]): SetListFriendInterface => ({
    type: FriendUserActionTypes.SET_LIST_FRIEND,
    payload: listFriend
})

// hủy theo dõi bạn bè
export const unfollowFriendRequest = (idUser: number): UnfollowFriendInterface => ({
    type: FriendUserActionTypes.UNFOLLOW_FRIEND_REQUEST,
    payload: idUser
})

export const unfollowFriendResponse= (userId: number,unfollowed: boolean): UnfollowFriendSuccessInterface => ({
    type: FriendUserActionTypes.UNFOLLOW_FRIEND_SUCCESS,
    payload: {userId ,unfollowed}
})

// hủy bạn bè
export const unFriendRequest = (userId: number): UnfriendRequestInterface => ({
    type: FriendUserActionTypes.UNFRIEND_REQUEST,
    payload: userId
})

export const unFriendResponse = (userId: number): UnfriendSuccessInterface => ({
    type: FriendUserActionTypes.UNFRIEND_SUCCESS,
    payload: userId
})

// check follow 
export const checkFollowRequest = (userId: number): CheckFollowRequestInterface => ({
    type: FriendUserActionTypes.CHECK_FOLLOW_REQUEST,
    payload: userId
})

export const checkFollowResponse = (userId: number,checkFollow: boolean): CheckFollowResponseInterface => ({
    type: FriendUserActionTypes.CHECK_FOLLOW_RESPONSE,
    payload: {
        userId,
        checkFollow
    }
})

export const setSelectedFriend = (friend: FriendUserResponse): SetSelectedFriendInterface => ({
    type: FriendUserActionTypes.SET_SELECTED_FRIEND,
    payload: friend
});
