import React, { FC, ReactElement } from "react";
import { Paper, Popover } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { Picker } from "emoji-mart";

import { EmojiIcon, GifIcon, MediaIcon, SendMessageIcon } from "../../../../icons";
import { MessageInput } from "../../MessageInput/MessageInput";
import { useChatFooterStyles } from "./ChatFooterStyles";
import { addChatGroupMessage, addChatMessage } from "../../../../store/ducks/chatMessages/actionCreators";
import ActionIcon from "../../ActionIcon/ActionIcon";
import { usePopup } from "../../../../hook/usePopup";
import { useInputText } from "../../../../hook/useInputText";
import { useTranslation } from "react-i18next";

interface ChatFooterProps {
    chatId: number;
    isGroupChat: boolean;
}

const ChatFooter: FC<ChatFooterProps> = ({ chatId, isGroupChat }): ReactElement => {
    const classes = useChatFooterStyles();
    const dispatch = useDispatch();
    const { text, setText, handleChangeText, addEmoji, textConverter } = useInputText();
    const { popoverId, anchorEl, openPopover, handleOpenPopup, handleClosePopup } = usePopup();
    const { t } = useTranslation();

    const onSendMessage = (): void => {
        if (text !== "") {
            const messagePayload = {
                chatId: chatId,
                text: textConverter()
            };

            if (isGroupChat) {
                // Gọi API cho cuộc hội thoại nhóm
                dispatch(addChatGroupMessage(messagePayload)); // Gọi action để gửi tin nhắn nhóm
            } else {
                // Gọi API cho cuộc hội thoại cá nhân
                dispatch(addChatMessage(messagePayload));
            }

            setText("");
        }
    };

    return (
        <Paper className={classes.chatFooter}>
            <ActionIcon actionText={""} className={"chatIcon"} icon={MediaIcon} positionTop />
            <ActionIcon actionText={""} className={"chatIcon"} icon={GifIcon} positionTop />
            <MessageInput
                multiline
                value={text}
                onChange={handleChangeText}
                variant="outlined"
                placeholder={t("start_a_new_message")}
            />
            <div id={"handleOpenPopup"} onClick={handleOpenPopup}>
                <ActionIcon actionText={""} className={"emojiIcon"} icon={EmojiIcon} positionTop />
            </div>
            <div style={{ marginLeft: 8 }}>
                <ActionIcon
                    onClick={onSendMessage}
                    actionText={""}
                    className={"chatIcon"}
                    icon={SendMessageIcon}
                    disabled={text.length === 0}
                    positionTop
                />
            </div>
            <Popover
                id={popoverId}
                open={openPopover}
                anchorEl={anchorEl}
                onClose={handleClosePopup}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Picker title="" emoji="wave" onSelect={addEmoji} set="twitter" />
            </Popover>
        </Paper>
    );
};

export default ChatFooter;
