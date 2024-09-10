import { call, put, select, StrictEffect, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";

import {
    AddMemberToChatGroupInterface,
    ChatsActionsType,
    CreateChatActionInterface,
    CreateGroupChatActionInterface,
    LeaveChatGroupActionInterface,
    LeaveFromConversationActionInterface,
    RemoveMemberInterface,
    UpdateBackgroundChatsGroupActionInterface,
    UpdateChatsGroupNameActionInterface
} from "./contracts/actionTypes";
import {
    addMemberError,
    addMemberToChatGroupSuccess,
    removeMember,
    removeMemberFailure,
    setBackgroundChatsGroup,
    setChat,
    setChats,
    setChatsGroupName,
    setChatsLoadingState
} from "./actionCreators";
import { ChatApi } from "../../../services/api/chat-service/chatApi";
import { ChatParticipantApi } from "../../../services/api/chat-service/chatParticipantApi";
import { ChatResponse } from "../../../types/chat";
import { LoadingStatus } from "../../../types/common";
import { UserResponse } from "../../../types/user";
import { Console } from "console";
import { RootState } from "../../store";

export function* fetchChatsRequest() {
    try {
        yield put(setChatsLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<ChatResponse[]> = yield call(ChatApi.getUserChats);
        yield put(setChats(response.data));
    } catch (error) {
        yield put(setChatsLoadingState(LoadingStatus.ERROR));
    }
}

export function* createChatRequest({ payload }: CreateChatActionInterface) {
    try {
        yield put(setChatsLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<ChatResponse> = yield call(ChatApi.createChat, payload);
        yield put(setChat(response.data));
    } catch (error) {
        yield put(setChatsLoadingState(LoadingStatus.ERROR));
    }
}

// chat-group
export function* createGroupChatRequest({ payload }: CreateGroupChatActionInterface) {
    try {
        yield put(setChatsLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<ChatResponse> = yield ChatApi.createGroupChat(payload);

        yield put(setChat(response.data));
    } catch (error) {
        yield put(setChatsLoadingState(LoadingStatus.ERROR));
    }
}

export function* leaveFromConversationRequest({ payload }: LeaveFromConversationActionInterface) {
    try {
        yield put(setChatsLoadingState(LoadingStatus.LOADING));
        yield call(ChatParticipantApi.leaveFromConversation, payload);
    } catch (error) {
        yield put(setChatsLoadingState(LoadingStatus.ERROR));
    }
}

// đổi tên nhóm chat
export function* updateChatGroupNameRequest({ payload }: UpdateChatsGroupNameActionInterface) {
    try {
        yield put(setChatsLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<string> = yield call(ChatApi.updateChatsGroupName, payload);
        yield put(setChatsGroupName(payload.chatId, response.data));
    } catch (error) {
        yield put(setChatsLoadingState(LoadingStatus.ERROR));
    }
}

// đổi hình nền nhóm chat
export function* updateBackgroundChatsGroupRequest({ payload }: UpdateBackgroundChatsGroupActionInterface) {
    try {
        yield put(setChatsLoadingState(LoadingStatus.LOADING));

        const response: AxiosResponse<string> = yield call(ChatApi.updateBackgroundChatsGroup, payload);

        yield put(setBackgroundChatsGroup(payload.chatId, response.data));
    } catch (error) {
        yield put(setChatsLoadingState(LoadingStatus.ERROR));
    }
}

// rời nhóm
export function* leaveChatGroupRequest({ payload }: LeaveChatGroupActionInterface) {
    try {
        yield put(setChatsLoadingState(LoadingStatus.LOADING));

        const response: AxiosResponse<UserResponse[]> = yield call(ChatApi.leaveChatGroup, payload);
        // const newMembers = response.data

        // yield put(leaveChatGroupSuccess(payload.chatId, newMembers));
    } catch (error) {
        yield put(setChatsLoadingState(LoadingStatus.ERROR));
    }
}

// xóa thành viên khỏi nhóm chat
export function* removeMemberRequest({ payload }: RemoveMemberInterface) {
    try {
        yield put(setChatsLoadingState(LoadingStatus.LOADING));

        const response: AxiosResponse<{ data: string | UserResponse[] }> = yield call(ChatApi.removeMember, payload);

        if (typeof response.data === "string" && response.data === "Bạn Không Phải Trưởng Nhóm!") {
            yield put(removeMemberFailure(response.data));
        } else if (Array.isArray(response.data)) {
            yield put(removeMember(payload.chatId, payload.userIds));
        }

        yield put(setChatsLoadingState(LoadingStatus.LOADED));
    } catch (error) {
        yield put(removeMemberFailure("Đã xảy ra lỗi khi xóa thành viên khỏi nhóm"));
        yield put(setChatsLoadingState(LoadingStatus.ERROR));
    }
}

// thêm thành viên vào nhóm chat

// export function* handleAddMemberToChatGroup({payload}: AddMemberToChatGroupInterface) {
//     try {
//         yield put(setChatsLoadingState(LoadingStatus.LOADING));
//
//         const response: AxiosResponse<UserResponse[]> = yield call(ChatApi.addNewMembersToChatGroup, payload);
//         const newMembers = response.data;
//
//         yield put(addMemberToChatGroupSuccess(payload.chatId, newMembers));
//     } catch (error) {
//         yield put(setChatsLoadingState(LoadingStatus.ERROR));
//     }
// }

export function* handleAddMemberToChatGroup({
    payload
}: AddMemberToChatGroupInterface): Generator<StrictEffect, void, AxiosResponse<UserResponse[]> | ChatResponse> {
    try {
        yield put(setChatsLoadingState(LoadingStatus.LOADING));
        const chat = (yield select((state: RootState) =>
            state.chats.items.find((chat: ChatResponse) => chat.id === payload.chatId)
        )) as ChatResponse;

        const existingMembers = chat.participants.map((participant) => participant.user.id);

        const newMembersToAdd = payload.userIds.filter((memberId) => !existingMembers.includes(memberId));

        if (newMembersToAdd.length === 0) {
            yield put(addMemberError("Thành viên này đã có trong nhóm"));
            yield put(setChatsLoadingState(LoadingStatus.LOADED));
        } else {
            const response = (yield call(ChatApi.addNewMembersToChatGroup, {
                chatId: payload.chatId,
                userIds: newMembersToAdd
            })) as AxiosResponse<UserResponse[]>;

            const newMembers = response.data;

            yield put(addMemberToChatGroupSuccess(payload.chatId, newMembers));
        }
    } catch (error) {
        yield put(addMemberError("Đã xảy ra lỗi khi thêm thành viên vào nhóm"));
        yield put(setChatsLoadingState(LoadingStatus.ERROR));
    }
}

export function* chatsSaga() {
    yield takeLatest(ChatsActionsType.FETCH_CHATS, fetchChatsRequest);
    yield takeLatest(ChatsActionsType.CREATE_CHAT, createChatRequest);
    yield takeLatest(ChatsActionsType.LEAVE_FROM_CONVERSATION, leaveFromConversationRequest);
    // chat-group
    yield takeLatest(ChatsActionsType.CREATE_GROUP_CHAT, createGroupChatRequest);
    yield takeLatest(ChatsActionsType.UPDATE_CHATS_GROUP_NAME, updateChatGroupNameRequest);
    yield takeLatest(ChatsActionsType.UPDATE_CHATS_GROUP_BACKGROUND, updateBackgroundChatsGroupRequest);
    yield takeLatest(ChatsActionsType.LEAVE_CHAT_GROUP, leaveChatGroupRequest);
    yield takeLatest(ChatsActionsType.ADD_MEMBER_TO_CHAT_GROUP, handleAddMemberToChatGroup);
    yield takeLatest(ChatsActionsType.REMOVE_MEMBER, removeMemberRequest);
}
