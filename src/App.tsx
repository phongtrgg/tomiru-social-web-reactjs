import React, { FC, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, Theme } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import { ThemeOptions } from "@material-ui/core/styles/createTheme";
import { deepmerge } from "@mui/utils";
import Authentication from "./pages/Authentication/Authentication";
import Home from "./pages/Home/Home";
import { Layout } from "./pages/Layout";
import UserPage from "./pages/UserPage/UserPage";
import { selectIsAuth, selectUserDataId, selectUserStatus } from "./store/ducks/user/selectors";
import { fetchUserData, setNewMention, setNewNotification, setUnreadMessage } from "./store/ducks/user/actionCreators";
import Explore from "./pages/Explore/Explore";
import FollowingFollowers from "./pages/FollowingFollowers/FollowingFollowers";
import TweetImageModal from "./components/TweetImageModal/TweetImageModal";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Bookmarks from "./pages/Bookmarks/Bookmarks";
import Notifications from "./pages/Notifications/Notifications";
import NotificationInfo from "./pages/Notifications/NotificationsPage/NotificationInfo/NotificationInfo";
import Messages from "./pages/Messages/Messages";
import { setChatMessage } from "./store/ducks/chatMessages/actionCreators";
import { WS_URL } from "./constants/endpoint-constants";
import { setNotification, updateNotificationInfoTweet } from "./store/ducks/notifications/actionCreators";
import { selectNotificationsList } from "./store/ducks/notifications/selectors";
import { setScheduledTweets, setTweet, setUpdatedTweet, setVote } from "./store/ducks/tweets/actionCreators";
import Lists from "./pages/Lists/Lists";
import FullList from "./pages/FullList/FullList";
import SuggestedLists from "./pages/SuggestedLists/SuggestedLists";
import ListsMemberships from "./pages/Lists/ListsMemberships/ListsMemberships";
import Settings from "./pages/Settings/Settings";
import {
    blueColor,
    crimsonColor,
    defaultTheme,
    dimTheme,
    greenColor,
    lightsOutTheme,
    orangeColor,
    violetColor,
    yellowColor
} from "./theme";
import NotificationsTimeline from "./pages/Notifications/NotificationsPage/NotificationsTimeline/NotificationsTimeline";
import FollowersYouKnow from "./pages/FollowersYouKnow/FollowersYouKnow";
import { fetchTags } from "./store/ducks/tags/actionCreators";
import { fetchRelevantUsers } from "./store/ducks/users/actionCreators";
import UserImageModal from "./pages/UserPage/UserImageModal/UserImageModal";
import {
    ACCOUNT_FORGOT,
    ACCOUNT_LOGIN,
    ACCOUNT_SIGNIN,
    ACCOUNT_SIGNUP_STEP_2,
    ACCOUNT_SIGNUP_STEP_3,
    ACCOUNT_SIGNUP_STEP_3_FINALLY,
    ACCOUNT_TERMS_OF_POLICY,
    BOOKMARKS,
    CUSTOMER_SERVICE,
    CUSTOMER_SERVICE_SUCCCESS,
    HOME,
    HOME_CONNECT,
    HOME_TRENDS,
    HOME_TWEET,
    LISTS,
    LISTS_MEMBERSHIPS,
    MESSAGES,
    MODAL,
    NEW_LOGIN,
    NEW_LOGIN_FACODE,
    NEW_SIGNUP,
    NOTIFICATION,
    NOTIFICATIONS,
    NOTIFICATIONS_TIMELINE,
    PROFILE,
    PROFILE_HEADER_PHOTO,
    PROFILE_PHOTO,
    QUOTES,
    SEARCH,
    SEARCH_NEW,
    SETTINGS,
    SUGGESTED,
    TOPICS,
    TREE_MONEY,
    TREE_MONEY_DETAIL,
    TRANSACTION_PAGE,
    TRANSACTION_PAGE_P2P,
    USER,
    USER_FOLLOWERS_YOU_FOLLOW,
    MAP
} from "./constants/path-constants";
import QuoteTweets from "./pages/QuoteTweets/QuoteTweets";
import { BackgroundTheme, ColorScheme, LoadingStatus } from "./types/common";
import ActionSnackbar from "./components/ActionSnackbar/ActionSnackbar";
import FullTweet from "./pages/FullTweet/FullTweet";
import Connect from "./pages/Connect/Connect";
import Trends from "./pages/Trends/Trends";
import Topics from "./pages/Topics/Topics";
import UserTopics from "./pages/UserTopics/UserTopics";
import {
    TOPIC_CHAT,
    TOPIC_FEED,
    TOPIC_FEED_ADD,
    TOPIC_FEED_SCHEDULE,
    TOPIC_FEED_VOTE,
    TOPIC_MENTIONS,
    TOPIC_NOTIFICATIONS
} from "./constants/ws-constants";
import { BACKGROUND, COLOR, TOKEN } from "./constants/common-constants";
import { setUpdatedListTweet, setVoteListTweet } from "./store/ducks/list/actionCreators";

