import React, { FC, memo, ReactElement, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { Avatar, ListItem, Typography } from "@material-ui/core";
import { useChatParticipantStyles } from "./ChatParticipantStyles";
import { DEFAULT_PROFILE_IMG } from "../../../constants/url-constants";
import { ChatResponse } from "../../../types/chat";
import { selectUserDataId } from "../../../store/ducks/user/selectors";
import { selectChatMembersById } from "../../../store/ducks/chats/selectors";
import { RootState } from "../../../store/store";


interface ChatParticipantProps {
    chat: ChatResponse;
    participantUserId?: number;
    handleListItemClick: (chat: ChatResponse) => void;
    chatId?: number;
}

const ChatParticipant: FC<ChatParticipantProps> = memo((
    {
        chat,
        participantUserId,
        handleListItemClick,
        chatId
    }
): ReactElement => {
    const classes = useChatParticipantStyles();
    const myProfileId = useSelector(selectUserDataId);
    const isParticipantSelected = chat.participants.findIndex((participant) => participant.user.id === participantUserId) !== -1;

    const isGroupChat = chat.participants.length > 2;
    
    const renderGroupParticipants = () => {
        const nameGroup = chat.chatName
        return (
            <div className={classes.groupChatInfo}>
                <Typography variant="h6" component="span">
                    {nameGroup}
                </Typography>           
            </div>
        );
    };

    const renderSingleParticipant = () => {
        const isMyProfile = myProfileId === chat.participants[1].user.id;

        return (
            <div className={classes.userWrapper}>
                <Avatar
                    className={classes.userAvatar}
                    src={(isMyProfile) ? (
                        chat.participants[0].user.avatar ?? DEFAULT_PROFILE_IMG
                    ) : (
                        chat.participants[1].user.avatar ?? DEFAULT_PROFILE_IMG
                    )}
                />
                <div>
                    <Typography variant={"h6"} component={"span"}>
                        {(isMyProfile) ? (
                            chat.participants[0].user.fullName
                        ) : (
                            chat.participants[1].user.fullName
                        )}
                    </Typography>
                </div>
            </div>
        );
    };

    useLayoutEffect(() => {
        handleListItemClick(chat)
    }, []);

    return (
        <ListItem
            className={classes.listItem}
            id={isParticipantSelected ? "selected" : ""}
            selected={isParticipantSelected}
            onClick={() => handleListItemClick(chat)}
            button
        >
            {isGroupChat ? (
                <div className={classes.userWrapper}>
                    <div>
                    <Avatar
                        className={classes.userAvatarMain}
                        src={chat.participants[0].user.avatar ?? DEFAULT_PROFILE_IMG}
                    />
                    <Avatar
                        className={classes.userAvatarFriend}
                        src={chat.participants[1].user.avatar ?? DEFAULT_PROFILE_IMG}
                    />
                    </div>
                   
                    {renderGroupParticipants()}
                </div>
            ) : (
                renderSingleParticipant()
            )}
        </ListItem>
    );
});

export default ChatParticipant;
