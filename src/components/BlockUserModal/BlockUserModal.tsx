import React, { FC, ReactElement } from "react";
import { Button, Dialog, DialogContent, Typography } from "@material-ui/core";
import classNames from "classnames";

import { useBlockUserModalStyles } from "./BlockUserModalStyles";
import { useTranslation } from "react-i18next";

interface BlockUserModalProps {
    username: string;
    isUserBlocked: boolean;
    visible?: boolean;
    onClose: () => void;
    onBlockUser: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const BlockUserModal: FC<BlockUserModalProps> = (
    {
        username,
        isUserBlocked,
        visible,
        onClose,
        onBlockUser
    }
): ReactElement | null => {
    const classes = useBlockUserModalStyles();
    const { t } = useTranslation();
    if (!visible) {
        return null;
    }

    return (
        <Dialog
            className={classes.dialog}
            open={visible}
            onClick={(event) => event.preventDefault()}
            onClose={onClose}
        >
            <DialogContent>
                <Typography variant={"h5"} component={"div"}>
                    {isUserBlocked ? t("unblock") : t("block")} @{username}
                </Typography>
                <Typography variant={"subtitle1"} component={"div"} className={classes.text}>
                    {isUserBlocked ? (
                        t("block_modal_text1")
                    ) : (
                        `They will not be able to follow you or view your Tweets, and you will not see Tweets or notifications from @${username}.`
                    )}
                </Typography>
                <Button
                    className={
                        classNames(
                            classes.containedButton,
                            isUserBlocked ? classes.unblockButton : classes.blockButton
                        )
                    }
                    onClick={onBlockUser}
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                >
                    {isUserBlocked ? t("unblock") : t("block")}
                </Button>
                <Button
                    onClick={onClose}
                    color="primary"
                    variant="outlined"
                    size="large"
                    fullWidth
                >
                    {t("cancel")}
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default BlockUserModal;
