import React, { ChangeEvent, FC, useState, MouseEvent, useEffect } from "react";
import {
    Card,
    CardContent,
    Typography,
    Tabs,
    Tab,
    Divider,
    List,
    ListItem,
    ListItemText,
    Avatar,
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CancelPresentationOutlinedIcon from "@mui/icons-material/CancelPresentationOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { listFriendItems } from "../../../../store/ducks/friendUser/selector";
import {
    checkFollowRequest,
    fetchListFriend,
    setSelectedFriend,
    unFriendRequest
} from "../../../../store/ducks/friendUser/actionCreators";
import { FriendUserResponse } from "../../../../types/user";
import { useHistory, useParams } from "react-router-dom";
import { PROFILE } from "../../../../constants/path-constants";
import { selectUserDataId } from "../../../../store/ducks/user/selectors";
import { followUser } from "../../../../store/ducks/user/actionCreators";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import PersonOffOutlinedIcon from "@mui/icons-material/PersonOffOutlined";
import { LoadingStatus } from "../../../../types/common";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 550,
        margin: "auto",
        marginTop: theme.spacing(4),
        padding: theme.spacing(2),
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
    },
    headerContainer: {
        display: "flex",
        justifyContent: "space-between"
    },
    friendTitle: {
        fontWeight: 700
    },
    searchContainer: {
        display: "flex",
        alignItems: "center",
        backgroundColor: "#E7E7E8",
        width: "160px",
        height: "35px",
        borderRadius: "20px",
        paddingLeft: "10px"
    },
    inputSearch: {
        paddingLeft: "10px",
        width: "100px",
        height: "23px",
        outline: "none",
        border: "none",
        backgroundColor: "#E7E7E8"
    },
    tabs: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        "& .MuiTabs-indicator": {
            marginLeft: 12,
            maxWidth: 125,
            height: 4,
            backgroundColor: theme.palette.primary.main
        },
        "& .MuiTab-root": {
            fontWeight: 700
        },
        "& .MuiTab-labelIcon": {
            minHeight: 0,
            paddingTop: 0
        }
    },
    tab: {
        minWidth: 139,
        textTransform: "none",
        "&:hover": {
            backgroundColor: theme.palette.secondary.light
        }
    },
    list: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: theme.spacing(2)
    },
    listItem: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.spacing(1),
        padding: theme.spacing(1),
        marginTop: "14px"
    },
    listItemText: {
        marginLeft: theme.spacing(2),
        flex: 1,
        fontSize: "0.875rem", // smaller font size
        cursor: "pointer"
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: theme.spacing(1),
        cursor: "pointer"
    },
    icon: {
        minWidth: theme.spacing(4)
    },
    menuPaper: {
        boxShadow: "0 4px 14px rgba(0,0,0,0.2)"
    },
    addButton: {
        marginRight: theme.spacing(0.5)
    }
}));

