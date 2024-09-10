import React, { memo, ReactElement } from "react";
import { useSelector } from "react-redux";
import { ListItem, Typography } from "@material-ui/core";

import { AddListsIcon } from "../../../../icons";
import { selectUserProfileId, selectUserProfileUsername } from "../../../../store/ducks/userProfile/selectors";
import ListsModal from "../../../../components/ListsModal/ListsModal";
import { useModalWindow } from "../../../../hook/useModalWindow";
import { useTranslation } from "react-i18next";

const AddUserToListsButton = memo((): ReactElement => {
    const userProfileId = useSelector(selectUserProfileId);
    const username = useSelector(selectUserProfileUsername);
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();
    const { t } = useTranslation()
    return (
        <>
            <ListItem id={"openListsModal"} onClick={onOpenModalWindow}>
                <>{AddListsIcon}</>
                <Typography component={"span"}>
                    {t("add")}/  {t("remove")} @{username}   {t("from_list")}
                </Typography>
            </ListItem>
            <ListsModal userId={userProfileId!} visible={visibleModalWindow} onClose={onCloseModalWindow} />
        </>
    );
});

export default AddUserToListsButton;
