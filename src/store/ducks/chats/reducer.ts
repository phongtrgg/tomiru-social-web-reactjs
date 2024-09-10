import produce, { Draft } from "immer";

import { ChatsActions, ChatsActionsType } from "./contracts/actionTypes";
import { ChatsState, LeaveConversationRequest } from "./contracts/state";
import { LoadingStatus } from "../../../types/common";
import { ChatResponse } from "../../../types/chat";
import { WritableDraft } from "immer/dist/types/types-external";

export const initialChatsState: ChatsState = {
    items: [],
    loadingState: LoadingStatus.NEVER,
    error: undefined, 
};

export const chatsReducer = produce((draft: Draft<ChatsState>, action: ChatsActions) => {
    switch (action.type) {
        case ChatsActionsType.SET_CHATS:
            draft.items = action.payload;
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case ChatsActionsType.SET_CHAT:
            draft.items = [...draft.items, action.payload];
            draft.loadingState = LoadingStatus.LOADED;
            break;
            

        case ChatsActionsType.LEAVE_FROM_CONVERSATION:
            draft.items = draft.items.filter((chat) => chat.id !== action.payload.chatId);
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case ChatsActionsType.RESET_CHATS_STATE:
            draft.items = [];
            draft.loadingState = LoadingStatus.LOADING;
            break;

        case ChatsActionsType.SET_LOADING_STATE:
            draft.loadingState = action.payload;
            break;
        // đổi tên nhóm chat
        case ChatsActionsType.SET_CHATS_GROUP_NAME:
            draft.items = draft.items.map(chat =>
                chat.id === action.payload.chatId ? { ...chat, chatName: action.payload.chatName } : chat
            );
            draft.loadingState = LoadingStatus.LOADED;
            break;
        // đổi hình nền nhóm chat
        case ChatsActionsType.SET_CHATS_GROUP_BACKGROUND:
            draft.items = draft.items.map(chat =>
                chat.id === action.payload.chatId ? { ...chat, backGround: action.payload.backGround } : chat
            ) as WritableDraft<ChatResponse>[];
            draft.loadingState = LoadingStatus.LOADED;
            break;
        //rời nhóm
        case ChatsActionsType.LEAVE_CHAT_GROUP:
            // draft.items = draft.items.map(chat =>
            //     chat.id === action.payload.chatId
            //         ? {
            //               ...chat,
            //               participants: chat.participants.map(participant =>
            //                   action.payload.userIds.includes(participant.user.id)
            //                       ? { ...participant, isLeftChat: true }
            //                       : participant
            //               ),
            //           }
            //         : chat
            // )as WritableDraft<ChatResponse>[];  
            
            draft.loadingState = LoadingStatus.LOADED;
            draft.items = draft.items.map(chat => {
                if (chat.id === action.payload.chatId) {
                    const updatedParticipants = chat.participants.filter(
                        participant => !action.payload.userIds.includes(participant.user.id)
                    );
                    return {
                        ...chat,
                        participants: updatedParticipants,
                    };
                }
                return chat;
            }) as WritableDraft<ChatResponse>[];
            draft.loadingState = LoadingStatus.LOADED;
            break;
            
        // xóa thành viên khỏi nhóm
        case ChatsActionsType.REMOVE_MEMBER:
        draft.loadingState = LoadingStatus.LOADED;
        draft.items = draft.items.map(chat => {
            if (chat.id === action.payload.chatId) {
                const updatedParticipants = chat.participants.filter(
                    participant => !action.payload.userIds.includes(participant.user.id)
                );
                return {
                    ...chat,
                    participants: updatedParticipants,
                };
            }
            return chat;
        }) as WritableDraft<ChatResponse>[];
        draft.loadingState = LoadingStatus.LOADED;
        draft.error = undefined;
        break;

        case ChatsActionsType.REMOVE_MEMBER_FAILURE:
            draft.error = action.payload;
            draft.loadingState = LoadingStatus.ERROR;
            break;

        // thêm thành viên vào nhóm
        case ChatsActionsType.ADD_MEMBER_TO_CHAT_GROUP_SUCCESS:
            draft.items = draft.items.map(chat => {
                if (chat && chat.id === action.payload.chatId) {
                    const existingMembers = chat.participants.map(participant => participant.user.id)
                    const newMemberToAdd = action.payload.newMembers.filter(member => !existingMembers.includes(member.id))
                    if(newMemberToAdd.length === 0) {
                        console.log("Thành viên đã có trong nhóm")
                        return chat;
                    }
                    return {
                        ...chat,
                        participants: [
                            ...chat.participants,
                            ...action.payload.newMembers.map(member => ({ user: member, isLeftChat: false }))
                        ]
                    };
                }
                return chat;
            }) as WritableDraft<ChatResponse>[];
            draft.loadingState = LoadingStatus.LOADED;
            draft.error = undefined;
            break;
        //     draft.items = draft.items.map(chat => {
        //         if(chat.id === action.payload.chatId) {
        //             return {
        //                 ...chat,
        //                 participants: [...chat.participants, ...action.payload.newMembers]
        //             }
        //         }
        //         return chat
        //     }) as WritableDraft<ChatResponse>[];
        // draft.loadingState = LoadingStatus.LOADED;
        // break;
        
        case ChatsActionsType.ADD_MEMBER_ERROR:
            draft.error = action.payload;
            draft.loadingState = LoadingStatus.ERROR;
            break;

        case ChatsActionsType.RESET_CHAT_ERROR:
            draft.error = undefined;
            break;
        default:
            break;
    }
}, initialChatsState);
