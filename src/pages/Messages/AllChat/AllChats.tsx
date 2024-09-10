import React, { FC } from "react";
import { List } from "@material-ui/core";
import { ChatResponse } from "../../../types/chat";
import ChatParticipant from "../ChatParticipant/ChatParticipant";

interface AllChatsProps {
    chats: ChatResponse[];
    chatId?: number;
    handleListItemClick: (chat: ChatResponse) => void;
}

const AllChats: FC<AllChatsProps> = ({ chats, chatId, handleListItemClick }) => (
    <List component="nav">
        {chats.map((chat) => (
            <ChatParticipant key={chat.id} chat={chat} chatId={chatId} handleListItemClick={handleListItemClick} />
        ))}
    </List>
);

export default AllChats;
