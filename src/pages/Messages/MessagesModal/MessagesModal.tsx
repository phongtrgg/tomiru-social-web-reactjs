import React, { FC, FormEvent, ReactElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dialog, Divider, List, ListItem } from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import classnames from "classnames";
import { useMessagesModalStyles } from "./MessagesModalStyles";
import {
    fetchUsersSearchByUsername,
    resetUsersState,
    setUsersSearch,
    fetchUserByUserNameRequest
} from "../../../store/ducks/usersSearch/actionCreators";
import { selectUsersPagesCount, selectUsersSearch } from "../../../store/ducks/usersSearch/selectors";
import MessagesModalUser from "./MessagesModalUser/MessagesModalUser";
import { createGroupChat, createChat } from "../../../store/ducks/chats/actionCreators";
import { selectUserDataId } from "../../../store/ducks/user/selectors";
import { UserResponse } from "../../../types/user";
import InfiniteScrollWrapper from "../../../components/InfiniteScrollWrapper/InfiniteScrollWrapper";
import ModalInput from "../../../components/ModalInput/ModalInput";
import DialogTitleComponent from "../../../components/DialogTitleComponent/DialogTitleComponent";
import { useGlobalStyles } from "../../../util/globalClasses";
import CloseButton from "../../../components/CloseButton/CloseButton";
import SuggestUserGroupChat from "./SuggestUserGroupChat/SuggestUserGroupChat";
import { useTranslation } from "react-i18next";

interface MessagesModalProps {
    visible?: boolean;
    onClose: () => void;
}

const MessagesModal: FC<MessagesModalProps> = ({ visible, onClose }): ReactElement | null => {
    const globalClasses = useGlobalStyles({});
    const classes = useMessagesModalStyles();
    const dispatch = useDispatch();
    const users = useSelector(selectUsersSearch);
    const myProfileId = useSelector(selectUserDataId);
    const usersPagesCount = useSelector(selectUsersPagesCount);
    const [text, setText] = useState<string>("");
    const [selectedUsers, setSelectedUsers] = useState<UserResponse[]>([]);
    const { t } = useTranslation();
    const handleSubmitSearch = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        // dispatch(fetchUsersSearchByUsername({ username: encodeURIComponent(text), pageNumber: 0 }));
        dispatch(fetchUserByUserNameRequest({ username: encodeURIComponent(text), pageNumber: 0 }));
    };

    const onSearch = (text: string): void => {
        if (text) {
            setText(text);
            dispatch(resetUsersState());
            // dispatch(fetchUsersSearchByUsername({ username: encodeURIComponent(text), pageNumber: 0 }));
            dispatch(fetchUserByUserNameRequest({ username: encodeURIComponent(text), pageNumber: 0 }));
        } else {
            setText("");
            dispatch(setUsersSearch([]));
        }
    };

    const loadParticipants = (page: number): void => {
        // dispatch(fetchUsersSearchByUsername({ username: encodeURIComponent(text), pageNumber: page }));
        dispatch(fetchUserByUserNameRequest({ username: encodeURIComponent(text), pageNumber: page }));
    };

    const handleClickAddUserToChat = (): void => {
        if (selectedUsers.length === 1) {
            // Create individual chat
            dispatch(createChat(selectedUsers[0].id));
        } else if (selectedUsers.length > 1) {
            // Create group chat
            const participantIds = selectedUsers.map((user) => user.id);
            const chatName = ` ${selectedUsers
                .slice(0, 2)
                .map((user) => user.fullName)
                .join(", ")}...`;
            dispatch(createGroupChat({ userIds: participantIds, chatName }));
        }
        dispatch(setUsersSearch([]));
        onClose();
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

    const handleRemoveUser = (userId: number): void => {
        setSelectedUsers((prevSelectedUsers) => prevSelectedUsers.filter((user) => user.id !== userId));
    };

    if (!visible) {
        return null;
    }

    return (
        <Dialog open={visible} onClose={onClose}>
            <DialogTitleComponent title={t("new-conversation")} onClose={onClose} borderBottom>
                <div className={classes.createAndClose}>
                    <Button
                        onClick={handleClickAddUserToChat}
                        type="submit"
                        style={{ width: "130px", height: "40px" }}
                        variant="contained"
                        color="primary"
                        size="small"
                        disabled={selectedUsers.length === 0}
                    >
                        {t("create")}
                    </Button>
                    {onClose && <CloseButton onClose={onClose} />}
                </div>
            </DialogTitleComponent>

            <DialogContent id="scrollableDiv" className={classnames(classes.dialogContent, classes.content)}>
                <InfiniteScrollWrapper
                    dataLength={users.length}
                    pagesCount={usersPagesCount}
                    loadItems={loadParticipants}
                >
                    <form onSubmit={handleSubmitSearch}>
                        <ModalInput placeholder={t("search_people")} searchText={text} onSearch={onSearch} />
                    </form>
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
            </DialogContent>
        </Dialog>
    );
};

export default MessagesModal;
