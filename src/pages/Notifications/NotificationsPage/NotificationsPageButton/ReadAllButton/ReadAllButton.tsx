import React, { FC, memo, ReactElement } from "react";
import { useDispatch } from "react-redux";
import { ListItem, Typography } from "@material-ui/core";
import { useModalWindow } from "../../../../../hook/useModalWindow";
import { EditIcon } from "../../../../../icons";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import { useNotificationsPageStylesActionStyles } from "../../NotificationsPageAction/NotificationsPageStylesAction";
import { useTranslation } from "react-i18next";
import { markAllNotificationAsRead } from "../../../../../store/ducks/notifications/actionCreators";

interface ReadAllButton {
    close: () => void;
}

const ReadAllButton: FC<any> = memo(({ close }): ReactElement => {
    const classes = useNotificationsPageStylesActionStyles();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();
    const clickMarkAllAsRead = () => {
        dispatch(markAllNotificationAsRead());
        close();
    };

    return (
        <>
            <ListItem id={"delete"} onClick={clickMarkAllAsRead} className={classes.itemNotifi}>
                <DoneAllOutlinedIcon className={classes.iconColor} />
                <Typography variant={"body1"} component={"span"}>
                    {t("mark-all-as-read")}
                </Typography>
            </ListItem>
        </>
    );
});

export default ReadAllButton;
