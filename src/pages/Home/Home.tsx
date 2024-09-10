import React, { ChangeEvent, FC, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { Divider, Paper, Tab, Tabs, Typography } from "@material-ui/core";
import classnames from "classnames";

import TweetComponent from "../../components/TweetComponent/TweetComponent";
import { useHomeStyles } from "./HomeStyles";
import AddTweetForm from "../../components/AddTweetForm/AddTweetForm";
import {
    fetchFollowersTweets,
    fetchTweets,
    resetTweets,
    setTweetsLoadingState
} from "../../store/ducks/tweets/actionCreators";
import { selectIsTweetsLoading, selectPagesCount, selectTweetsItems } from "../../store/ducks/tweets/selectors";
import { fetchUserData } from "../../store/ducks/user/actionCreators";
import { selectUserDataIsProfileStarted } from "../../store/ducks/user/selectors";
import Welcome from "../../components/Welcome/Welcome";
import Spinner from "../../components/Spinner/Spinner";
import { useGlobalStyles } from "../../util/globalClasses";
import { withDocumentTitle } from "../../hoc/withDocumentTitle";
import { ACCOUNT_LOGIN, SEARCH } from "../../constants/path-constants";
import { LoadingStatus } from "../../types/common";
import { useTranslation } from "react-i18next";
import ListsHeader from "../Lists/ListsHeader/ListsHeader";
import ListsPage from "../Lists/ListPage";
import { fetchWalletUser } from "../../store/ducks/wallet/actionsCreator";
import { selectPackagesResult } from "../../store/ducks/packages/selectors";

const Home: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});

    const dispatch = useDispatch();
    const location = useLocation<{ background: Location }>();
    const isProfileStarted = useSelector(selectUserDataIsProfileStarted);
    const tweets = useSelector(selectTweetsItems);
    const packages = useSelector(selectPackagesResult);
    const isLoading = useSelector(selectIsTweetsLoading);
    const pagesCount = useSelector(selectPagesCount);
    const [switchTweets, setSwitchTweets] = React.useState<boolean>(false);
    const [page, setPage] = React.useState<number>(0);
    // new
    const [activeTab, setActiveTab] = useState<number>(0);
    const [searchText, setSearchText] = useState<string>("");
    const [isGroupTab, setIsGroupTab] = useState(false);
    const history = useHistory();
    const { t } = useTranslation();
    const classes = useHomeStyles({ isGroupTab });
    const params = useParams<{ id: string }>();

    useEffect(() => {
        if (params.id === "group") {
            setIsGroupTab(true);
            setActiveTab(1);
        }
    }, [params]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            history.push(ACCOUNT_LOGIN);
        }
    }, []);
    useEffect(() => {
        dispatch(setTweetsLoadingState(LoadingStatus.NEVER));
        dispatch(fetchUserData());

        if (location.pathname !== SEARCH) {
            loadTweets();
        }
        document.body.style.overflow = "unset";
        window.scrollTo(0, 0);

        return () => {
            dispatch(resetTweets());
        };
    }, []);

    const newdata = async () => {
        dispatch(fetchWalletUser());
    };
    useEffect(() => {
        newdata();
    }, []);

    const loadTweets = (): void => {
        if (switchTweets) {
            dispatch(fetchFollowersTweets(page));
        } else {
            dispatch(fetchTweets(page));
        }
        setPage((prevState) => prevState + 1);
    };

    const handleLatestTweets = (): void => {
        dispatch(resetTweets());
        dispatch(fetchFollowersTweets(0));
        handleSwitchTweets(true);
    };

    const handleTopTweets = (): void => {
        dispatch(resetTweets());
        dispatch(fetchTweets(0));
        handleSwitchTweets(false);
    };

    const handleSwitchTweets = (condition: boolean): void => {
        setSwitchTweets(condition);
        setPage((prevState) => prevState + 1);
    };

    const handleGroup = (): void => {
        setIsGroupTab(true);
    };

    const handleChangeTab = (event: ChangeEvent<{}>, newValue: number): void => {
        setActiveTab(newValue);
        setIsGroupTab(newValue === 1); // Giả sử tab 'Nhóm Của Bạn' là index 1
    };

    return (
        <InfiniteScroll
            style={{ overflow: "unset" }}
            dataLength={tweets.length}
            next={loadTweets}
            hasMore={page < pagesCount}
            loader={null}
        >
            <Paper className={globalClasses.pageContainer} variant="outlined">
                <Paper className={classnames(globalClasses.pageHeader, classes.header)} variant="outlined">
                    <div className={classes.tabs}>
                        <Tabs value={activeTab} indicatorColor="primary" textColor="primary" onChange={handleChangeTab}>
                            <Tab className={classes.tab} label={t("for_you")} />
                            <Tab className={classes.tab} label={t("your-groups")}></Tab>
                        </Tabs>
                        {isGroupTab && <ListsHeader />}
                    </div>
                </Paper>

                {!isGroupTab ? (
                    <>
                        <div className={classes.addForm}>
                            <AddTweetForm title={t("whats_happening")} buttonName={t("tweet")} />
                        </div>

                        <div>
                            {!isProfileStarted ? (
                                <Welcome />
                            ) : (
                                <>
                                    {tweets.map((tweet) => (
                                        <TweetComponent key={tweet.id} tweet={tweet} />
                                    ))}
                                    {isLoading && <Spinner />}
                                </>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        <div className={classes.addForm}>
                            <ListsPage />
                        </div>
                    </>
                )}
            </Paper>
        </InfiniteScroll>
    );
};

export default withDocumentTitle(Home)("Home");
