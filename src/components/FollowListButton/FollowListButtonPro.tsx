import React, { FC, ReactElement, useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Button, colors, Modal } from "@material-ui/core";

import { useFollowListButtonStyles } from "./FollowListButtonStyles";
import { followList, unfollowList } from "../../store/ducks/lists/actionCreators";
import { useTranslation } from "react-i18next";

interface FollowListButtonProps {
    listId: number;
    isFollower: boolean;
}

const FollowListButtonPro: FC<FollowListButtonProps> = (): ReactElement => {
    const classes = useFollowListButtonStyles();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [btnText, setBtnText] = useState<string>(t("following"));
    const [isFollower, setIsFollower] = useState(false);

    const onSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        event.preventDefault();
        event.stopPropagation();

        if (isFollower) {
            console.log("1");
            setBtnText(t("follow"));
        } else {
            console.log("2");
            setBtnText(t("following"));
        }
        setIsFollower(!isFollower);
        setOpen(false);
    };

    const handleClick = () => {
        setIsFollower(!isFollower);
    };
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        if (isFollower) {
            setBtnText(t("following"));
            setIsFollower(!isFollower);
        }
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const style = {
        padding: "50px",
        position: "absolute" as "absolute",
        top: "40%",
        left: "50%",
        height: 180,
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        borderRadius: 30,
        boxShadow: 24,
        pt: 1,
        px: 4,
        pb: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    };
    return (
        <>
            <Button
                className={classes["listOutlinedButton"]}
                onClick={handleOpen}
                variant={"contained"}
                color="primary"
                size="small"
            >
                {t(btnText)}
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style }}>
                    <div>
                        <h2 style={{ marginBottom: "10px" }}>{t("unfollow")}</h2>
                        <p style={{ color: "#878787", marginBottom: "10px" }}>{t("warning-unfollow")}</p>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <Button
                                onClick={handleClose}
                                style={{ color: "black", border: "1px solid #878787", padding: "5px 40px" }}
                            >
                                {t("cancel")}
                            </Button>
                            <Button
                                onClick={onSubmit}
                                style={{ color: "#ffff", backgroundColor: "#E03C39", padding: "5px 30px" }}
                            >
                                {t("unfollow")}
                            </Button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </>
    );
};

export default FollowListButtonPro;
