import React, { FC } from "react";
import { List } from "@material-ui/core";
import { ChatResponse } from "../../../types/chat";
import ChatParticipant from "../ChatParticipant/ChatParticipant";

interface GroupChatsProps {
    chats: ChatResponse[];
    chatId?: number;
    participantId?: number;
    handleListItemClick: (chat: ChatResponse) => void;
}

const GroupChats: FC<GroupChatsProps> = ({ chats, chatId, participantId, handleListItemClick }) => (
    <List component="nav">
        {chats
            .filter((chat) => chat.participants.length > 2)
            .map((chat) => (
                <ChatParticipant
                    key={chat.id}
                    chat={chat}
                    chatId={chatId}
                    participantUserId={participantId}
                    handleListItemClick={handleListItemClick}
                />
            ))}
    </List>
);

export default GroupChats;