import "./i18n";

import NewSignup from "./pages/NewSignup/NewSignup";
import NewSignupStepTwo from "./pages/NewSignup/NewSignupStepTwo/NewSignupStepTwo";
import NewSignupStepThree from "./pages/NewSignup/NewSignupStepThree/NewSignupStepThree";
import NewSignupStepThreeFinally from "./pages/NewSignup/NewSignupStepThree/NewSignupThreeFinally/NewSignupStepThreeFinally";
import TermsOfPolicy from "./pages/NewSignup/TermsOfPolicy/TermsOfPolicy";
import Search from "./pages/Search/Search";
import CustomerService from "./pages/CustomerService/CustomerService";
import CustomerServiceSuccess from "./pages/CustomerService/CustomerServiceSuccess/CustomerServiceSuccess";

import FlPage from "./pages/Lists/FlPage";
import Support from "./pages/Support/Support";
import TakePassword from "./pages/Support/TakePassword";
import MembersList from "./pages/Lists/MembersList";
import Money from "./pages/Money/Money";
import TreeMoney from "./pages/TreeMoney/TreeMoney";
import TreeDetail from "./pages/TreeMoney/TreeDetail/TreeDetail";

import TransactionPage from "./pages/TransactionPage/TransactionPage";
import NewLogin from "./pages/NewLogin/NewLogin";
import NewLoginFACode from "./pages/NewLogin/NewLoginFACode/NewLoginFACode";
import Map from "./pages/Map/Map";
import VaultsPage from "./pages/Vaults/VaultsPage";