const FriendList: FC = () => {
    const classes = useStyles();
    const history = useHistory();
    const { userId } = useParams<{ userId: string }>();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [activeTab, setActiveTab] = useState<number>(0);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    // const [selectedFriend, setSelectedFriend] = useState<null | FriendUserResponse>(null);
    const dispatch = useDispatch();
    const listFriend = useSelector((state: RootState) => listFriendItems(state));

    const myProfileId = useSelector(selectUserDataId);
    const selectedFriend = useSelector((state: RootState) => state.friendsUser.selectedFriend);
    const loadingState = useSelector((state: RootState) => state.friendsUser.loadingState);
    const { t } = useTranslation();
    useEffect(() => {
        const idToFetch = userId ? parseInt(userId, 10) : myProfileId;
        if (idToFetch) {
            dispatch(fetchListFriend(idToFetch));
        }
    }, [dispatch, myProfileId, userId]);

    const filteredAllFriends = listFriend.filter((friend) =>
        friend.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const filteredRecentFriends = listFriend.filter((friend) =>
        friend.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleChangeTab = (event: ChangeEvent<{}>, newValue: number): void => {
        setActiveTab(newValue);
    };

    const handleClick = async (event: MouseEvent<HTMLElement>, friend: FriendUserResponse) => {
        setAnchorEl(event.currentTarget);
        // setSelectedFriend(friend);
        dispatch(setSelectedFriend(friend));

        // Dispatch API call and wait for it to complete
        await dispatch(checkFollowRequest(friend.userId));
    };

    const handleClose = () => {
        setAnchorEl(null);
        // setSelectedFriend(null);
    };

    const handleMenuItemClickUnfl = () => {
        if (selectedFriend) {
            dispatch(followUser({ userId: selectedFriend.userId }));
        }
        handleClose();
    };

    const handleMenuItemClickUnfr = () => {
        if (selectedFriend) {
            dispatch(unFriendRequest(selectedFriend.userId));
        }
        handleClose();
    };

    const handleItemClick = (id: number) => {
        history.push(`${PROFILE}/${id}`);
    };

    return (
        <Card className={classes.root}>
            <CardContent>
                <div className={classes.headerContainer}>
                    <Typography className={classes.friendTitle}>Bạn bè</Typography>
                    <div className={classes.searchContainer}>
                        <SearchOutlinedIcon />
                        <input
                            type="text"
                            placeholder="Tìm kiếm"
                            className={classes.inputSearch}
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>
                <div className={classes.tabs}>
                    <Tabs value={activeTab} indicatorColor="primary" textColor="primary" onChange={handleChangeTab}>
                        <Tab className={classes.tabs} label="Tất cả bạn bè" />
                        <Tab className={classes.tabs} label="Đã thêm gần đây" />
                    </Tabs>
                </div>
                <Divider />
                <List className={classes.list}>
                    {(activeTab === 0 ? filteredAllFriends : filteredRecentFriends).map((friend, index) => (
                        <ListItem key={index} className={classes.listItem}>
                            <Avatar
                                src={friend.avatar}
                                className={classes.avatar}
                                onClick={() => handleItemClick(friend.userId)}
                            />
                            <ListItemText
                                primary={friend.fullName}
                                className={classes.listItemText}
                                onClick={() => handleItemClick(friend.userId)}
                            />
                            {parseInt(userId) === myProfileId ? (
                                <>
                                    <IconButton edge="end" onClick={(event) => handleClick(event, friend)}>
                                        <MoreHorizOutlinedIcon />
                                    </IconButton>
                                    {/* <IconButton edge="end" className={classes.addButton} >
                                <PersonAddAltOutlinedIcon />
                            </IconButton> */}
                                </>
                            ) : null}
                        </ListItem>
                    ))}
                </List>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl) && loadingState === LoadingStatus.LOADED}
                    onClose={handleClose}
                    MenuListProps={{ disablePadding: true }}
                    PaperProps={{ className: classes.menuPaper }}
                    getContentAnchorEl={null}
                >
                    {[
                        <MenuItem onClick={handleMenuItemClickUnfl} key="unfollow">
                            <ListItemIcon className={classes.icon}>
                                {selectedFriend?.statusFollow ? (
                                    <CancelPresentationOutlinedIcon fontSize="small" />
                                ) : (
                                    <PersonAddAltOutlinedIcon fontSize="small" />
                                )}
                            </ListItemIcon>
                            <ListItemText
                                primary={selectedFriend?.statusFollow ? t("unfollow") : t("follow")}
                                className={classes.listItemText}
                            />
                        </MenuItem>,
                        <MenuItem onClick={handleMenuItemClickUnfr} key="unfriend">
                            <ListItemIcon className={classes.icon}>
                                <PersonOffOutlinedIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary={t("unfriend")} className={classes.listItemText} />
                        </MenuItem>
                    ]}
                </Menu>
            </CardContent>
        </Card>
    );
};

export default FriendList;
