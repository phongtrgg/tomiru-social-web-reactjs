import React, { FC, memo, ReactElement } from "react";
import { useDispatch } from "react-redux";
import { ListItem, Typography } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";

import { useNotificationsPageStylesActionStyles } from "../../../NotificationsPageAction/NotificationsPageStylesAction";
import { useModalWindow } from "../../../../../../hook/useModalWindow";
import { useTranslation } from "react-i18next";
import { fetchDeleteNotification } from "../../../../../../store/ducks/notifications/actionCreators";
interface RemoveActionButton {
    id: number;
    close: () => void;
}

const RemoveActionButton: FC<any> = memo(({ close, id }): ReactElement => {
    const classes = useNotificationsPageStylesActionStyles();
    const dispatch = useDispatch();
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();
    const { t } = useTranslation();
    const clickDelete = () => {
        dispatch(fetchDeleteNotification(id));
        close();
    };
    return (
        <>
            <ListItem id={"delete"} onClick={clickDelete} className={classes.itemNotifi}>
                {<DeleteIcon className={classes.iconColor} />}
                <Typography variant={"body1"} component={"span"}>
                    {t("delete-this-notification")}
                </Typography>
            </ListItem>
        </>
    );
});

export default RemoveActionButton;
