import React, { FC, memo, ReactElement, useEffect, useState } from "react";

import { UserTweetResponse } from "../../../types/tweet";
import ActionIconButton from "../../ActionIconButton/ActionIconButton";
import { ReplyIcon } from "../../../icons";
import ReplyModal from "../../ReplyModal/ReplyModal";
import { Image } from "../../../types/common";
import { useReplyIconButtonStyles } from "./ReplyIconButtonStyles";
import { useModalWindow } from "../../../hook/useModalWindow";
import ListComment from "../../ListComment/ListComment";
import { tweetSaga } from "../../../store/ducks/tweet/sagas";
import { TweetApi } from "../../../services/api/tweet-service/tweetApi";

interface TweetReplyIconButtonProps {
    replies?: any;
    tweet?: any;
    tweetId?: number;
    text?: string;
    image?: Image;
    createdAt?: string;
    tweetAuthor?: UserTweetResponse;
    repliesCount?: any;
    isUserCanReply?: boolean;
    disabled?: boolean;
}

const ReplyIconButton: FC<TweetReplyIconButtonProps> = memo(
    ({ tweetId, text, image, createdAt, tweetAuthor, repliesCount, isUserCanReply, tweet, disabled }): ReactElement => {
        const classes = useReplyIconButtonStyles({ isUserCanReply });
        const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();

        const modalHandler = () => {
            if (disabled) {
                return;
            }
            onOpenModalWindow();
        };

        return (
            <div className={classes.replyIcon}>
                <ActionIconButton
                    actionText={"Reply"}
                    icon={ReplyIcon}
                    onClick={modalHandler}
                    disabled={isUserCanReply}
                />
                {repliesCount !== 0 && (
                    <span id={"repliesCount"} className={classes.repliesCount}>
                        {repliesCount}
                    </span>
                )}
                {/* phphần cũ  */}
                {/* <ReplyModal
                    author={tweetAuthor!}
                    tweetId={tweetId!}
                    text={text!}
                    image={image}
                    createdAt={createdAt!}
                    visible={visibleModalWindow}
                    onClose={onCloseModalWindow}
                /> */}
                <ListComment
                    tweet={tweet}
                    author={tweetAuthor!}
                    tweetId={tweetId!}
                    text={text!}
                    image={image}
                    createdAt={createdAt!}
                    visible={visibleModalWindow}
                    onClose={onCloseModalWindow}
                />
            </div>
        );
    }
);

export default ReplyIconButton;
