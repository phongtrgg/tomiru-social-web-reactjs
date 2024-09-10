import { RootState } from "../../store";
import { ChatsState } from "./contracts/state";
import { LoadingStatus } from "../../../types/common";
import { ChatResponse } from "../../../types/chat";
import { createSelector } from "reselect";

// Selector để lấy tất cả nhóm chat
export const selectChats = (state: RootState): ChatsState => state.chats;
export const selectChatsItems = (state: RootState) => selectChats(state).items;
export const selectLoadingState = (state: RootState): LoadingStatus => selectChats(state).loadingState;
export const selectIsChatsLoading = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADING;
export const selectIsChatsLoaded = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADED;

//tên nhóm chat
export const selectChatGroupName = (state: RootState, chatId: number | undefined): string | undefined => {
    const chat = state.chats.items.find((chat) => chat.id === chatId);
    return chat ? chat.chatName : undefined;
};
// hình nền nhóm chat
export const selectBackgroundChatsGroup = (state: RootState, chatId: number | undefined): string | undefined => {
    if (chatId === undefined) return "white";
    const chat = state.chats.items.find((chat) => chat.id === chatId);

    return chat ? chat.backGround : "white";
};

// Selector để lấy nhóm chat theo ID
export const selectChatById = (state: RootState, chatId: number | undefined): ChatResponse | undefined => {
    return state.chats.items.find((chat) => chat.id === chatId);
};

// Selector để lấy thông tin các thành viên của nhóm chat
export const selectChatMembersById = createSelector([selectChatById], (chat) => chat?.participants ?? []);
