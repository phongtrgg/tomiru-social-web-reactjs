import React, { ChangeEvent, FC, ReactElement, useCallback, useEffect, useState } from "react";
import { Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Paper, Tab, Tabs } from "@material-ui/core";

import { useMessagesStyles } from "./MessagesStyles";
import { fetchChats, resetChatsState } from "../../store/ducks/chats/actionCreators";
import { selectUserDataId } from "../../store/ducks/user/selectors";
import { selectChatsItems, selectIsChatsLoading } from "../../store/ducks/chats/selectors";
import { resetChatMessages } from "../../store/ducks/chatMessages/actionCreators";
import ConversationInfo from "./ConversationInfo/ConversationInfo";
import Spinner from "../../components/Spinner/Spinner";
import { useGlobalStyles } from "../../util/globalClasses";
import { ChatResponse } from "../../types/chat";
import ChatMessages from "./ChatMessages/ChatMessages";
import { withDocumentTitle } from "../../hoc/withDocumentTitle";
import { MESSAGES, MESSAGES_SETTINGS } from "../../constants/path-constants";
import MessagesHeader from "./MessagesHeader/MessagesHeader";
import StartConversation from "./StartConversation/StartConversation";
import MessageSettings from "./MessageSettings/MessageSettings";
import SearchChatParticipant from "./SearchChatParticipant/SearchChatParticipant";
import { resetChatState } from "../../store/ducks/chat/actionCreators";
import { resetUserProfileState } from "../../store/ducks/userProfile/actionCreators";
import AllChats from "./AllChat/AllChats";
import GroupChats from "./GroupChat/GroupChats";
import IndividualChats from "./PeopleChat/IndividualChats";
import { useTranslation } from "react-i18next";

const Messages: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useMessagesStyles();
    const dispatch = useDispatch();
    const location = useLocation<{ removeParticipant: boolean | undefined }>();
    const myProfileId = useSelector(selectUserDataId);
    const chats = useSelector(selectChatsItems);
    const isChatsLoading = useSelector(selectIsChatsLoading);
    const [participantId, setParticipantId] = useState<number | undefined>(undefined);
    const [chatId, setChatId] = useState<number | undefined>(undefined);
    const [activeTab, setActiveTab] = useState<number>(0);
    const [isGroupChat, setIsGroupChat] = useState<boolean>(false);
    const { t } = useTranslation();

    const handleChangeTab = (event: ChangeEvent<{}>, newValue: number): void => {
        setActiveTab(newValue);
    };

    useEffect(() => {
        dispatch(fetchChats());

        return () => {
            dispatch(resetChatsState());
            dispatch(resetChatState());
            dispatch(resetUserProfileState());
        };
    }, [dispatch]);

    useEffect(() => {
        if (location.state?.removeParticipant === true) {
            setParticipantId(undefined);
            dispatch(resetChatMessages());
            dispatch(resetChatState());
        }
    }, [location.state?.removeParticipant, dispatch]);

    const handleListItemClick = useCallback(
        (chat: ChatResponse): void => {
            setChatId(chat.id);
            const isGroup = chat.participants.length > 2;
            setIsGroupChat(isGroup);
            setParticipantId(
                chat.participants[0].user.id === myProfileId
                    ? chat.participants[1].user.id
                    : chat.participants[0].user.id
            );
        },
        [myProfileId]
    );
    return (
        <>
            <Grid className={classes.grid} md={4} item>
                <Paper className={globalClasses.pageContainer} variant="outlined">
                    <MessagesHeader />

                    {isChatsLoading ? (
                        <Spinner paddingTop={150} />
                    ) : chats.length === 0 ? (
                        <StartConversation />
                    ) : (
                        <>
                            <SearchChatParticipant />
                            <div className={classes.tabs}>
                                <Tabs
                                    value={activeTab}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    onChange={handleChangeTab}
                                >
                                    <Tab
                                        className={classes.tab}
                                        label={
                                            <div className={classes.areaChat}>
                                                <p>{t("all")}</p>
                                                {/* <p className={classes.badge}>5</p> */}
                                            </div>
                                        }
                                    />
                                    <Tab
                                        className={classes.tab}
                                        label={
                                            <div className={classes.areaChat}>
                                                <p>{t("groups")}</p>
                                                {/* <p className={classes.badge}>2</p> */}
                                            </div>
                                        }
                                    />
                                    <Tab
                                        className={classes.tab}
                                        label={
                                            <div className={classes.areaChat}>
                                                <p>{t("people")}</p>
                                                {/* <p className={classes.badge}>1</p> */}
                                            </div>
                                        }
                                    />
                                </Tabs>
                            </div>

                            {activeTab === 0 && (
                                <AllChats
                                    chats={chats}
                                    chatId={chatId ? chatId : undefined}
                                    handleListItemClick={handleListItemClick}
                                />
                            )}
                            {activeTab === 1 && (
                                <GroupChats
                                    chats={chats}
                                    chatId={chatId ? chatId : undefined}
                                    handleListItemClick={handleListItemClick}
                                />
                            )}
                            {activeTab === 2 && (
                                <IndividualChats
                                    chats={chats}
                                    chatId={chatId ? chatId : undefined}
                                    handleListItemClick={handleListItemClick}
                                />
                            )}
                        </>
                    )}
                </Paper>
            </Grid>
            <Grid className={classes.grid} md={5} item>
                <Route exact path={MESSAGES_SETTINGS}>
                    <MessageSettings />
                </Route>
                <Route exact path={`${MESSAGES}/:id/info`}>
                    <ConversationInfo participantId={participantId} chatId={chatId} />
                </Route>
                <Route exact path={MESSAGES}>
                    <ChatMessages
                        participantId={participantId}
                        chatId={chatId}
                        isGroupChat={isGroupChat}
                        chats={chats}
                    />
                </Route>
            </Grid>
        </>
    );
};

export default withDocumentTitle(Messages)("Messages");
