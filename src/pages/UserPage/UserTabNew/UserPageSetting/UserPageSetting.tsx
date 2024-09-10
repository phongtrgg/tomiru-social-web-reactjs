import React, { memo, ReactElement, useState } from "react";
import { ClickAwayListener, List, ListItem, ListItemIcon, ListItemText, Switch } from "@material-ui/core";
import { useClickAway } from "../../../../hook/useClickAway";
import ActionIconButton from "../../../../components/ActionIconButton/ActionIconButton";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PasswordIcon from "@mui/icons-material/Password";
import BorderColorIcon from "@mui/icons-material/BorderColor";

import { useUserPageSettingStyles } from "./UserPageSettingStyle";
import { EditIcon } from "../../../../icons";
import EditProfileModalNew from "../../EditProfileButton/EditProfileModal/EditProfileModalNew";
import { Link } from "react-router-dom";

const UserPageSetting = memo((): ReactElement => {
    const classes = useUserPageSettingStyles();
    const { open, onClickOpen, onClickClose } = useClickAway();
    const [isEditProfileModalOpen, setEditProfileModalOpen] = useState(false);

    const handleEditProfileOpen = () => {
        setEditProfileModalOpen(true);
        onClickClose();
    };

    const handleEditProfileClose = () => {
        setEditProfileModalOpen(false);
    };

    return (
        <ClickAwayListener onClickAway={onClickClose}>
            <div className={classes.container}>
                <span className={classes.userPageIconButton}>
                    <ActionIconButton actionText={"More"} onClick={onClickOpen} icon={EditIcon} />
                </span>
                {open && (
                    <div className={classes.dropdown}>
                        <List>
                            <ListItem button>
                                <ListItemIcon>
                                    <HelpOutlineIcon />
                                </ListItemIcon>
                                <Link to={"/support"} style={{ textDecoration: "none" }}>
                                    <ListItemText primary="Trợ giúp và hỗ trợ" />
                                </Link>
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <PasswordIcon />
                                </ListItemIcon>
                                <Link to="/takePassword" style={{ textDecoration: "none" }}>
                                    <ListItemText primary="Đổi mật khẩu" />
                                </Link>
                            </ListItem>
                            <ListItem button onClick={handleEditProfileOpen}>
                                <ListItemIcon>
                                    <BorderColorIcon />
                                </ListItemIcon>
                                <ListItemText primary="Sửa thông tin cá nhân" />
                            </ListItem>
                            {/* <ListItem button>
                                <ListItemIcon>
                                    <ExitToAppIcon />
                                </ListItemIcon>
                                <ListItemText primary="Đăng xuất" />
                            </ListItem> */}
                            {/* <ListItem>
                                <ListItemIcon>
                                    <NightlightRoundIcon />
                                </ListItemIcon>
                                <ListItemText primary="Chế độ tối" />
                                <Switch edge="end" />
                            </ListItem> */}
                        </List>
                    </div>
                )}
                <EditProfileModalNew visible={isEditProfileModalOpen} onClose={handleEditProfileClose} />
            </div>
        </ClickAwayListener>
    );
});

export default UserPageSetting;
