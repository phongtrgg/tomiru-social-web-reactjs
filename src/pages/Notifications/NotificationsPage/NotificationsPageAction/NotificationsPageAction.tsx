import React, { ReactElement } from "react";

import { ClickAwayListener, List, Typography } from "@material-ui/core";
import { useNotificationsPageStylesActionStyles } from "./NotificationsPageStylesAction";

import { useClickAway } from "../../../../hook/useClickAway";
import PageHeaderWrapper from "../../../../components/PageHeaderWrapper/PageHeaderWrapper";
import ActionIconButton from "../../../../components/ActionIconButton/ActionIconButton";
import { EditIcon } from "../../../../icons";
import SettingNotificationsButton from "../NotificationsPageButton/SettingNotificationsButton/SettingNotificationsButton";
import ReadAllButton from "../NotificationsPageButton/ReadAllButton/ReadAllButton";
import classnames from "classnames";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectNotificationsList } from "../../../../store/ducks/notifications/selectors";

const NotificationsPageAction = (): ReactElement => {
    const classes = useNotificationsPageStylesActionStyles();
    const notifications = useSelector(selectNotificationsList);
    const notReadNotifications = notifications.filter((n) => !n.read);
    const count = notReadNotifications.length;
    const { open, onClickOpen, onClickClose } = useClickAway();
    const { t } = useTranslation();
    return (
        <PageHeaderWrapper backButton>
            <Typography variant="h5" component={"div"}>
                {t("notifications")}
            </Typography>

            <div className={classes.iconGroup}>
                <div className={classes.icon}>
                    <ClickAwayListener onClickAway={onClickClose}>
                        <div>
                            <ActionIconButton onClick={onClickOpen} actionText={"More"} icon={EditIcon} />
                            {open && (
                                <div className={classnames(classes.dropdown)}>
                                    <List>
                                        <SettingNotificationsButton />
                                        {count === 0 || count === undefined ? null : (
                                            <ReadAllButton close={onClickClose} />
                                        )}
                                    </List>
                                </div>
                            )}
                        </div>
                    </ClickAwayListener>
                </div>
            </div>
        </PageHeaderWrapper>
    );
};

export default NotificationsPageAction;
