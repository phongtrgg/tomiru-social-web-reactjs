import { Action } from "redux";

import { ChatMessageRequest, ChatMessageState, ChatMessageWithTweetRequest } from "./state";
import { ChatMessageResponse } from "../../../../types/chat";
import { LoadingStatus } from "../../../../types/common";

export enum ChatMessagesActionsType {
    SET_CHAT_MESSAGES = "chatMessages/SET_CHAT_MESSAGES",
    SET_CHAT_MESSAGE = "chatMessages/SET_CHAT_MESSAGE",
    ADD_CHAT_MESSAGE = "chatMessages/ADD_CHAT_MESSAGE",
    ADD_CHAT_MESSAGE_WITH_TWEET = "chatMessages/ADD_CHAT_MESSAGE_WITH_TWEET",
    FETCH_CHAT_MESSAGES = "chatMessages/FETCH_CHAT_MESSAGES",
    RESET_CHAT_MESSAGES = "chatMessages/RESET_CHAT_MESSAGES",
    SET_LOADING_STATE = "chatMessages/SET_LOADING_STATE",
    FETCH_GROUP_CHAT_MESSAGES = "chatMessages/FETCH_GROUP_CHAT_MESSAGES",
    ADD_CHAT_GROUP_MESSAGE = "chatMessages/ADD_CHAT_GROUP_MESSAGE" // Thêm action cho chat nhóm
}

export interface SetChatMessagesActionInterface extends Action<ChatMessagesActionsType> {
    type: ChatMessagesActionsType.SET_CHAT_MESSAGES;
    payload: ChatMessageState["items"];
}

export interface SetChatMessageActionInterface extends Action<ChatMessagesActionsType> {
    type: ChatMessagesActionsType.SET_CHAT_MESSAGE;
    payload: ChatMessageResponse;
}

export interface AddChatMessageActionInterface extends Action<ChatMessagesActionsType> {
    type: ChatMessagesActionsType.ADD_CHAT_MESSAGE;
    payload: ChatMessageRequest;
}

export interface AddChatGroupMessageActionInterface extends Action<ChatMessagesActionsType> { // Thêm interface cho chat nhóm
    type: ChatMessagesActionsType.ADD_CHAT_GROUP_MESSAGE;
    payload: ChatMessageRequest; // Sử dụng payload tương tự như thêm tin nhắn
}

export interface AddChatMessageWithTweetActionInterface extends Action<ChatMessagesActionsType> {
    type: ChatMessagesActionsType.ADD_CHAT_MESSAGE_WITH_TWEET;
    payload: ChatMessageWithTweetRequest;
}

export interface FetchChatMessagesActionInterface extends Action<ChatMessagesActionsType> {
    type: ChatMessagesActionsType.FETCH_CHAT_MESSAGES;
    payload: number; // ID của cuộc trò chuyện
}

//chat-group
export interface FetchGroupChatMessagesActionInterface extends Action<ChatMessagesActionsType> {
    type: ChatMessagesActionsType.FETCH_GROUP_CHAT_MESSAGES;
    payload: number; // ID của nhóm
}

export interface SetChatMessagesLoadingStateActionInterface extends Action<ChatMessagesActionsType> {
    type: ChatMessagesActionsType.SET_LOADING_STATE;
    payload: LoadingStatus;
}

export interface ResetChatMessagesLoadingStateActionInterface extends Action<ChatMessagesActionsType> {
    type: ChatMessagesActionsType.RESET_CHAT_MESSAGES;
}

// Định nghĩa kiểu action cho chat messages
export type ChatMessageActions =
    | SetChatMessagesActionInterface
    | SetChatMessageActionInterface
    | AddChatMessageActionInterface
    | AddChatGroupMessageActionInterface // Thêm vào đây
    | AddChatMessageWithTweetActionInterface
    | FetchChatMessagesActionInterface
    | FetchGroupChatMessagesActionInterface // Thêm vào đây
    | ResetChatMessagesLoadingStateActionInterface
    | SetChatMessagesLoadingStateActionInterface;
