import {
    ChatsActionsType,
    CreateChatActionInterface,
    FetchChatsActionInterface,
    LeaveFromConversationActionInterface,
    ResetChatsStateActionInterface,
    SetChatActionInterface,
    SetChatsActionInterface,
    SetChatsLoadingStateActionInterface,
    CreateGroupChatActionInterface,
    SetBackgroundChatsGroupActionInterface,
    UpdateBackgroundChatsGroupActionInterface,
    SetChatsGroupNameActionInterface,
    UpdateChatsGroupNameActionInterface,
    LeaveChatGroupActionInterface,
    AddMemberToChatGroupInterface,
    AddMemberToChatGroupSuccessInterface,
    RemoveMemberInterface,
    AddMemberToChatGroupFailureInterface,
    RemoveMeberFailureInterface,
} from "./contracts/actionTypes";
import { ChatResponse } from "../../../types/chat";
import { ChatsState, LeaveConversationRequest } from "./contracts/state";
import { LoadingStatus } from "../../../types/common";
import { UserResponse } from "../../../types/user";

export const setChats = (payload: ChatsState["items"]): SetChatsActionInterface => ({
    type: ChatsActionsType.SET_CHATS,
    payload
});

export const setChat = (payload: ChatResponse): SetChatActionInterface => ({
    type: ChatsActionsType.SET_CHAT,
    payload
});

export const fetchChats = (): FetchChatsActionInterface => ({
    type: ChatsActionsType.FETCH_CHATS
});

export const createChat = (payload: number): CreateChatActionInterface => ({
    type: ChatsActionsType.CREATE_CHAT,
    payload
});

//chat-group
export const createGroupChat = (payload: { userIds : number[]; chatName: string; }): CreateGroupChatActionInterface => ({
    type: ChatsActionsType.CREATE_GROUP_CHAT,
    payload
})

export const leaveFromConversation = (payload: LeaveConversationRequest): LeaveFromConversationActionInterface => ({
    type: ChatsActionsType.LEAVE_FROM_CONVERSATION,
    payload
});

export const resetChatsState = (): ResetChatsStateActionInterface => ({
    type: ChatsActionsType.RESET_CHATS_STATE
});

export const setChatsLoadingState = (payload: LoadingStatus): SetChatsLoadingStateActionInterface => ({
    type: ChatsActionsType.SET_LOADING_STATE,
    payload
});

// đổi tên nhóm chat
export const updateChatsGroupName = (chatId: number | undefined, chatName: string): UpdateChatsGroupNameActionInterface => ({
    type: ChatsActionsType.UPDATE_CHATS_GROUP_NAME,
    payload: { chatId, chatName },
});

export const setChatsGroupName = (chatId: number | undefined, chatName: string): SetChatsGroupNameActionInterface => ({
    type: ChatsActionsType.SET_CHATS_GROUP_NAME,
    payload: { chatId, chatName },
});

// đổi hình nền nhóm chat
export const updateBackgroundChatsGroup = (chatId: number | undefined, backGround: string): UpdateBackgroundChatsGroupActionInterface => ({
    type: ChatsActionsType.UPDATE_CHATS_GROUP_BACKGROUND,
    payload: { chatId, backGround },
});

export const setBackgroundChatsGroup = (chatId: number | undefined, backGround: string): SetBackgroundChatsGroupActionInterface => ({
    type: ChatsActionsType.SET_CHATS_GROUP_BACKGROUND,
    payload: { chatId, backGround },
});

// rời nhóm
export const leaveChatGroup = (chatId: number| undefined, userIds: number[]): LeaveChatGroupActionInterface => ({
    type: ChatsActionsType.LEAVE_CHAT_GROUP,
    payload: {chatId, userIds},
});

// xóa thành viên nhóm chat
export const removeMember = (chatId: number| undefined, userIds: number[]): RemoveMemberInterface  => ({
    type: ChatsActionsType.REMOVE_MEMBER,
    payload: {chatId, userIds},
});

export const removeMemberFailure = (error: string): RemoveMeberFailureInterface  => ({
    type: ChatsActionsType.REMOVE_MEMBER_FAILURE,
    payload: error,
});



// thêm thành viên vào nhóm
export const addMemberToChatGroup = (chatId: number| undefined, userIds : number[]): AddMemberToChatGroupInterface => ({
    type: ChatsActionsType.ADD_MEMBER_TO_CHAT_GROUP,
    payload: {chatId, userIds }
})

export const addMemberToChatGroupSuccess = (chatId: number| undefined, newMembers : UserResponse[]): AddMemberToChatGroupSuccessInterface => ({
    type: ChatsActionsType.ADD_MEMBER_TO_CHAT_GROUP_SUCCESS,
    payload: {chatId, newMembers}
})

export const addMemberError = (error: string): AddMemberToChatGroupFailureInterface => ({
    type: ChatsActionsType.ADD_MEMBER_ERROR,
    payload: error,
});

// reset note error
export const resetChatError = () => ({
    type: ChatsActionsType.RESET_CHAT_ERROR,
});
