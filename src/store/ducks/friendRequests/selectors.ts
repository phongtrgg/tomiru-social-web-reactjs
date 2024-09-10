import { LoadingStatus } from "../../../types/common";
import { RootState } from "../../store";
import { FriendRequestResponse, FriendRequestsState } from "./contract/state";

export const selectFriendRequests = (state: RootState): FriendRequestsState => state.friendRequests;
export const selectFriendRequestsList = (state: RootState): FriendRequestResponse[] => state.friendRequests.items;
export const selectFriendRequestsLoadingStatus = (state: RootState): LoadingStatus =>
    state.friendRequests.loadingStatus;
export const selectRelationshipStatus = (state: RootState): string => state.friendRequests.relationshipStatus;
