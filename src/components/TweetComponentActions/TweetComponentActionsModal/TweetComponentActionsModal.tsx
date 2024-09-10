import React, { FC, ReactElement } from "react";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";

import { useTweetComponentActionsModalStyles } from "./TweetComponentActionsModalStyles";
import { useTranslation } from "react-i18next";

interface TweetComponentActionsModalProps {
    modalTitle: string;
    isTweetPinned?: boolean;
    visibleTweetComponentActionsModal: boolean;
    onCloseTweetComponentActionsModal: () => void;
    onClick: () => void;
}

const TweetComponentActionsModal: FC<TweetComponentActionsModalProps> = ({
    modalTitle,
    isTweetPinned,
    visibleTweetComponentActionsModal,
    onCloseTweetComponentActionsModal,
    onClick
}): ReactElement => {
    const { t } = useTranslation();
    const classes = useTweetComponentActionsModalStyles({ modalTitle });

    return (
        <Dialog open={visibleTweetComponentActionsModal} onClose={onCloseTweetComponentActionsModal}>
            <DialogContent style={{ padding: 0 }}>
                <div className={classes.modalWrapper}>
                    <Typography variant={"h5"}>
                        {modalTitle === "Delete"
                            ? t("delete-post")
                            : isTweetPinned
                            ? "Unpin Tweet from profile?"
                            : "Pin Tweet to profile?"}
                    </Typography>
                    <Typography variant={"subtitle1"}>
                        {modalTitle === "Delete"
                            ? t("warning-delete-post")
                            : isTweetPinned
                            ? "This will no longer appear automatically at the top of your profile."
                            : "This will appear at the top of your profile and replace any previously pinned Tweet."}
                    </Typography>
                    <div className={classes.modalButtonWrapper}>
                        <Button
                            className={classes.modalCancelButton}
                            onClick={onCloseTweetComponentActionsModal}
                            variant="contained"
                            size="large"
                        >
                            {t("cancel")}
                        </Button>
                        <Button
                            className={modalTitle === "Delete" ? classes.modalDeleteButton : classes.modalPrimaryButton}
                            onClick={onClick}
                            variant="contained"
                            size="large"
                        >
                            {/* {modalTitle === "Delete" ? "Xóa" : isTweetPinned ? "Unpin" : "Pin"} */}
                            {t("delete")}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default TweetComponentActionsModal;
