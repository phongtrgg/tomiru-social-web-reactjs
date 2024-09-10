import { LoadingStatus } from "../../../../types/common";
import { FriendUserResponse } from "../../../../types/user";

export interface FriendsOfAuthUserState {
    items: FriendUserResponse[];
    loadingStatus: LoadingStatus;
}
