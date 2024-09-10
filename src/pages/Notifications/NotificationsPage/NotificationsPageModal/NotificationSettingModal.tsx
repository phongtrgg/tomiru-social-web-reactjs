import React, { FC, ReactElement } from "react";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import { Button, Divider, Switch } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";

import { useNotificationSettingModalStylesStyles } from "./NotificationSettingModalStyles";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MarkUnreadChatAltOutlinedIcon from "@mui/icons-material/MarkUnreadChatAltOutlined";
interface NotificationSettingModal {
    modalTitle: string;
    isTweetPinned?: boolean;
    visibleTweetComponentActionsModal: boolean;
    onCloseTweetComponentActionsModal: () => void;
    onClick: () => void;
}

const NotificationSettingModal: FC<any> = ({
    modalTitle,
    isTweetPinned,
    visibleTweetComponentActionsModal,
    onCloseTweetComponentActionsModal,
    onClick
}): ReactElement => {
    const classes = useNotificationSettingModalStylesStyles({ modalTitle });

    return (
        <Dialog open={visibleTweetComponentActionsModal} onClose={onCloseTweetComponentActionsModal}>
            <DialogContent style={{ padding: 0 }}>
                <div className={classes.modalWrapper}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            color: "black",
                            marginBottom: 10
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", color: "black" }}>
                            <SettingsIcon />
                            <span style={{ fontWeight: 500, fontSize: 20, marginLeft: 8 }}> Cài Đặt Thông Báo</span>
                        </div>

                        <CloseIcon
                            onClick={onCloseTweetComponentActionsModal}
                            sx={{ cursor: "pointer", ":hover": { backgroundColor: "rgba(0, 0, 0, 0.08)" } }}
                        />
                    </div>

                    <Divider style={{ width: "100%" }} />
                    <div style={{ marginBottom: 16 }}>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                margin: "4px 0"
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                {" "}
                                <MonetizationOnOutlinedIcon />
                                <p>Nhận thông báo TOMXU</p>
                            </div>
                            <Switch />
                        </div>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                margin: "4px 0"
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                {" "}
                                <AccountCircleOutlinedIcon />
                                <p>Nhận thông báo tài khoản</p>
                            </div>
                            <Switch />
                        </div>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                margin: "4px 0"
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                {" "}
                                <MarkUnreadChatAltOutlinedIcon />
                                <p>Nhận thông báo tương tác</p>
                            </div>
                            <Switch />
                        </div>
                    </div>

                    <div className={classes.modalButtonWrapper}>
                        <Button
                            className={classes.modalCancelButton}
                            onClick={onCloseTweetComponentActionsModal}
                            variant="contained"
                            size="large"
                        >
                            Hủy
                        </Button>
                        <Button
                            onClick={onCloseTweetComponentActionsModal}
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            Lưu
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default NotificationSettingModal;
