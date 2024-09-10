import React, { FC, ReactElement } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { PersonPinCircleOutlined } from "@material-ui/icons";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useChatHeaderStyles } from "../ChatHeaderStyles";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import ChatBackGroundModal from "../../ChatBackgroundModal/ChatBackgroundModal";
import { useTranslation } from "react-i18next";
import { updateBackgroundChatsGroup } from "../../../../../store/ducks/chats/actionCreators";
import { useDispatch } from "react-redux";

interface MoreSetingChatProps {
    chatId?: number;
}
const MoreSeting: FC<MoreSetingChatProps> = ({ chatId }): ReactElement => {
    const classes = useChatHeaderStyles();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const handleMenuItemClick = (option: number) => {
        if (option === 1) {
            setIsModalOpen(true);
        }
        setAnchorEl(null);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const options = [
        { type: 0, label: t("view-profile"), icon: <AccountCircleIcon className={classes.iconPerson} /> },
        { type: 1, label: t("change-background"), icon: <WallpaperIcon className={classes.iconPerson} /> }
    ];

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const changeBackground = (selectedBackground: string) => {
        if (selectedBackground) {
            dispatch(updateBackgroundChatsGroup(chatId, selectedBackground));
            setIsModalOpen(false);
        }
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
        </>
    );
};

export default MoreSeting;
