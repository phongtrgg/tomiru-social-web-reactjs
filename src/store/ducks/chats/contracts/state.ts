import { ChatResponse } from "../../../../types/chat";
import { LoadingStatus } from "../../../../types/common";

export interface ChatsState {
    items: ChatResponse[];
    loadingState: LoadingStatus;
    error?: string;
}

export interface LeaveConversationRequest {
    participantId: number;
    chatId: number;
}
