import React, { FC, memo, ReactElement, useState } from "react";
import { useDispatch } from "react-redux";
import { ListItem, Typography } from "@material-ui/core";
import { useModalWindow } from "../../../../../hook/useModalWindow";
import { CheckIconNoti, EditIcon } from "../../../../../icons";
import SettingsIcon from "@mui/icons-material/Settings";
import classNames from "classnames";
import { useNotificationsPageStylesActionStyles } from "../../NotificationsPageAction/NotificationsPageStylesAction";
import NotificationSettingModal from "../../NotificationsPageModal/NotificationSettingModal";
import { useTranslation } from "react-i18next";
interface SettingNotificationsButton {
    tweetId: number;
    addressedTweetId?: number;
    onCloseActionsDropdown: () => void;
}

const SettingNotificationsButton: FC<any> = memo(
    ({ tweetId, addressedTweetId, onCloseActionsDropdown }): ReactElement => {
        const { t } = useTranslation();
        const classes = useNotificationsPageStylesActionStyles();
        const dispatch = useDispatch();
        const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();

        return (
            <>
                <ListItem id={"delete"} onClick={onOpenModalWindow} className={classes.itemNotifi}>
                    {<SettingsIcon className={classes.iconColor} />}
                    <Typography variant={"body1"} component={"span"}>
                        {t("notification-setting")}
                    </Typography>
                </ListItem>
                <NotificationSettingModal
                    modalTitle={"Delete"}
                    visibleTweetComponentActionsModal={visibleModalWindow}
                    onCloseTweetComponentActionsModal={onCloseModalWindow}
                    onClick={() => {}}
                />
            </>
        );
    }
);

export default SettingNotificationsButton;
