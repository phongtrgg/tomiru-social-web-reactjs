import React, { ChangeEvent, FC, useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    Tabs,
    Tab,
    Avatar,
    Typography,
    Divider,
    List,
    ListItem,
    Button,
    Checkbox
} from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { UserResponse } from "../../../../types/user";
import Groups2Icon from "@mui/icons-material/Groups2";
import { useMessagesStyles } from "../../MessagesStyles";
import SearchAddPeopleGroup from "./SearchAddPeople/SearchAddPeopleGroup";
import { useChatHeaderStyles } from "../ChatHeader/ChatHeaderStyles";
import { selectUserProfile } from "../../../../store/ducks/userProfile/selectors";
import { DEFAULT_PROFILE_IMG } from "../../../../constants/url-constants";
import MoreSettingGroupMember from "./MoreSetingGroup/MoreSettingGroupMember";
import SuggestUserGroupChat from "../../MessagesModal/SuggestUserGroupChat/SuggestUserGroupChat";
import { SearchIcon } from "../../../../icons";
import InfiniteScrollWrapper from "../../../../components/InfiniteScrollWrapper/InfiniteScrollWrapper";
import { selectUsersPagesCount, selectUsersSearch } from "../../../../store/ducks/usersSearch/selectors";
import { fetchUsersSearchByUsername, resetUsersState, setUsersSearch } from "../../../../store/ducks/usersSearch/actionCreators";
import { selectUserDataId } from "../../../../store/ducks/user/selectors";
import MessagesModalUser from "../../MessagesModal/MessagesModalUser/MessagesModalUser";
import { addMemberError, addMemberToChatGroup } from "../../../../store/ducks/chats/actionCreators";
import { selectChatById, selectChatMembersById } from "../../../../store/ducks/chats/selectors";
import { ChatResponse } from "../../../../types/chat";
import { setOpenSnackBar } from "../../../../store/ducks/actionSnackbar/actionCreators";
import Alert from '@mui/material/Alert';

interface MembersModalProps {
    open: boolean;
    onClose: () => void;
    chatId?: number
}

