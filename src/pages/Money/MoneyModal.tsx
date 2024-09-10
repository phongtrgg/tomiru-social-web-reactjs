import React, { ChangeEvent, FC, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { Box, Divider, Grid, Paper, Tab, Tabs, Typography } from "@material-ui/core";
import classnames from "classnames";

import TweetComponent from "../../components/TweetComponent/TweetComponent";
import { useMoneyStyles } from "./MoneyStyles";
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

import { useGlobalStyles } from "../../util/globalClasses";
import { withDocumentTitle } from "../../hoc/withDocumentTitle";
import { SEARCH } from "../../constants/path-constants";
import { LoadingStatus } from "../../types/common";
import { useTranslation } from "react-i18next";
import img1 from "../../assets/kyc.png";
import img2 from "../../assets/Frame 427320685.png";
import img3 from "../../assets/QR code.png";
import img4 from "../../assets/tranfer.png";

const MoneyModal: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useMoneyStyles();
    const dispatch = useDispatch();
    const location = useLocation<{ background: Location }>();
    const isProfileStarted = useSelector(selectUserDataIsProfileStarted);
    const tweets = useSelector(selectTweetsItems);
    const isLoading = useSelector(selectIsTweetsLoading);
    const pagesCount = useSelector(selectPagesCount);
    const [switchTweets, setSwitchTweets] = React.useState<boolean>(false);
    const [page, setPage] = React.useState<number>(0);
    // new
    const [activeTab, setActiveTab] = useState<number>(0);
    const [searchText, setSearchText] = useState<string>("");
    const [isGroupTab, setIsGroupTab] = useState(false);

    const { t } = useTranslation();
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
                    <Typography variant={"h5"} component={"div"}>
                        Hướng Dẫn Đổi Mật Khẩu
                    </Typography>
                </Paper>

                <div className={classes.addForm}>
                    <div>
                        <iframe
                            style={{
                                borderRadius: "20px",
                                boxShadow: "0 0 10px 0 rgba(0,0,0,0.2)",
                                overflow: "hidden"
                            }}
                            width={560}
                            height={315}
                            src="https://www.youtube.com/embed/zSr41KMrXVY?si=8fiOwrTQ-5jcqHAK"
                            title="YouTube video player"
                            frameBorder={0}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        />
                        <Typography variant={"body1"} component={"div"}>
                            TOMIRU - Hướng Dẫn Lấy Lại Mật Khẩu Trên Ứng Dụng TOMIRU
                        </Typography>
                    </div>
                </div>
            </Paper>
        </InfiniteScroll>
    );
};

export default withDocumentTitle(MoneyModal)("MoneyModal");
