import React, { FC, memo, ReactElement } from "react";
import { ListItem, Typography } from "@material-ui/core";

import { AddListsIcon } from "../../../icons";
import ListsModal from "../../ListsModal/ListsModal";
import { useModalWindow } from "../../../hook/useModalWindow";
import { useTranslation } from "react-i18next";

interface AddToListButtonProps {
    userId: number;
    username: string;
}

const AddToListButton: FC<AddToListButtonProps> = memo(({ userId, username }): ReactElement => {
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();
    const { t } = useTranslation();
    return (
        <>
            <ListItem id={"openListsModal"} onClick={onOpenModalWindow}>
                <>{AddListsIcon}</>
                <Typography variant={"body1"} component={"span"}>
                    {`${t("add")}/${t("remove")} @${username} ${t("from_list")}`}
                </Typography>
            </ListItem>
            <ListsModal userId={userId} visible={visibleModalWindow} onClose={onCloseModalWindow} />
        </>
    );
});

export default AddToListButton;
