import { RootState } from "../../store";
import { FriendsUserState } from "./contracts/state";

export const listFriend = (state: RootState): FriendsUserState => state.friendsUser;
export const listFriendItems = (state: RootState) => listFriend(state).items