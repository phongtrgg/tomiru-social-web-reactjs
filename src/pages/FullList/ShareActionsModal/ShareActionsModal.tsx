import React, { ReactElement } from "react";
import { ClickAwayListener, List } from "@material-ui/core";

import { useShareActionsModalStyles } from "./ShareActionsModalStyles";
import { MessagesIcon, ShareIcon } from "../../../icons";
import ActionIconButton from "../../../components/ActionIconButton/ActionIconButton";
import { useClickAway } from "../../../hook/useClickAway";
import ShareActionsItem from "./ShareActionsItem/ShareActionsItem";
import TweetListAction from "./TweetListAction/TweetListAction";
import CopyListLinkAction from "./CopyListLinkAction/CopyListLinkAction";
import { useTranslation } from "react-i18next";

const ShareActionsModal = (): ReactElement => {
    const classes = useShareActionsModalStyles();
    const { open, onClickOpen, onClickClose } = useClickAway();
    const { t } = useTranslation();
    return (
        <ClickAwayListener onClickAway={onClickClose}>
            <div className={classes.root}>
                <ActionIconButton onClick={onClickOpen} actionText={"Share"} icon={ShareIcon} />
                {open && (
                    <div className={classes.dropdown}>
                        <List>
                            <TweetListAction />
                            <ShareActionsItem title={t("send_direct_message")} icon={MessagesIcon} />
                            <CopyListLinkAction onClickClose={onClickClose} />
                            <ShareActionsItem title={"Share List"} icon={ShareIcon} />
                        </List>
                    </div>
                )}
            </div>
        </ClickAwayListener>
    );
};

export default ShareActionsModal;
