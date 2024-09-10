import React, { FC, memo, ReactElement } from "react";
import { List, Typography } from "@material-ui/core";

import { useChangeReplyWindowStyles } from "./ChangeReplyWindowStyles";
import { EveryoneReplyOutlinedIcon, FollowReplyOutlinedIcon, MentionReplyOutlinedIcon } from "../../icons";
import { ReplyType } from "../../types/common";
import ChangeReplyWindowComponent from "./ChangeReplyWindowComponent/ChangeReplyWindowComponent";
import { useTranslation } from "react-i18next";

interface ChangeReplyWindowProps {
    replyType: ReplyType;
    onChangeTweetReplyType: (replyType: ReplyType) => void;
}

const ChangeReplyWindow: FC<ChangeReplyWindowProps> = memo(({ replyType, onChangeTweetReplyType }): ReactElement => {
    const classes = useChangeReplyWindowStyles();
    const { t } = useTranslation();

    return (
        <div className={classes.dropdown}>
            <div className={classes.infoWrapper}>
                <Typography variant={"h6"} component={"div"}>
                    {t("who_can_see_this_post")}
                </Typography>
                {/* <Typography variant={"subtitle1"} component={"div"}>
                    Choose who can reply to this Tweet. Anyone mentioned can always reply.
                </Typography> */}
            </div>
            <List component="nav" style={{padding: "0 10px"}}>
                <ChangeReplyWindowComponent
                    replyType={replyType}
                    replyTypeIcon={EveryoneReplyOutlinedIcon}
                    replyTypeTitle={t("public")}
                    currentReplyType={ReplyType.EVERYONE}
                    onChangeTweetReplyType={onChangeTweetReplyType}
                />
                <ChangeReplyWindowComponent
                    replyType={replyType}
                    replyTypeIcon={FollowReplyOutlinedIcon}
                    replyTypeTitle={t("friend")}
                    currentReplyType={ReplyType.FOLLOW}
                    onChangeTweetReplyType={onChangeTweetReplyType}
                />
                <ChangeReplyWindowComponent
                    id={"lastItem"}
                    replyType={replyType}
                    replyTypeIcon={MentionReplyOutlinedIcon}
                    replyTypeTitle={t("only_me")}
                    currentReplyType={ReplyType.MENTION}
                    onChangeTweetReplyType={onChangeTweetReplyType}
                />
            </List>
        </div>
    );
});

export default ChangeReplyWindow;
