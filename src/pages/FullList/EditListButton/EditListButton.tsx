import React, { ReactElement } from "react";
import { Button } from "@material-ui/core";

import { useEditListButtonStyles } from "./EditListButtonStyles";
import EditListModal from "./EditListModal/EditListModal";
import { useModalWindow } from "../../../hook/useModalWindow";
import { useTranslation } from "react-i18next";

const EditListButton = (): ReactElement => {
    const classes = useEditListButtonStyles();
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();
    const { t } = useTranslation();
    return (
        <>
            <Button
                className={classes.listOutlinedButton}
                onClick={onOpenModalWindow}
                variant="outlined"
                color="primary"
                size="small"
            >
                {t("edit_list")}
            </Button>
            <EditListModal visible={visibleModalWindow} onClose={onCloseModalWindow} />
        </>
    );
};

export default EditListButton;