const GroupMemberModal: FC<MembersModalProps> = React.memo(({ open, onClose, chatId }) => {
    const [activeTab, setActiveTab] = useState<number>(0);
    const [selectedUsers, setSelectedUsers] = useState<UserResponse[]>([]);
    const classes = useMessagesStyles();
    const classes1 = useChatHeaderStyles();
    const chatParticipant = useSelector(selectUserProfile);
    const users = useSelector(selectUsersSearch);
    const usersPagesCount = useSelector(selectUsersPagesCount);
    const dispatch = useDispatch();
    const [text, setText] = useState<string>("");
    const myProfileId = useSelector(selectUserDataId);

    const members = useSelector((state: RootState) => selectChatMembersById(state, chatId));

    const handleChangeTab = (event: ChangeEvent<{}>, newValue: number): void => {
        setActiveTab(newValue);
    };
    const loadParticipants = (page: number): void => {
        dispatch(fetchUsersSearchByUsername({ username: encodeURIComponent(text), pageNumber: page }));
    };

    const onSearch = (text: string): void => {
        if (text) {
            setText(text);
            dispatch(resetUsersState());
            dispatch(fetchUsersSearchByUsername({ username: encodeURIComponent(text), pageNumber: 0 }));
        } else {
            setText("");
            dispatch(setUsersSearch([]));
        }
    };

    const handleRemoveUser = (userId: number): void => {
        setSelectedUsers((prevSelectedUsers) => prevSelectedUsers.filter((user) => user.id !== userId));
    };

    
    const handleListItemClick = (user: UserResponse): void => {

        if (!user.isMutedDirectMessages && user.id !== myProfileId) {
            setSelectedUsers((prevSelectedUsers) =>
                prevSelectedUsers.some((selectedUser) => selectedUser.id === user.id)
                    ? prevSelectedUsers.filter((selectedUser) => selectedUser.id !== user.id)
                    : [...prevSelectedUsers, user]
            );
        }
  
    };

    const error = useSelector((state: RootState) => state.chats.error);

    const handleAddMembers = () => {
        const userIds  = selectedUsers.map(user => user.id);

        if(userIds.length === 0) {
            <Alert severity="warning" color="warning">
                "Bạn cần phải chọn thành viên muốn thêm"
            </Alert>
        }
        dispatch(addMemberToChatGroup(chatId, userIds));
        onClose(); 
 
        if (!error) {
            dispatch(addMemberError('Đã có thành viên trong nhóm'))
        } else {
            dispatch(setOpenSnackBar("Thêm thành viên vào nhóm thành công!"));
        }
        
        <Alert severity="warning" color="warning">
            {error}
        </Alert>
    };

    // useEffect(() => {
    //     if (!error) {
    //         dispatch(setOpenSnackBar("Thêm thành viên vào nhóm thành công!"));
    //     }
    //     <Alert severity="warning" color="warning">
    //         {error}
    //     </Alert>
        
    // }, [error, dispatch]);




    return (
        <>
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "450px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <Groups2Icon style={{ width: "20px", height: "20px" }} />
                        <Typography>Thành viên</Typography>
                    </div>
                    <CloseIcon onClick={onClose} style={{ cursor: "pointer" }} />
                </div>
            </DialogTitle>

            <DialogContent style={{ height: "400px" }}>
                <div style={{ display: "flex" }}>
                    <Tabs value={activeTab} indicatorColor="primary" textColor="primary" onChange={handleChangeTab}>
                        <Tab
                            className={classes.tab}
                            label={
                                <div className={classes.areaChat}>
                                    <Typography>Tất cả</Typography>
                                </div>
                            }
                        />
                        <Tab
                            className={classes.tab}
                            label={
                                <div className={classes.areaChat}>
                                    <Typography>Thêm thành viên</Typography>
                                </div>
                            }
                        />
                    </Tabs>
                </div>

                {activeTab === 0 ? (
                    <div style={{ display: "flex", marginTop: "20px", flexDirection: "column", alignItems: "stretch" }}>
                        {members && members.map((member) => (
                            <div key={member.user.id} style={{ display: "flex", alignItems: "center", marginBottom: "10px",  }}>
                                <Avatar className={classes1.chatAvatar} src={member.user.avatar ?? DEFAULT_PROFILE_IMG} />
                                <div style={{ flex: 1 }}>
                                    <Typography variant="h5">{member.user.fullName}</Typography>
                                    <Typography variant="subtitle2">@{member.user.username}</Typography>
                                </div>
                                <MoreSettingGroupMember idMember={member.user.id} chatId={chatId}/>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>
                        <InfiniteScrollWrapper
                            dataLength={users.length}
                            pagesCount={usersPagesCount}
                            loadItems={loadParticipants}
                        >
                            <SearchAddPeopleGroup searchText={text} onSearch={onSearch}/>
                            <SuggestUserGroupChat selectedUsers={selectedUsers} onRemoveUser={handleRemoveUser} />
                            <Divider />
                            <List component="nav">
                                {users.map((user) => (
                                    <ListItem
                                        key={user.id}
                                        selected={selectedUsers.some((selectedUser) => selectedUser.id === user.id)}
                                        disabled={user.isMutedDirectMessages || user.id === myProfileId}
                                        onClick={() => handleListItemClick(user)}
                                        button
                                    >
                                        <MessagesModalUser user={user} />
                                    </ListItem>
                                ))}
                            </List>
                        </InfiniteScrollWrapper>

                        <Typography variant="h6" style={{ fontWeight: "bold" }}>
                            Gợi ý
                        </Typography>
                        <div style={{ display: "flex", marginTop: "20px", height: "180px", alignItems: "center"}}>
                                <Avatar
                                    className={classes1.chatAvatar}
                                    src={chatParticipant?.avatar ?? DEFAULT_PROFILE_IMG}
                                />
                            <div style={{ flex: 1 }}>
                                <Typography variant="h5">{chatParticipant?.fullName}</Typography>
                                <Typography variant="subtitle2">@{chatParticipant?.username}</Typography>
                            </div>
                            <Checkbox
                                checked={selectedUsers.some((selectedUser) => selectedUser.id === (chatParticipant?.id))}
                                onChange={() => chatParticipant && handleListItemClick(chatParticipant)}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </div>
                        <div style={{display: "flex", justifyContent: "center", height: "48px", alignItems: "center"}}>
                            <Button  color="primary" variant="contained" style={{width: "340px"}} onClick={handleAddMembers}>
                                Thêm thành viên
                            </Button>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
        </>
    );
});

export default GroupMemberModal;
