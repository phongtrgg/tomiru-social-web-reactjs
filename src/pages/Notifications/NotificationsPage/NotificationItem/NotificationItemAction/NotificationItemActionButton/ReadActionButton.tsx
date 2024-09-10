import React, { FC, memo, ReactElement } from "react";
import { useDispatch } from "react-redux";
import { ListItem, Typography } from "@material-ui/core";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNotificationsPageStylesActionStyles } from "../../../NotificationsPageAction/NotificationsPageStylesAction";
import { useModalWindow } from "../../../../../../hook/useModalWindow";

import { useTranslation } from "react-i18next";
import { markNotificationAsRead } from "../../../../../../store/ducks/notifications/actionCreators";
interface ReadActionButtonInterface {
    id: number;
    close: () => void;
}

const ReadActionButton: React.FC<ReadActionButtonInterface> = memo(({ id, close }): ReactElement => {
    const classes = useNotificationsPageStylesActionStyles();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();
    const clickMarkAsRead = () => {
        dispatch(markNotificationAsRead(id));
        close();
    };
    return (
        <>
            <ListItem onClick={clickMarkAsRead} id={"delete"} className={classes.itemNotifi}>
                {<DoneAllIcon className={classes.iconColor} />}
                <Typography variant={"body1"} component={"span"}>
                    {t("mark-as-read")}
                </Typography>
            </ListItem>
        </>
    );
});

export default ReadActionButton;
