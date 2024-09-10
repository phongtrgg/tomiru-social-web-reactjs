import axios, { AxiosResponse } from "axios";
import {
    UI_V1_CHECK_FRIEND,
    UI_V1_USER_ACCEPT_FRIEND,
    UI_V1_USER_SEND_FRIEND_REQUEST_OR_CANCEL_FRIEND_REQUEST_OR_REJECT_FRIEND_REQUEST_OR_DELETE_FRIEND
} from "../../../constants/endpoint-constants";

export const FriendApi = {
    async relationshipFriend(payload: number): Promise<AxiosResponse<boolean>> {
        return axios.get<boolean>(UI_V1_CHECK_FRIEND(payload));
    },
    async acceptFriend(userId: number): Promise<AxiosResponse<boolean>> {
        return axios.post<boolean>(UI_V1_USER_ACCEPT_FRIEND(userId));
    },
    async sendOrCancelOrRejectFriendRequestOrDeleteFriend(userId: number): Promise<AxiosResponse<boolean>> {
        return axios.post<boolean>(
            UI_V1_USER_SEND_FRIEND_REQUEST_OR_CANCEL_FRIEND_REQUEST_OR_REJECT_FRIEND_REQUEST_OR_DELETE_FRIEND(userId)
        );
    }
};
