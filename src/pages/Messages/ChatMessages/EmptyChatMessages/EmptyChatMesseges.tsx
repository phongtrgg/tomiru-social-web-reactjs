import React, { memo, ReactElement } from "react";
import { Button, Typography } from "@material-ui/core";

import { useEmptyChatMessagesStyles } from "./EmptyChatMessagesStyles";
import { useModalWindow } from "../../../../hook/useModalWindow";
import MessagesModal from "../../MessagesModal/MessagesModal";
import { useTranslation } from "react-i18next";

const EmptyChatMessages = memo((): ReactElement => {
    const classes = useEmptyChatMessagesStyles();
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();
    const { t } = useTranslation()
    return (
        <div className={classes.chatInfoWrapper}>
            <Typography variant={"h4"} component={"div"}>
                {t("empty_chat")}
            </Typography>
            <Typography variant={"subtitle1"} component={"div"}>
                {t("choosen_message")}
            </Typography>
            <Button
                onClick={onOpenModalWindow}
                className={classes.chatInfoButton}
                variant="contained"
                color="primary"
                size="large"
            >
                {t("new_message")}
            </Button>
            <MessagesModal visible={visibleModalWindow} onClose={onCloseModalWindow} />
        </div>
    );
});

export default EmptyChatMessages;
