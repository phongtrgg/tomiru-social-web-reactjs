import { SetBackgroundColorActionInterface } from './../../user/contracts/actionTypes';
import { Action } from "redux";

import { ChatResponse } from "../../../../types/chat";
import { ChatsState, LeaveConversationRequest } from "./state";
import { LoadingStatus } from "../../../../types/common";
import { ChatActionsType } from '../../chat/contracts/actionTypes';
import { UserResponse } from '../../../../types/user';

export enum ChatsActionsType {
    SET_CHATS = "chats/SET_CHATS",
    SET_CHAT = "chats/SET_CHAT",
    FETCH_CHATS = "chats/FETCH_CHATS",
    CREATE_CHAT = "chats/CREATE_CHAT",
    LEAVE_FROM_CONVERSATION = "chats/LEAVE_FROM_CONVERSATION",
    RESET_CHATS_STATE = "chats/RESET_CHATS_STATE",
    SET_LOADING_STATE = "chats/SET_LOADING_STATE",
    CREATE_GROUP_CHAT = "chats/CREATE_GROUP_CHAT",

    // đổi tên nhóm chat
    UPDATE_CHATS_GROUP_NAME = "chats/UPDATE_CHATS_GROUP_NAME",
    SET_CHATS_GROUP_NAME = "chats/SET_CHATS_GROUP_NAME",
    // đổi hình nên nhóm chat
    UPDATE_CHATS_GROUP_BACKGROUND = "chats/UPDATE_CHATS_GROUP_BACKGROUND",
    SET_CHATS_GROUP_BACKGROUND = "chats/SET_CHATS_GROUP_BACKGROUND",
    // rời nhóm chat
    LEAVE_CHAT_GROUP = 'LEAVE_CHAT_GROUP',
    // xóa thành viên nhóm chat
    REMOVE_MEMBER = 'REMOVE_MEMBER',
    REMOVE_MEMBER_FAILURE = 'REMOVE_MEMBER_FAILURE',
    // thêm thành viên vào nhóm chat
    ADD_MEMBER_TO_CHAT_GROUP = 'ADD_MEMBER_TO_CHAT_GROUP',
    ADD_MEMBER_TO_CHAT_GROUP_SUCCESS = 'ADD_MEMBER_TO_CHAT_GROUP_SUCCESS',
    ADD_MEMBER_ERROR='ADD_MEMBER_ERROR',
    // reset note error
    RESET_CHAT_ERROR = 'RESET_CHAT_ERROR',

}

export interface SetChatsActionInterface extends Action<ChatsActionsType> {
    type: ChatsActionsType.SET_CHATS;
    payload: ChatsState["items"];
}

export interface SetChatActionInterface extends Action<ChatsActionsType> {
    type: ChatsActionsType.SET_CHAT;
    payload: ChatResponse;
}

export interface FetchChatsActionInterface extends Action<ChatsActionsType> {
    type: ChatsActionsType.FETCH_CHATS;
}

export interface CreateChatActionInterface extends Action<ChatsActionsType> {
    type: ChatsActionsType.CREATE_CHAT;
    payload: number;
}

//chat-group
export interface CreateGroupChatActionInterface extends Action<ChatsActionsType> {
    type: ChatsActionsType.CREATE_GROUP_CHAT,
    payload:{ userIds : number[]; chatName: string; },
}

export interface LeaveFromConversationActionInterface extends Action<ChatsActionsType> {
    type: ChatsActionsType.LEAVE_FROM_CONVERSATION;
    payload: LeaveConversationRequest;
}

export interface ResetChatsStateActionInterface extends Action<ChatsActionsType> {
    type: ChatsActionsType.RESET_CHATS_STATE;
}

export interface SetChatsLoadingStateActionInterface extends Action<ChatsActionsType> {
    type: ChatsActionsType.SET_LOADING_STATE;
    payload: LoadingStatus;
}

// đổi tên nhóm chat
export interface UpdateChatsGroupNameActionInterface extends Action<ChatsActionsType>{
    type: ChatsActionsType.UPDATE_CHATS_GROUP_NAME;
    payload: {
        chatId: number | undefined;
        chatName: string;
    };
}

export interface SetChatsGroupNameActionInterface extends Action<ChatsActionsType> {
    type: ChatsActionsType.SET_CHATS_GROUP_NAME;
    payload: {
        chatId: number | undefined;
        chatName: string;
    };
}


// đổi hình nền nhóm chat
export interface UpdateBackgroundChatsGroupActionInterface extends Action<ChatsActionsType> {
    type: ChatsActionsType.UPDATE_CHATS_GROUP_BACKGROUND;
    payload: {
        chatId: number | undefined;
        backGround: string;
    };
}

export interface SetBackgroundChatsGroupActionInterface extends Action<ChatsActionsType> {
    type: ChatsActionsType.SET_CHATS_GROUP_BACKGROUND;
    payload: {
        chatId: number | undefined;
        backGround: string;
    }
}

// rời nhóm
export interface LeaveChatGroupActionInterface extends Action<ChatsActionsType> {
    type: ChatsActionsType.LEAVE_CHAT_GROUP;
    payload: {
        chatId: number | undefined,
        userIds: number[]
    }
}
// xóa thành viên nhóm chat
export interface RemoveMemberInterface extends Action<ChatsActionsType> {
    type: ChatsActionsType.REMOVE_MEMBER;
    payload: {
        chatId: number | undefined,
        userIds:  number[];
    }
}

export interface RemoveMeberFailureInterface extends Action<ChatsActionsType> {
    type: ChatsActionsType.REMOVE_MEMBER_FAILURE;
    payload: string
}



// thêm thành viên vào nhóm chat
export interface AddMemberToChatGroupInterface extends Action<ChatsActionsType> {
    type: ChatsActionsType.ADD_MEMBER_TO_CHAT_GROUP;
    payload: {
        chatId: number | undefined,
        userIds : number[];
    }
}

export interface AddMemberToChatGroupSuccessInterface extends Action<ChatsActionsType> {
    type: ChatsActionsType.ADD_MEMBER_TO_CHAT_GROUP_SUCCESS;
    payload: {
        chatId: number | undefined,
        newMembers: UserResponse[];
    }
}

export interface AddMemberToChatGroupFailureInterface extends Action<ChatsActionsType> {
    type: ChatsActionsType.ADD_MEMBER_ERROR;
    payload: string
    
}

// reset note error
export interface ResetErrorInterface extends Action<ChatsActionsType> {
    type: ChatsActionsType.RESET_CHAT_ERROR;
}



export type ChatsActions =
    | SetChatsActionInterface
    | SetChatActionInterface
    | LeaveFromConversationActionInterface
    | ResetChatsStateActionInterface
    | SetChatsLoadingStateActionInterface
    | UpdateChatsGroupNameActionInterface
    | SetChatsGroupNameActionInterface
    | UpdateBackgroundChatsGroupActionInterface
    | SetBackgroundChatsGroupActionInterface
    | LeaveChatGroupActionInterface
    | RemoveMemberInterface
    | AddMemberToChatGroupInterface
    | AddMemberToChatGroupSuccessInterface
    | AddMemberToChatGroupFailureInterface
    | RemoveMeberFailureInterface
    | ResetErrorInterface
