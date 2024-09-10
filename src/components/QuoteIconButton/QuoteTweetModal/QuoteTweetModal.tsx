import React, { FC, ReactElement } from "react";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";

import { useQuoteTweetModalStyles } from "./QuoteTweetModalStyles";
import AddTweetForm from "../../AddTweetForm/AddTweetForm";
import { QuoteTweetResponse } from "../../../types/tweet";
import DialogTitleComponent from "../../DialogTitleComponent/DialogTitleComponent";
import { useTranslation } from "react-i18next";

interface QuoteTweetModalProps {
    quoteTweet: QuoteTweetResponse;
    visible?: boolean;
    onClose: () => void;
}

const QuoteTweetModal: FC<QuoteTweetModalProps> = ({ quoteTweet, visible, onClose }): ReactElement | null => {
    const classes = useQuoteTweetModalStyles();
    const { t } = useTranslation();
    if (!visible) {
        return null;
    }

    return (
        <Dialog className={classes.content} open={visible} onClose={onClose}>
            <DialogTitleComponent onClose={onClose} />
            <DialogContent className={classes.dialogContent}>
                <AddTweetForm
                    quoteTweet={quoteTweet}
                    minRows={1}
                    title={t("add_comment")}
                    buttonName={"Tweet"}
                    onCloseModal={onClose}
                />
            </DialogContent>
        </Dialog>
    );
};

export default QuoteTweetModal;
