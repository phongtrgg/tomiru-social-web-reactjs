import React, { memo, ReactElement } from "react";
import { useSelector } from "react-redux";
import classnames from "classnames";
import { Avatar, Paper, Typography } from "@material-ui/core";

import { DEFAULT_PROFILE_IMG } from "../../../../constants/url-constants";
import { useGlobalStyles } from "../../../../util/globalClasses";
import { useChatHeaderStyles } from "./ChatHeaderStyles";
import { selectUserProfile } from "../../../../store/ducks/userProfile/selectors";
import MoreSetingChatGroup from "./MoreSetingChatGroup/MoreSetingChatGroup";
import MoreSeting from "./MoreSetingHeader/MoreSeting";
import { ChatResponse, ParticipantResponse } from "../../../../types/chat";
import { selectChatGroupName } from "../../../../store/ducks/chats/selectors";
import { RootState } from "../../../../store/store";

interface ChatHeaderProps {
    isGroupChat: boolean;
    chats?: ChatResponse[];
    chatId?: number;
}

const ChatHeader = memo(({ isGroupChat, chats, chatId }: ChatHeaderProps): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useChatHeaderStyles();
    const chatParticipant = useSelector(selectUserProfile);
    const currentChat = chats?.find((chat) => chat.id === chatId);

    const chatNameGroup = useSelector((state: RootState) => selectChatGroupName(state, chatId));

    return (
        <Paper className={classnames(globalClasses.pageHeader, classes.chatHeader)}>
            {isGroupChat ? (
                <div className={classes.userWrapper}>
                    <Avatar
                        className={classes.userAvatarMain}
                        src={currentChat?.participants[0].user.avatar ?? DEFAULT_PROFILE_IMG}
                    />
                    <Avatar
                        className={classes.userAvatarFriend}
                        src={currentChat?.participants[1].user.avatar ?? DEFAULT_PROFILE_IMG}
                    />
                </div>
            ) : (
                <Avatar className={classes.chatAvatar} src={chatParticipant?.avatar ?? DEFAULT_PROFILE_IMG} />
            )}
            <div style={{ flex: 1 }}>
                <Typography variant="h5">
                    {/* Sử dụng chatName nếu là nhóm */}
                    {isGroupChat ? chatNameGroup : chatParticipant?.fullName}
                </Typography>
                {/* <Typography variant="subtitle2" component={"div"}>
                    @{chatParticipant?.username}
                </Typography> */}
            </div>
            {isGroupChat ? <MoreSetingChatGroup chatId={chatId} /> : <MoreSeting chatId={chatId} />}
        </Paper>
    );
});

export default ChatHeader;
