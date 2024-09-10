import React, { FC, memo, ReactElement } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar, Typography } from "@material-ui/core";
import classNames from "classnames";

import { useChatMessageStyles } from "./ChatMessageStyles";
import { HOME_TWEET } from "../../../../constants/path-constants";
import { DEFAULT_PROFILE_IMG } from "../../../../constants/url-constants";
import { formatChatMessageDate, formatDate } from "../../../../util/format-date-helper";
import { textFormatter } from "../../../../util/text-formatter";
import { CheckIcon } from "../../../../icons";
import { ChatMessageResponse, ChatResponse } from "../../../../types/chat";
import { selectUserDataId } from "../../../../store/ducks/user/selectors";
import {
    selectChatFirstParticipantAvatar,
    selectChatSecondParticipantAvatar,
    selectChatSecondParticipantId
} from "../../../../store/ducks/chat/selectors";
import { useTranslation } from "react-i18next";

interface ChatMessageProps {
    message: ChatMessageResponse;
    isParticipantMessage: boolean;
    isGroupChat: boolean;
    chats: ChatResponse[];
}

const ChatMessage: FC<ChatMessageProps> = memo(({ message, isParticipantMessage, isGroupChat, chats }): ReactElement => {
    const classes = useChatMessageStyles({ isParticipantMessage });
    const myProfileId = useSelector(selectUserDataId);
    const chatSecondParticipantId = useSelector(selectChatSecondParticipantId);
    const chatFirstParticipantAvatar = useSelector(selectChatFirstParticipantAvatar);
    const chatSecondParticipantAvatar = useSelector(selectChatSecondParticipantAvatar);
    const { t } = useTranslation();
    
    const sender = isGroupChat 
        ? chats.flatMap(chat => chat.participants).find(participant => participant.user.id === message.author.id) 
        : null;

    const avatarSrc = isGroupChat && sender 
        ? sender.user.avatar 
        : (myProfileId === chatSecondParticipantId) 
            ? chatFirstParticipantAvatar 
            : chatSecondParticipantAvatar;

    return (
        <>
            <div className={classes.chatMessageContainer}>
                {isParticipantMessage && (
                    <Avatar className={classes.participantAvatar} src={avatarSrc} />
                )}
                <div>
                    {message.tweet && (
                        message.tweet.isDeleted ? (
                            <div>{t("tweet_deleted")}</div>
                        ) : (
                            <div className={classes.tweetContainer}>
                                <Link to={`${HOME_TWEET}/${message.tweet.id}`}>
                                    <div className={classes.tweetWrapper}>
                                        <div className={classes.tweetUserInfoWrapper}>
                                            <Avatar
                                                className={classes.tweetAvatar}
                                                src={message.tweet?.author.avatar ?? DEFAULT_PROFILE_IMG}
                                            />
                                            <Typography variant={"h6"} component={"span"}>
                                                {message.tweet?.author.fullName}
                                            </Typography>
                                            <Typography
                                                variant={"subtitle1"}
                                                component={"span"}
                                                className={classes.tweetUsername}
                                            >
                                                @{message.tweet?.author.username}
                                            </Typography>
                                            <Typography
                                                variant={"subtitle1"}
                                                component={"span"}
                                                className={classes.tweetUsername}
                                            >·</Typography>
                                            <Typography
                                                variant={"subtitle1"}
                                                component={"span"}
                                                className={classes.tweetUsername}
                                            >
                                                {formatDate(new Date(message.tweet?.createdAt!))}
                                            </Typography>
                                        </div>
                                        <Typography variant={"body1"} component={"span"}>
                                            {textFormatter(message.tweet?.text)}
                                        </Typography>
                                    </div>
                                </Link>
                            </div>
                        )
                    )}
                    {message.text && (
                        <div className={classNames(
                            classes.myMessage,
                            message.tweet
                                ? classes.myMessageWithTweet    
                                : classes.myMessageCommon
                        )}>
                            {isGroupChat && sender && sender.user.id !== myProfileId && (
                                <div className={classes.senderName}>
                                    {sender.user.fullName}
                                </div>
                            )}
                            <Typography component={"span"}>
                                {textFormatter(message.text)}
                            </Typography>
                        </div>
                    )}
                </div>
            </div>
            <div className={classes.myMessageDate}>
                {!isParticipantMessage && <span>{CheckIcon}</span>}
                <Typography variant={"subtitle2"} component={"span"}>   
                    {formatChatMessageDate(new Date(message.createdAt))}
                </Typography>
            </div>
        </>
    );
});

export default ChatMessage;
