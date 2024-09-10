import React, { FC, ReactElement, useEffect } from "react";
import { useSelector } from "react-redux";
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    List,
    ListItem,
    ListItemAvatar,
    Modal,
    Popover,
    Switch
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import {
    selectUserDataId,
    selectUserDataIsPrivateProfile,
    selectUserProfileAvatar,
    selectUserProfileFullName,
    selectUserProfileUsername
} from "../../store/ducks/user/selectors";
import { useUserSideProfileStyles } from "./UserSideProfileStyles";
import { CheckIcon, EditIcon } from "../../icons";
import LogoutModal from "./LogoutModal/LogoutModal";
import LockIcon from "../LockIcon/LockIcon";
import { usePopup } from "../../hook/usePopup";
import { Link } from "react-router-dom";
import LanguageIcon from "@mui/icons-material/Language";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useTranslation } from "react-i18next";
const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "none",
    outline: "none",
    borderRadius: "20px",
    boxShadow: 24
};
const UserSideProfile: FC = (): ReactElement | null => {
    const [open, setOpen] = React.useState(false);
    const classes = useUserSideProfileStyles();
    const myProfileId = useSelector(selectUserDataId);
    const avatar = useSelector(selectUserProfileAvatar);
    const fullName = useSelector(selectUserProfileFullName);
    const username = useSelector(selectUserProfileUsername);
    const isPrivateProfile = useSelector(selectUserDataIsPrivateProfile);
    const { popoverId, anchorEl, openPopover, handleOpenPopup, handleClosePopup } = usePopup();
    const [isOpen, setIsOpen] = React.useState(false);
    const { t, i18n } = useTranslation();
    const handleChangeLanguage = (language: any) => {
        i18n.changeLanguage(language);
        localStorage.setItem("language", language);
        setIsOpen(false);
    };
    if (!myProfileId) {
        return null;
    }

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpenTab = (e: any) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
    };

    return (
        <>
            <div aria-describedby={popoverId} onClick={handleOpenPopup} className={classes.container}>
                <Avatar alt={`avatar ${myProfileId}`} src={avatar} />
                <div className={classes.info}>
                    <Typography variant={"h6"}>
                        {fullName}
                        {isPrivateProfile && <LockIcon />}
                    </Typography>
                    <Typography variant={"subtitle1"}>@{username}</Typography>
                </div>
                <div className={classes.icon}>
                    <span>{EditIcon}</span>
                </div>
            </div>
            <Popover
                id={popoverId}
                open={openPopover}
                anchorEl={anchorEl}
                onClose={handleClosePopup}
                classes={{ paper: classes.popover }}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                transformOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <List>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar alt={`${myProfileId}`} src={avatar} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <Typography variant={"h6"} component="div">
                                    {fullName}
                                </Typography>
                            }
                            secondary={
                                <Typography variant="subtitle1" component="div">
                                    @{username}
                                </Typography>
                            }
                        />
                        <span>{CheckIcon}</span>
                    </ListItem>
                    <div className={classes.listItemWrapper}>
                        <Divider component="li" />
                        <ListItem>
                            <HelpOutlineOutlinedIcon sx={{ color: "rgb(15, 20, 25)", marginRight: "5px" }} />
                            <Link to={"/support"} style={{ textDecoration: "none" }}>
                                <Typography variant="body1" component="div">
                                    {t("help-support")}
                                </Typography>
                            </Link>
                        </ListItem>
                        <ListItem onClick={handleOpen}>
                            <MoreHorizOutlinedIcon sx={{ color: "rgb(15, 20, 25)", marginRight: "5px" }} />

                            <Typography variant="body1" component="div">
                                {t("change-password")}
                            </Typography>
                        </ListItem>
                        <ListItem onClick={handleLogout}>
                            <LogoutOutlinedIcon sx={{ color: "rgb(15, 20, 25)", marginRight: "5px" }} />
                            <Link to="/account/login" style={{ textDecoration: "none" }}>
                                <Typography variant="body1" component="div">
                                    {t("logout")}
                                </Typography>
                            </Link>
                        </ListItem>

                        <div onClick={handleOpenTab}>
                            <ListItem style={{ position: "relative" }}>
                                <LanguageIcon sx={{ color: "rgb(15, 20, 25)", marginRight: "5px" }} />
                                <div style={{ textDecoration: "none" }}>
                                    <Typography variant="body1" component="div">
                                        {t("change-language")}
                                    </Typography>
                                </div>
                                <KeyboardArrowRightIcon sx={{ color: "rgb(15, 20, 25)", marginLeft: "20px" }} />
                            </ListItem>
                            {isOpen && (
                                <div className={classes.boxLanguage}>
                                    <ListItem button onClick={() => handleChangeLanguage("vi")}>
                                        <div>{t("Vietnamese")}</div>
                                    </ListItem>
                                    <ListItem button onClick={() => handleChangeLanguage("en")}>
                                        <div>{t("English")}</div>
                                    </ListItem>
                                </div>
                            )}
                        </div>
                        {/* chế độ tối */}
                        {/* <ListItem style={{ position: "relative" }}>
                            <DarkModeOutlinedIcon sx={{ color: "rgb(15, 20, 25)", marginRight: "5px" }} />
                            <Typography variant="body1" component="div">
                                {t("dark-style")}
                            </Typography>
                            <div style={{ position: "absolute", right: 0 }}>
                                {" "}
                                <Switch defaultChecked />
                            </div>
                        </ListItem> */}

                        {/*   <Divider component="li" /> <LogoutModal /> */}
                    </div>
                </List>
            </Popover>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={{ padding: "10px 20px" }}>
                        <ListItem>
                            <HelpOutlineOutlinedIcon sx={{ color: "rgb(15, 20, 25)", marginRight: "5px" }} />
                            <Typography variant="body1" component="div">
                                {t("help-support")}
                            </Typography>
                        </ListItem>
                        <Divider />
                        <div style={{ marginTop: "20px" }}>
                            <iframe
                                style={{ borderRadius: "20px" }}
                                width={460}
                                height={315}
                                src="https://www.youtube.com/embed/zSr41KMrXVY?si=8fiOwrTQ-5jcqHAK"
                                title="YouTube video player"
                                frameBorder={0}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            />
                        </div>
                        <div>
                            <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label="Không hiển thị hướng dẫn này cho lần sau"
                            />
                        </div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                marginTop: "20px",
                                marginBottom: "20px",
                                gap: "10px"
                            }}
                        >
                            <Button variant="contained" style={{ backgroundColor: "#FFD24A", padding: "0px 40px" }}>
                                Lưu
                            </Button>
                            <Button variant="outlined" style={{ padding: "0px 40px" }} onClick={handleClose}>
                                Hủy
                            </Button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </>
    );
};

export default UserSideProfile;
