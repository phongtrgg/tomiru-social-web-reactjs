import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import { ReplyType } from "../../../types/common";
import { FollowReplyIcon, MentionReplyIcon } from "../../../icons";
import { selectTweetReplyType, selectTweetAuthorFullName } from "../../../store/ducks/tweet/selectors";
import { useFullTweetStyles } from "../FullTweetStyles";
import { useTranslation } from "react-i18next";

const TweetReplyInfo = (): ReactElement => {
    const classes = useFullTweetStyles();
    const replyType = useSelector(selectTweetReplyType);
    const tweetAuthorFullName = useSelector(selectTweetAuthorFullName);
    const { t } = useTranslation();

    return (
        <>
            {(replyType === ReplyType.FOLLOW || replyType === ReplyType.MENTION) && (
                <Paper variant="outlined" className={classes.replyInfoWrapper}>
                    <div className={classes.replyInfo}>
                        <div className={classes.iconWrapper}>
                            <div className={classes.iconCircle}>
                                <span className={classes.icon}>
                                    {(replyType === ReplyType.FOLLOW) && (FollowReplyIcon)}
                                    {(replyType === ReplyType.MENTION) && (MentionReplyIcon)}
                                </span>
                            </div>
                        </div>
                        <div className={classes.replyTextInfoWrapper}>
                            <Typography variant={"h6"} component={"div"}>
                                {t("who_can_reply")}
                            </Typography>
                            <Typography variant={"body1"} component={"div"}>
                                {t("people")} @{tweetAuthorFullName}
                                {(replyType === ReplyType.FOLLOW) ? (t("follows_or")) : (" ")}
                                {t("mentioned_can_reply")}
                            </Typography>
                        </div>
                    </div>
                </Paper>
            )}
        </>
    );
};

export default TweetReplyInfo;
