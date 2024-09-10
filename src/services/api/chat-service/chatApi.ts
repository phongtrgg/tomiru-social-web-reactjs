import axios, { AxiosResponse } from "axios";

import { ChatResponse } from "../../../types/chat";
import { UI_V1_ADD_NEW_MEMBERS_CHAT_GROUP, UI_V1_CHAT_CHAT_ID, UI_V1_CHAT_CREATE_USER_ID, UI_V1_CHAT_USERS, UI_V1_GROUP_CHAT, UI_V1_LEAVE_CHAT_GROUP, UI_V1_REMOVE_MEMBER, UI_V1_UPDATE_BACKGROUND_CHATS_GROUP, UI_V1_UPDATE_CHATS_GROUP_NAME } from "../../../constants/endpoint-constants";
import { UserResponse } from "../../../types/user";

export const ChatApi = {
    async getChatById(chatId: number): Promise<AxiosResponse<ChatResponse>> {
        return await axios.get<ChatResponse>(UI_V1_CHAT_CHAT_ID(chatId));
    },
    async getUserChats(): Promise<AxiosResponse<ChatResponse[]>> {
        return await axios.get<ChatResponse[]>(UI_V1_CHAT_USERS);
    },
    async createChat(userId: number): Promise<AxiosResponse<ChatResponse>> {
        return await axios.get<ChatResponse>(UI_V1_CHAT_CREATE_USER_ID(userId));
    },
    // Group Chat
    async createGroupChat(payload: { userIds: number[]; chatName: string }): Promise<AxiosResponse<ChatResponse>> {
        return await axios.post<ChatResponse>(UI_V1_GROUP_CHAT, payload);
    },
    
    // đổi tên nhóm chat
    async updateChatsGroupName(payload : {chatId: number | undefined; chatName: string}): Promise<AxiosResponse<ChatResponse>> {
        return await axios.post<ChatResponse>(UI_V1_UPDATE_CHATS_GROUP_NAME, payload);
    },

    // đổi hình nền nhóm chat
    async updateBackgroundChatsGroup(payload : {chatId: number | undefined; backGround: string}): Promise<AxiosResponse<ChatResponse>> {
        return await axios.post<ChatResponse>(UI_V1_UPDATE_BACKGROUND_CHATS_GROUP, payload);
    },

    // rời nhóm
    async leaveChatGroup(payload : {chatId: number | undefined; userIds : number[]}): Promise<AxiosResponse<UserResponse[]>> {
        return await axios.post<UserResponse[]>(UI_V1_LEAVE_CHAT_GROUP, payload);
    },

    // thêm thành viên vào nhóm chat
    async addNewMembersToChatGroup(payload : {chatId: number | undefined; userIds : number[]}): Promise<AxiosResponse<UserResponse[]>> {
        return await axios.post<UserResponse[]>(UI_V1_ADD_NEW_MEMBERS_CHAT_GROUP, payload);
    },

    // xóa thành viên khỏi nhóm chat
    async removeMember(payload : {chatId: number | undefined; userIds : number[]}): Promise<AxiosResponse<UserResponse[]>> {
        return await axios.post<UserResponse[]>(UI_V1_REMOVE_MEMBER, payload);
    },
};
