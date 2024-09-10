import { LoadingStatus } from "../../../types/common";
import { FriendUserResponse } from "../../../types/user";
import { RootState } from "../../store";

export const selectFriendsOfAuthUser = (state: RootState): FriendUserResponse[] => state.friendsOfAuthUser.items;
export const selectFriendsOfAuthUserLoadingStatus = (state: RootState): LoadingStatus =>
    state.friendsOfAuthUser.loadingStatus;
