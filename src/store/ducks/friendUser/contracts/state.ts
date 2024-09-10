import { LoadingStatus } from "../../../../types/common";
import { FriendUserResponse } from "../../../../types/user";

export interface FriendsUserState {
    items: FriendUserResponse[];
    loadingState: LoadingStatus;
    error?: string;
    selectedFriend: FriendUserResponse | null;
}