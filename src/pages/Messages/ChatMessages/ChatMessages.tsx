import React, { FC, ReactElement, useEffect, useRef, useState } from "react";
import { Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";

import { useChatMessagesStyles } from "./ChatMessagesStyles";
import { useGlobalStyles } from "../../../util/globalClasses";
import { selectChatMessagesItems, selectIsChatMessagesLoading } from "../../../store/ducks/chatMessages/selectors";
import { selectUserDataId } from "../../../store/ducks/user/selectors";
import Spinner from "../../../components/Spinner/Spinner";
import EmptyChatMessages from "./EmptyChatMessages/EmptyChatMesseges";
import ChatHeader from "./ChatHeader/ChatHeader";
import ChatMessage from "./ChatMessage/ChatMessage";
import ChatUserBlocked from "./ChatUserBlocked/ChatUserBlocked";
import ChatFooter from "./ChatFooter/ChatFooter";
import { fetchChatMessages, resetChatMessages } from "../../../store/ducks/chatMessages/actionCreators";
import { fetchReadMessages } from "../../../store/ducks/user/actionCreators";
import { fetchChatParticipant } from "../../../store/ducks/userProfile/actionCreators";
import { selectUserProfile } from "../../../store/ducks/userProfile/selectors";
import { fetchChat } from "../../../store/ducks/chat/actionCreators";
import { RootState } from "../../../store/store";
import { selectBackgroundChatsGroup } from "../../../store/ducks/chats/selectors";
import { ChatResponse } from "../../../types/chat";

interface ChatMessagesProps {
    participantId?: number;
    chatId?: number;
    isGroupChat: boolean;
    chats: ChatResponse[];
}

const ChatMessages: FC<ChatMessagesProps> = React.memo(
    ({ participantId, chatId, isGroupChat, chats }): ReactElement => {
        const globalClasses = useGlobalStyles({});
        const classes = useChatMessagesStyles();
        const dispatch = useDispatch();
        const myProfileId = useSelector(selectUserDataId);
        const chatParticipant = useSelector(selectUserProfile);
        const messages = useSelector(selectChatMessagesItems);
        const isChatMessagesLoading = useSelector(selectIsChatMessagesLoading);
        const chatEndRef = useRef<HTMLDivElement>(null);
        const currentChat = chats.find((chat) => chat.id === chatId);
        const currentBackground = useSelector((state: RootState) => selectBackgroundChatsGroup(state, chatId));
        const [urlBackground, setUrlBackground] = useState<string | undefined>(undefined);

        useEffect(() => {
            if (currentChat) {
                setUrlBackground(currentChat.backGround);
            }
        }, [currentChat]);
        useEffect(() => {
            if (currentBackground) {
                setUrlBackground(currentBackground);
            }
        }, [currentBackground]);
        useEffect(() => {
            if (chatId && participantId) {
                dispatch(fetchChat(chatId));
                dispatch(fetchChatParticipant({ participantId, chatId }));
                dispatch(fetchChatMessages(chatId));
                dispatch(fetchReadMessages(chatId));
            }

            return () => {
                dispatch(resetChatMessages());
            };
        }, [chatId, participantId]);

        useEffect(() => {
            if (chatEndRef.current) {
                chatEndRef.current.scrollIntoView({ behavior: "smooth" });
            }
        }, [messages]);
        console.log(messages);
        console.log(myProfileId);
        return (
            <Paper className={classnames(globalClasses.pageContainer, classes.chatContainer)} variant="outlined">
                {!participantId && !chatId ? (
                    <EmptyChatMessages />
                ) : (
                    <>
                        <ChatHeader isGroupChat={isGroupChat} chats={chats} chatId={chatId} />
                        <Paper className={classes.chat} style={{ backgroundImage: `url(${urlBackground})` }}>
                            {isChatMessagesLoading ? (
                                <Spinner paddingTop={150} />
                            ) : (
                                <>
                                    {messages.map((message) => (
                                        <ChatMessage
                                            key={message.id}
                                            message={message}
                                            isParticipantMessage={message.author.id !== myProfileId}
                                            isGroupChat={isGroupChat}
                                            chats={chats}
                                        />
                                    ))}
                                    <div ref={chatEndRef} />
                                </>
                            )}
                        </Paper>
                        <>
                            {chatParticipant?.isUserBlocked ? (
                                <ChatUserBlocked />
                            ) : (
                                <ChatFooter chatId={chatId!} isGroupChat={isGroupChat} />
                            )}
                        </>
                    </>
                )}
            </Paper>
        );
    }
);

export default ChatMessages;
