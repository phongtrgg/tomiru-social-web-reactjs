import React, { FC, ReactElement, useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Button, colors, Modal } from "@material-ui/core";

import { useFollowListButtonStyles } from "./FollowListButtonStyles";
import { followList, unfollowList } from "../../store/ducks/lists/actionCreators";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

interface MemberListUserButton {
    listId: number;
    isFollower: boolean;
}

const MemberListUserButton: FC<MemberListUserButton> = (): ReactElement => {
    const classes = useFollowListButtonStyles();
    const dispatch = useDispatch();
    const [btnText, setBtnText] = useState<string>("Đang Theo  Dõi");
    const { t } = useTranslation();
    const onClickFollow = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        event.preventDefault();
        event.stopPropagation();

        if (isFollower) {
            setBtnText("Theo dõi");
        } else {
            setBtnText("Đang Theo  Dõi");
        }
    };
    const [isFollower, setIsFollower] = useState(false);

    const handleClick = () => {
        setIsFollower(!isFollower);
    };
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const style = {
        position: "absolute" as "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        height: 200,
        bgcolor: "background.paper",
        borderRadius: 30,
        boxShadow: 24,

        px: 4,
        pb: 3,
        display: "flex",

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
                {t("leave")}
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style }}>
                    <div>
                        <h2 style={{ marginBottom: "10px", fontSize: "27px" }}>{t("leave")}</h2>
                        <p style={{ color: "#878787", marginBottom: "10px" }}>{t("warning-unfollow")}</p>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <Button
                                onClick={handleClose}
                                style={{
                                    color: "black",
                                    border: "1px solid #878787",
                                    padding: "5px 40px"
                                }}
                            >
                                {t("cancel")}
                            </Button>
                            <Button
                                onClick={handleClose}
                                style={{ color: "#ffff", backgroundColor: "#E03C39", padding: "5px 30px" }}
                            >
                                {t("leave")}
                            </Button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </>
    );
};

export default MemberListUserButton;
