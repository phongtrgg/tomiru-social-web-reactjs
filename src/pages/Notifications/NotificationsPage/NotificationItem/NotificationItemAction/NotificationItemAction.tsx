import React, { FC, ReactElement } from "react";

import { ClickAwayListener, List, Typography } from "@material-ui/core";

import classnames from "classnames";
import { useNotificationsPageStylesActionStyles } from "../../NotificationsPageAction/NotificationsPageStylesAction";
import { useClickAway } from "../../../../../hook/useClickAway";
import ActionIconButton from "../../../../../components/ActionIconButton/ActionIconButton";

import { EditIcon } from "../../../../../icons";
import ReadActionButton from "./NotificationItemActionButton/ReadActionButton";
import RemoveActionButton from "./NotificationItemActionButton/RemoveActionButton";
interface NotificationItemActionProps {
    id: number;
    read: boolean;
}
const NotificationItemAction: React.FC<NotificationItemActionProps> = ({ id, read }): ReactElement => {
    const classes = useNotificationsPageStylesActionStyles();

    const { open, onClickOpen, onClickClose } = useClickAway();

    return (
        <div className={classes.iconGroup}>
            <div className={classes.icon}>
                <ClickAwayListener onClickAway={onClickClose}>
                    <div>
                        <ActionIconButton onClick={onClickOpen} actionText={"More"} icon={EditIcon} />
                        {open && (
                            <div className={classnames(classes.dropdown)}>
                                <List>
                                    {read ? null : <ReadActionButton id={id} close={onClickClose} />}
                                    <RemoveActionButton id={id} close={onClickClose} />
                                </List>
                            </div>
                        )}
                    </div>
                </ClickAwayListener>
            </div>
        </div>
    );
};

export default NotificationItemAction;
