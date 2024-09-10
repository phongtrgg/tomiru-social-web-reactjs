import React, { ChangeEvent, FC, FormEvent, ReactElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Tabs, Tab, List, ListItem, Dialog } from "@material-ui/core";
import { fetchTweetsByText, resetTweets, fetchTweetByTextRequest } from "../../store/ducks/tweets/actionCreators";
import {
    fetchUsersSearchByUsername,
    resetUsersState,
    setUsersSearch,
    fetchUserByUserNameRequest
} from "../../store/ducks/usersSearch/actionCreators";
import { withDocumentTitle } from "../../hoc/withDocumentTitle";
import PageHeaderWrapper from "../../components/PageHeaderWrapper/PageHeaderWrapper";
import { useSearchStyles } from "./SearchStyle";
import ForYouContent from "./ForYouContent/ForYouContent";
import RecentContent from "./Recently/RecentContent";
import YourFollow from "./Follower/YourFollow";
import { selectUsersSearch } from "../../store/ducks/usersSearch/selectors";
import { selectUserDataId } from "../../store/ducks/user/selectors";
import MessagesModalUser from "../Messages/MessagesModal/MessagesModalUser/MessagesModalUser";
import { UserResponse } from "../../types/user";
import { setSelectedUser } from "../../store/ducks/addTweetForm/actionCreators";
import ModalInput from "../../components/ModalInput/ModalInput";
import BackButton from "../../components/BackButton/BackButton";
import { useTranslation } from "react-i18next";

interface MessagesModalProps {
    visible?: boolean;
    onClose: () => void;
}
const Search: FC<MessagesModalProps> = ({ visible, onClose }): ReactElement => {
    const { t } = useTranslation();
    const classes = useSearchStyles();
    const dispatch = useDispatch();

    const [searchText, setSearchText] = useState<string>("");
    const [activeTab, setActiveTab] = useState<number>(0);
    const myProfileId = useSelector(selectUserDataId);
    const [text, setText] = useState<string>("");
    const [isSearching, setIsSearching] = useState<boolean>(false);

    const users = useSelector(selectUsersSearch);
    const [selectedIndex, setSelectedIndex] = useState<number>();

    const handleChangeTab = (event: ChangeEvent<{}>, newValue: number): void => {
        setSearchText("");
        setActiveTab(newValue);
        dispatch(resetTweets());
        dispatch(resetUsersState());
    };

    const handleSubmitSearch = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        if (searchText) {
            const encodedText = encodeURIComponent(searchText);

            if (activeTab !== 2) {
                dispatch(resetTweets());
                // dispatch(fetchTweetsByText({ text: encodedText, pageNumber: 0 }));
                dispatch(fetchTweetByTextRequest({ text: encodedText, pageNumber: 0 }));
            } else {
                dispatch(resetUsersState());
                // dispatch(fetchUsersSearchByUsername({ username: encodedText, pageNumber: 0 }));
                dispatch(fetchUserByUserNameRequest({ username: encodedText, pageNumber: 0 }));
            }
        }
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

    const handleSearchText = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        setSearchText(event.target.value);
    };

    const handleSearchFocus = () => {
        setIsSearching(true);
    };

    const handleSearchBlur = () => {
        if (!searchText) {
            setIsSearching(false);
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case 0:
                return <ForYouContent />;
            case 1:
                return <RecentContent />;
            case 2:
                return <YourFollow />;
            default:
                return null;
        }
    };

    const handleListItemClick = (user: UserResponse): void => {
        if (!user.isMutedDirectMessages) {
            if (user.id !== selectedIndex) {
                setSelectedIndex(user.id);
                setSelectedUser(user);
            } else {
                setSelectedIndex(undefined);
            }
        }
    };

    // if (!visible) {
    //     return null;
    // }

    return (
        <Paper variant="outlined">
            <PageHeaderWrapper>
                <div>
                    <form style={{ display: "flex", marginTop: "12px" }} onSubmit={handleSubmitSearch}>
                        <div className={classes.backButtonWrapper}>
                            <BackButton />
                        </div>
                        <ModalInput placeholder={t("search_people")} searchText={text} onSearch={onSearch} />
                    </form>
                    {isSearching ? (
                        <div
                            style={{
                                position: "absolute",
                                backgroundColor: "white",
                                zIndex: "1000",
                                right: "0",
                                width: "500px",
                                borderRadius: "10px",
                                boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)"
                            }}
                        >
                            <List component="nav">
                                {users.map((user) => (
                                    <ListItem
                                        key={user.id}
                                        selected={selectedIndex === user.id!}
                                        disabled={user.isMutedDirectMessages || user.id === myProfileId}
                                        onClick={() => handleListItemClick(user)}
                                        button
                                    >
                                        <MessagesModalUser user={user} />
                                    </ListItem>
                                ))}
                            </List>
                        </div>
                    ) : (
                        <div className={classes.tabs}>
                            <Tabs
                                value={activeTab}
                                onChange={handleChangeTab}
                                indicatorColor="primary"
                                textColor="primary"
                            >
                                <Tab label="Dành cho bạn" />
                                <Tab label="Gần đây" />
                                <Tab label="Người theo dõi bạn" />
                            </Tabs>
                        </div>
                    )}
                </div>
            </PageHeaderWrapper>
            <div className="contentTab" style={{ marginTop: "130px" }}>
                {renderContent()}
            </div>
        </Paper>
    );
};

export default withDocumentTitle(Search)("Search");
