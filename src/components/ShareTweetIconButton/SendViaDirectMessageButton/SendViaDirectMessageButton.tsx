import React, { FC, ReactElement } from "react";
import { ListItem, Typography } from "@material-ui/core";

import { MessagesIcon } from "../../../icons";
import { useTranslation } from "react-i18next";

interface SendViaDirectMessageButtonProps {
    onClickSendViaDirectMessage: () => void;
}

const SendViaDirectMessageButton: FC<SendViaDirectMessageButtonProps> = ({ onClickSendViaDirectMessage }): ReactElement => {
    const { t } = useTranslation()
    return (
        <ListItem id={"clickSendViaDirectMessage"} onClick={onClickSendViaDirectMessage}>
            <>{MessagesIcon}</>
            <Typography variant={"body1"} component={"span"}>
                {t("send_direct_message")}
            </Typography>
        </ListItem>
    );
};

export default SendViaDirectMessageButton;
