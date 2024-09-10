import React, { ChangeEvent, FC, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { Box, Divider, Grid, Paper, Tab, Tabs, Typography } from "@material-ui/core";
import classnames from "classnames";

import TweetComponent from "../../components/TweetComponent/TweetComponent";
import { useSupportStyles } from "./SupportStyles";
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
import img3 from "../../assets/Frame 427320685.png";
import img2 from "../../assets/QR code.png";
import img4 from "../../assets/tranfer.png";

const Support: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useSupportStyles();
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
                        Chúng tôi có thể giúp gì cho bạn?
                    </Typography>
                </Paper>

                <div className={classes.addForm}>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        {" "}
                        <div className={classes.card}>
                            <div>
                                <img src={img1} alt="" style={{ width: "80%" }} />
                            </div>
                            <span style={{ textAlign: "center", paddingTop: "70px" }}>Hướng dẫn về KYC</span>
                        </div>
                        <div className={classes.card}>
                            {" "}
                            <div>
                                <img src={img2} alt="" style={{ width: "80%" }} />
                            </div>
                            <span style={{ textAlign: "center", paddingTop: "20px" }}>Hướng dẫn gửi mã giới thiệu</span>
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        {" "}
                        <div className={classes.card}>
                            {" "}
                            <div>
                                <img src={img3} alt="" style={{ width: "80%" }} />
                            </div>
                            <span style={{ textAlign: "center", paddingTop: "23px" }}>Hướng dẫn đổi mật khẩu</span>
                        </div>
                        <div className={classes.card}>
                            {" "}
                            <div>
                                <img src={img4} alt="" style={{ width: "80%" }} />
                            </div>
                            <span style={{ textAlign: "center", marginTop: "35px" }}>Hướng dẫn chuyển nhận TOMXU</span>
                        </div>
                    </div>
                </div>
            </Paper>
        </InfiniteScroll>
    );
};

export default withDocumentTitle(Support)("Support");