const App: FC = (): ReactElement => {
    const history = useHistory();
    const dispatch = useDispatch();
    const myProfileId = useSelector(selectUserDataId);
    const notifications = useSelector(selectNotificationsList);
    const isAuth = useSelector(selectIsAuth);
    const loadingStatus = useSelector(selectUserStatus);
    const isReady = loadingStatus !== LoadingStatus.NEVER && loadingStatus !== LoadingStatus.LOADING;
    const [colorScheme, setColorScheme] = useState<ThemeOptions>(blueColor as ThemeOptions);
    const [theme, setTheme] = useState<Theme>(defaultTheme);

    const location = useLocation<{ background: any }>();
    const background = location.state && location.state.background;

    useEffect(() => {
        dispatch(fetchUserData());

        if (!isAuth && isReady && !location.pathname.includes(ACCOUNT_LOGIN)) {
            history.push(ACCOUNT_SIGNIN);
        }
        if (!localStorage.getItem(TOKEN)) {
            history.push(ACCOUNT_SIGNIN);
        }
    }, []);

    useEffect(() => {
        let stompClient = Stomp.over(new SockJS(WS_URL));

        stompClient.connect({}, () => {
            stompClient?.subscribe(TOPIC_FEED, (response) => {
                dispatch(setUpdatedTweet(JSON.parse(response.body)));
                dispatch(setUpdatedListTweet(JSON.parse(response.body)));
                dispatch(updateNotificationInfoTweet(JSON.parse(response.body)));
            });

            stompClient?.subscribe(TOPIC_FEED_ADD, (response) => {
                dispatch(setTweet(JSON.parse(response.body)));
            });

            stompClient?.subscribe(TOPIC_FEED_SCHEDULE, (response) => {
                dispatch(setScheduledTweets(JSON.parse(response.body)));
            });

            stompClient?.subscribe(TOPIC_FEED_VOTE, (response) => {
                dispatch(setVote(JSON.parse(response.body)));
                dispatch(setVoteListTweet(JSON.parse(response.body)));
            });
        });

        const background = localStorage.getItem(BACKGROUND);
        const color = localStorage.getItem(COLOR);
        processColorScheme(color !== null ? (color as ColorScheme) : ColorScheme.BLUE);
        processBackgroundColor(background as BackgroundTheme);
    }, []);

    useEffect(() => {
        let stompClient = Stomp.over(new SockJS(WS_URL));

        if (myProfileId) {
            if (location.pathname !== HOME_CONNECT) {
                dispatch(fetchRelevantUsers());
            }
            dispatch(fetchTags());

            stompClient.connect({}, () => {
                stompClient?.subscribe(TOPIC_CHAT(myProfileId), (response) => {
                    dispatch(setChatMessage(JSON.parse(response.body)));

                    if (myProfileId !== JSON.parse(response.body).author.id) {
                        dispatch(setUnreadMessage(JSON.parse(response.body)));
                    }
                });

                stompClient?.subscribe(TOPIC_NOTIFICATIONS(myProfileId), (response) => {
                    const isNotificationExist = notifications.find(
                        (notification) => notification.id === JSON.parse(response.body).id
                    );

                    if (!isNotificationExist) {
                        dispatch(setNotification(JSON.parse(response.body)));
                        dispatch(setNewNotification());
                    }
                });

                stompClient?.subscribe(TOPIC_MENTIONS(myProfileId), () => {
                    dispatch(setNewMention());
                });
            });
        }
    }, [myProfileId]);

    const changeBackgroundColor = (background: BackgroundTheme): void => {
        processBackgroundColor(background);
        localStorage.setItem(BACKGROUND, background);
    };

    const changeColorScheme = (color: ColorScheme): void => {
        processColorScheme(color);
        localStorage.setItem(COLOR, color);
    };

    const processBackgroundColor = (background: BackgroundTheme): void => {
        if (background === BackgroundTheme.DEFAULT) {
            setTheme(defaultTheme);
        } else if (background === BackgroundTheme.DIM) {
            setTheme(dimTheme);
        } else if (background === BackgroundTheme.LIGHTS_OUT) {
            setTheme(lightsOutTheme);
        }
    };

    const processColorScheme = (color: ColorScheme): void => {
        if (color === ColorScheme.BLUE) {
            setColorScheme(blueColor);
        } else if (color === ColorScheme.YELLOW) {
            setColorScheme(yellowColor);
        } else if (color === ColorScheme.CRIMSON) {
            setColorScheme(crimsonColor);
        } else if (color === ColorScheme.VIOLET) {
            setColorScheme(violetColor);
        } else if (color === ColorScheme.ORANGE) {
            setColorScheme(orangeColor);
        } else if (color === ColorScheme.GREEN) {
            setColorScheme(greenColor);
        } else {
            setColorScheme(blueColor);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            history.push(ACCOUNT_LOGIN);
        }
    }, []);

    return (
        <MuiThemeProvider theme={createTheme(deepmerge(theme, colorScheme))}>
            <CssBaseline />
            <div className="App">
                <Layout changeBackgroundColor={changeBackgroundColor} changeColorScheme={changeColorScheme}>
                    <Switch location={background || location}>
                        <Route path={ACCOUNT_SIGNIN} component={Authentication} exact />
                        <Route path={ACCOUNT_LOGIN} component={Login} exact />
                        <Route path={ACCOUNT_FORGOT} component={ForgotPassword} />
                        <Route path={HOME} component={Home} exact />
                        <Route path={`${HOME}/:id`} component={Home} exact />
                        <Route path={HOME_CONNECT} component={Connect} exact />
                        <Route path={HOME_TRENDS} component={Trends} exact />
                        <Route path={`${HOME_TWEET}/:id`} component={FullTweet} exact />
                        <Route path={SEARCH} component={Explore} />

                        <Route path={SEARCH_NEW} component={Search} exact />

                        <Route path={NOTIFICATIONS} component={Notifications} />
                        {/* trang   */}
                        <Route path={"/notifi"} component={Notifications} />
                        <Route path={"/support"} component={Support} exact />
                        <Route path={"/takePassword"} component={TakePassword} exact />
                        <Route path={"/flpage"} component={FlPage} exact />
                        <Route path={"/members"} component={MembersList} exact />
                        <Route path={"/money"} component={VaultsPage} exact />

                        <Route path={LISTS} component={Lists} exact />
                        <Route path={NOTIFICATIONS_TIMELINE} component={NotificationsTimeline} exact />
                        <Route path={`${NOTIFICATION}/:id`} component={NotificationInfo} exact />
                        <Route path={MESSAGES} component={Messages} />

                        <Route path={MAP} component={Map} />

                        <Route
                            path={SETTINGS}
                            render={() => (
                                <Settings
                                    changeBackgroundColor={changeBackgroundColor}
                                    changeColorScheme={changeColorScheme}
                                />
                            )}
                        />
                        <Route path={BOOKMARKS} component={Bookmarks} />
                        <Route path={`${TOPICS}/:topics`} component={Topics} />
                        <Route path={`${QUOTES}/:tweetId`} component={QuoteTweets} />
                        <Route path={SUGGESTED} component={SuggestedLists} />

                        <Route path={LISTS} component={Lists} exact />

                        <Route path={`${LISTS_MEMBERSHIPS}/:id`} component={ListsMemberships} exact />
                        <Route path={`${LISTS}/:listId`} component={FullList} exact />
                        <Route path={`${PROFILE}/:userId`} component={UserPage} exact />
                        <Route path={`${PROFILE}/:userId${TOPICS}`} component={UserTopics} exact />
                        <Route path={`${USER_FOLLOWERS_YOU_FOLLOW}/:id`} component={FollowersYouKnow} exact />
                        <Route path={`${USER}/:id/:follow`} component={FollowingFollowers} exact />
                    </Switch>
                    {background && <Route path={`${MODAL}/:id`} children={<TweetImageModal />} />}
                    {background && <Route path={`${PROFILE_PHOTO}/:id`} children={<UserImageModal />} />}
                    {background && <Route path={`${PROFILE_HEADER_PHOTO}/:id`} children={<UserImageModal />} />}
                </Layout>
                <ActionSnackbar />

                <Route path={TREE_MONEY} component={TreeMoney} />
                <Route path={TREE_MONEY_DETAIL} component={TreeDetail} />

                {/* {new} */}

                <Route path={NEW_SIGNUP} component={NewSignup} exact />
                {/* đăng kí */}
                <Route path={ACCOUNT_SIGNUP_STEP_2} component={NewSignupStepTwo} exact />
                <Route path={ACCOUNT_SIGNUP_STEP_3} component={NewSignupStepThree} exact />
                <Route path={ACCOUNT_SIGNUP_STEP_3_FINALLY} component={NewSignupStepThreeFinally} exact />
                <Route path={ACCOUNT_TERMS_OF_POLICY} component={TermsOfPolicy} exact />
                {/* đăng nhập */}
                <Route path={NEW_LOGIN} component={NewLogin} exact />
                <Route path={NEW_LOGIN_FACODE} component={NewLoginFACode} exact />
                {/* gói thành viên */}
                <Route path={CUSTOMER_SERVICE} component={CustomerService} exact />
                <Route path={CUSTOMER_SERVICE_SUCCCESS} component={CustomerServiceSuccess} exact />

                <Route path={TRANSACTION_PAGE} component={TransactionPage} exact />
                {/* <Route path={TRANSACTION_PAGE_P2P} component={TransactionP2P} exact /> */}
            </div>
        </MuiThemeProvider>
    );
};

export default App;
