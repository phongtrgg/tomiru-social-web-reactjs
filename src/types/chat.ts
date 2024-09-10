export interface ChatResponse {
    id: number;
    createdAt: string;
    participants: ParticipantResponse[];
    chatName?: any;
    backGround?: string;
}

export interface ParticipantResponse {
    isLeftChat: boolean;
    user: {
        id: number;
        fullName: string;
        username: string;
        avatar: string;
        isMutedDirectMessages: boolean;
        isUserBlocked: boolean;
        isMyProfileBlocked: boolean;
    };
}

export interface ChatMessageResponse {
    id: number;
    text: string;
    createdAt: string;
    tweet: {
        id: number;
        text: string;
        createdAt: string;
        isDeleted: boolean;
        author: {
            id: number;
            fullName: string;
            username: string;
            avatar: string;
        };
    };
    author: {
        id: number;
    };
    chat: {
        id: number;
    };
}
