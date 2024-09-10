import React, { memo, ReactElement } from "react";
import { Button, Typography } from "@material-ui/core";

import { useStartConversationStyles } from "./StartConversationStyles";
import MessagesModal from "../MessagesModal/MessagesModal";
import { useModalWindow } from "../../../hook/useModalWindow";
import { useTranslation } from "react-i18next";

const StartConversation = memo((): ReactElement => {
    const classes = useStartConversationStyles();
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();
    const { t } = useTranslation();
    return (
        <>
            <Typography variant={"h4"} component={"div"} className={classes.messagesTitle}>
                {t("send_message_get_message")}
            </Typography>
            <Typography variant={"subtitle1"} component={"div"} className={classes.messagesText}>
                {t("direct_message_conversation")}
            </Typography>
            <Button
                onClick={onOpenModalWindow}
                className={classes.messagesButton}
                variant="contained"
                color="primary"
                size="large"
            >
                {t("start_conversation")}
            </Button>
            <MessagesModal visible={visibleModalWindow} onClose={onCloseModalWindow} />
        </>
    );
});

export default StartConversation;
