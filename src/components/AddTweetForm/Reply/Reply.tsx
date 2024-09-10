import React, { FC, memo, ReactElement } from "react";
import { Divider, Popover } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";

import { useReplyStyles } from "./ReplyStyles";
import { EveryoneReplyIcon, FollowReplyIcon, MentionReplyIcon } from "../../../icons";
import ChangeReplyWindow from "../../ChangeReplyWindow/ChangeReplyWindow";
import { ReplyType } from "../../../types/common";
import { usePopup } from "../../../hook/usePopup";
import { selectReplyType } from "../../../store/ducks/addTweetForm/selector";
import { setReplyType } from "../../../store/ducks/addTweetForm/actionCreators";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useTranslation } from "react-i18next";
interface ReplyProps {
    isUnsentTweet: boolean;
}

const Reply: FC<ReplyProps> = memo(({ isUnsentTweet }): ReactElement => {
    const classes = useReplyStyles();
    const dispatch = useDispatch();
    const replyType = useSelector(selectReplyType);
    const { popoverId, anchorEl, openPopover, handleOpenPopup, handleClosePopup } = usePopup();
    const { t } = useTranslation();
    
    const handleListItemClick = (reply: ReplyType): void => {
        dispatch(setReplyType(reply));
        handleClosePopup();
    };

    return (
        <>
            <div className={classes.reply}>
                <Button color="primary" disabled={isUnsentTweet} variant="text">
                    <span>
                        {replyType === ReplyType.EVERYONE && EveryoneReplyIcon}
                        {replyType === ReplyType.FOLLOW && FollowReplyIcon}
                        {replyType === ReplyType.MENTION && MentionReplyIcon}
                    </span>
                    <span>
                        {replyType === ReplyType.EVERYONE && t("public")}
                        {replyType === ReplyType.FOLLOW && t("friend")}
                        {replyType === ReplyType.MENTION && t("only_me")}
                    </span>
                    <span onClick={handleOpenPopup}>
                        <KeyboardArrowDownIcon />
                    </span>
                </Button>
            </div>
            <Popover
                id={popoverId}
                className={classes.popover}
                open={openPopover}
                anchorEl={anchorEl}
                onClose={handleClosePopup}
            >
                <ChangeReplyWindow replyType={replyType} onChangeTweetReplyType={handleListItemClick} />
            </Popover>
        </>
    );
});

export default Reply;
