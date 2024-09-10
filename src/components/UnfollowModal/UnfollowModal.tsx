import React, { FC, ReactElement } from "react";
import DialogContent from "@material-ui/core/DialogContent";
import { Button, Typography } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";

import { useUnfollowModalStyles } from "./UnfollowModalStyles";
import { useTranslation } from "react-i18next";

interface UnfollowModalProps {
    fullName: string;
    infoText?: string;
    visible?: boolean;
    onClose: () => void;
    handleUnfollow: () => void;
}

const UnfollowModal: FC<UnfollowModalProps> = (
    {
        fullName,
        infoText,
        visible,
        onClose,
        handleUnfollow
    }
): ReactElement | null => {
    const classes = useUnfollowModalStyles();
    const { t } = useTranslation();
    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        event.stopPropagation();
    };

    if (!visible) {
        return null;
    }

    return (
        <Dialog open={visible} onClose={onClose} onClick={(event) => handleClick(event)}>
            <DialogContent style={{ padding: 0 }}>
                <div className={classes.modalWrapper}>
                    <Typography variant={"h5"} component={"div"}>
                        {t("unfollow")} {fullName}?
                    </Typography>
                    <Typography variant={"subtitle1"} component={"div"}>
                        {infoText ?? t("text_in_modal_follow")}
                    </Typography>
                    <div className={classes.modalButtonWrapper}>
                        <Button
                            className={classes.modalCancelButton}
                            onClick={onClose}
                            variant="contained"
                            size="large"
                        >
                            {t("cancel")}
                        </Button>
                        <Button
                            onClick={handleUnfollow}
                            variant="contained"
                            color="primary"
                            size="large"
                        >
                            {t("unfollow")}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default UnfollowModal;
