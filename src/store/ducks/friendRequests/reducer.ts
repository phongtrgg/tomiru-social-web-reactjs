import produce, { Draft } from "immer";
import { LoadingStatus } from "../../../types/common";
import { FriendRequestResponse, FriendRequestsState } from "./contract/state";
import { FriendRequestAction, FriendRequestActionTypes } from "./contract/actionTypes";

export const initialFriendRequestsState: FriendRequestsState = {
    items: [],
    loadingStatus: LoadingStatus.LOADING,
    relationshipStatus: ""
};
export const friendRequestsReducer = produce((draft: Draft<FriendRequestsState>, action: FriendRequestAction) => {
    switch (action.type) {
        case FriendRequestActionTypes.SET_FRIEND_REQUESTS:
            draft.items = action.payload.filter((p: FriendRequestResponse) => p.status === "pending");
            draft.loadingStatus = LoadingStatus.LOADED;
            break;
        case FriendRequestActionTypes.SET_FRIEND_REQUESTS_LOADING_STATUS:
            draft.loadingStatus = action.payload;
            break;
        case FriendRequestActionTypes.SET_ACCEPT_REQUEST:
            draft.items = draft.items.map((i: FriendRequestResponse) =>
                i.id === action.payload ? { ...i, status: "accept", acceptLoadingstatus: LoadingStatus.SUCCESS } : i
            );
            break;
        case FriendRequestActionTypes.SET_FRIEND_REQUEST_ACCEPT_LOADING_STATUS:
            draft.items = draft.items.map((i: FriendRequestResponse) =>
                i.id === action.payload.requestId ? { ...i, acceptLoadingstatus: action.payload.status } : i
            );
            break;
        case FriendRequestActionTypes.DELETE_FRIEND_REQUEST:
            draft.items = draft.items.filter((i: FriendRequestResponse) => i.id !== action.payload);
            draft.loadingStatus = LoadingStatus.LOADED;
            break;
        case FriendRequestActionTypes.RELATIONSHIP_USER_SUCCESS:
            draft.relationshipStatus = action.payload;
            draft.loadingStatus = LoadingStatus.SUCCESS;
            break;
        default:
            break;
    }
}, initialFriendRequestsState);
