import React, { FC, ReactElement, useEffect, useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { PersonPinCircleOutlined } from "@material-ui/icons";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useChatHeaderStyles } from "../ChatHeaderStyles";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import ChatBackGroundModal from "../../ChatBackgroundModal/ChatBackgroundModal";
import Groups2Icon from "@mui/icons-material/Groups2";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import LogoutIcon from "@mui/icons-material/Logout";
import GroupMenberModal from "../../GroupMenberModal/GroupMenberModal";
import ChangeNameGroup from "../../ChangeNameGroupModal/ChangeNameGroup";
import { useDispatch, useSelector } from "react-redux";
import {
    leaveChatGroup,
    updateBackgroundChatsGroup,
    updateChatsGroupName
} from "../../../../../store/ducks/chats/actionCreators";
import { setOpenSnackBar } from "../../../../../store/ducks/actionSnackbar/actionCreators";
import LeaveChatGroupModal from "../../ChatMessage/LeaveChatGroupModal/LeaveChatGroupModal";
import { selectUserDataId } from "../../../../../store/ducks/user/selectors";
import { useTranslation } from "react-i18next";

interface MoreSetingChatGroupProps {
    chatId?: number;
}
const MoreSetingChatGroup: FC<MoreSetingChatGroupProps> = ({ chatId }): ReactElement => {
    const classes = useChatHeaderStyles();

    const [isMembersModalOpen, setIsMembersModalOpen] = React.useState(false);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isRenameModalOpen, setIsRenameModalOpen] = React.useState(false);
    const [isLeaveChatGroupModalOpen, setIsLeaveChatGroupModalOpen] = React.useState(false);
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const myProfileId = useSelector(selectUserDataId);
    const [leaveGroupIds, setLeaveGroupIds] = useState<number[]>([]);


    const handleMenuItemClick = (type: number) => {
        switch (type) {
            case 0:
                setIsRenameModalOpen(true);
                break;
            case 1:
                setIsModalOpen(true);
                break;
            case 2:
                setIsMembersModalOpen(true);
                break;
            case 3:
                setIsLeaveChatGroupModalOpen(true);
                break;
        }
        setAnchorEl(null);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const changeBackground = (selectedBackground: string) => {
        if (selectedBackground) {
            dispatch(updateBackgroundChatsGroup(chatId, selectedBackground));
            setIsModalOpen(false);
            dispatch(setOpenSnackBar("Đổi ảnh nền nhóm thành công!"));
        }
    };

    const options = [
        { type: 0, label: t("change-group-name"), icon: <BorderColorIcon className={classes.iconPerson} /> },
        { type: 1, label: t("change-background"), icon: <WallpaperIcon className={classes.iconPerson} /> },
        { type: 2, label: t("members"), icon: <Groups2Icon className={classes.iconPerson} /> },
        { type: 3, label: t("leave"), icon: <LogoutIcon className={classes.iconPerson} /> }
    ];

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMembersModalClose = () => {
        setIsMembersModalOpen(false);
    };
    const handleRenameModalClose = () => {
        setIsRenameModalOpen(false);
    };

    const handleLeaveChatGroupCloseModal = () => {
        setIsLeaveChatGroupModalOpen(false);
    };

    const handleConfirmLeaveGroup = () => {
        if (chatId && myProfileId !== undefined) {
            setLeaveGroupIds((prevLeaveGroupIds) => [...prevLeaveGroupIds, myProfileId]);
            setIsLeaveChatGroupModalOpen(false);
        }
    };

    useEffect(() => {
        if (leaveGroupIds.length > 0 && chatId && myProfileId !== undefined) {
            dispatch(leaveChatGroup(chatId, leaveGroupIds));
            dispatch(setOpenSnackBar("Rời nhóm thành công!"));
        }
    }, [leaveGroupIds, chatId, myProfileId, dispatch]);

    const handleRenameGroup = (chatName: string) => {
        dispatch(updateChatsGroupName(chatId, chatName));
        dispatch(setOpenSnackBar("Đổi tên nhóm thành công!"));
    };

    return (
        <>
            <div>
                {/* <ActionIcon
                      path={`${MESSAGES}/${chatParticipant?.id}/info`}
                      actionText={"Details"}
                      className={"icon"}
                      icon={DetailsIcon}
                  /> */}
                <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? "long-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <MoreHorizIcon />
                </IconButton>
                <Menu
                    id="long-menu"
                    MenuListProps={{
                        "aria-labelledby": "long-button"
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left"
                    }}
                    transformOrigin={{
                        vertical: "bottom",
                        horizontal: "right"
                    }}
                    getContentAnchorEl={null}
                    PaperProps={{
                        style: {
                            width: "30ch",
                            marginTop: "18px",
                            marginLeft: "23px",
                            borderRadius: "10px"
                        }
                    }}
                >
                    {options.map((option) => (
                        <MenuItem
                            className={classes.menuItem}
                            key={option.label}
                            onClick={() => handleMenuItemClick(option.type)}
                        >
                            {option.icon}
                            {option.label}
                        </MenuItem>
                    ))}
                </Menu>
            </div>
            <ChatBackGroundModal open={isModalOpen} onClose={handleModalClose} onChangeBackground={changeBackground} />
            <GroupMenberModal open={isMembersModalOpen} onClose={handleMembersModalClose} chatId={chatId} />
            <ChangeNameGroup open={isRenameModalOpen} onClose={handleRenameModalClose} onRename={handleRenameGroup} />
            <LeaveChatGroupModal
                open={isLeaveChatGroupModalOpen}
                onClose={handleLeaveChatGroupCloseModal}
                onConfirm={handleConfirmLeaveGroup}
            />
        </>
    );
};

export default MoreSetingChatGroup;
