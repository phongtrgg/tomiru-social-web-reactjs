import React, { ChangeEvent, FC, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { Box, Divider, Grid, Paper, Tab, Tabs, Typography } from "@material-ui/core";
import classnames from "classnames";
import Modal from "@mui/material/Modal";
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
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { useGlobalStyles } from "../../util/globalClasses";
import { withDocumentTitle } from "../../hoc/withDocumentTitle";
import { SEARCH } from "../../constants/path-constants";
import { LoadingStatus } from "../../types/common";
import { useTranslation } from "react-i18next";
import AccessAlarmsOutlinedIcon from "@mui/icons-material/AccessAlarmsOutlined";
import icon from "../../assets/icon.png";
import img1 from "../../assets/Layer 4.png";
import img2 from "../../assets/money2.png";
import img3 from "../../assets/money3.png";
import img4 from "../../assets/money4.png";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
const Money: FC = (): ReactElement => {
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
    const style = {
        position: "absolute" as "absolute",
        top: "40%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "none",
        outline: "none",
        p: 3,
        borderRadius: "20px"
    };
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "left",
                            alignItems: "center",
                            gap: "10px",
                            padding: "10px",
                            marginBottom: "10px"
                        }}
                    >
                        {" "}
                        <span>
                            {" "}
                            <PaidOutlinedIcon />
                        </span>
                        <span style={{ fontWeight: "700", fontSize: "20px" }}>Quỹ đồng chia 1</span>
                    </div>
                    <Divider />
                    <div style={{ marginTop: "10px" }}>
                        <span style={{ fontSize: "14px" }}>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore iste nam quidem
                            cupiditate ipsa aut at sunt impedit a corrupti quos, quo id natus, veniam ipsum aliquam rem
                            soluta non?
                        </span>
                    </div>
                </Box>
            </Modal>

            <InfiniteScroll
                style={{ overflow: "unset" }}
                dataLength={tweets.length}
                next={loadTweets}
                hasMore={page < pagesCount}
                loader={null}
            >
                <Paper className={globalClasses.pageContainer} variant="outlined">
                    <Paper className={classnames(globalClasses.pageHeader, classes.header)} variant="outlined">
                        <Typography variant={"body1"} component={"div"}>
                            <span style={{ marginLeft: "32px", fontWeight: "600", fontSize: "32px" }}>
                                {" "}
                                Quỹ đồng chia
                            </span>
                        </Typography>
                    </Paper>

                    <div className={classes.addForm}>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            {" "}
                            <div className={classes.card}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        gap: "10px"
                                    }}
                                >
                                    <span style={{ fontSize: "24px", fontWeight: "600" }}>Quỹ 1-10%</span>
                                    <HelpOutlineOutlinedIcon onClick={handleOpen} />
                                </div>
                                <div style={{ padding: "20px 0" }}>
                                    <img src={img1} alt="" style={{ width: "80%" }} />
                                </div>
                                <div>
                                    {" "}
                                    <div
                                        style={{
                                            display: "flex",

                                            alignItems: "center",
                                            gap: "5px",
                                            textAlign: "left"
                                        }}
                                    >
                                        <span style={{ fontSize: "32px", fontWeight: "600", textAlign: "left" }}>
                                            1,123.12
                                        </span>
                                        <div
                                            style={{
                                                marginTop: "10px",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                gap: "5px"
                                            }}
                                        >
                                            {" "}
                                            <span style={{ marginLeft: "5px", fontSize: "16px", fontWeight: "400" }}>
                                                Tomxu
                                            </span>
                                            <img src={icon} alt="" />
                                        </div>
                                    </div>
                                    <div style={{ padding: "5px ", marginLeft: "-12px" }}>
                                        <span style={{ fontSize: "16px", fontWeight: "700" }}>XX</span>
                                        <span style={{ marginLeft: "5px", fontSize: "8px", fontWeight: "400" }}>
                                            thành viên hợp lệ sẽ được nhận thưởng̣
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            display: "flex",

                                            alignItems: "center",
                                            gap: "5px",
                                            textAlign: "left"
                                        }}
                                    >
                                        <span>
                                            <AccessAlarmsOutlinedIcon />
                                        </span>
                                        <span>03d</span>: <span>12h</span>: <span>24m</span>: <span>60s</span>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.card}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        gap: "10px"
                                    }}
                                >
                                    <span style={{ fontSize: "24px", fontWeight: "600" }}>Quỹ 1-10%</span>
                                    <HelpOutlineOutlinedIcon onClick={handleOpen} />
                                </div>
                                <div style={{ padding: "20px 0" }}>
                                    <img src={img2} alt="" style={{ width: "80%" }} />
                                </div>
                                <div>
                                    {" "}
                                    <div
                                        style={{
                                            display: "flex",

                                            alignItems: "center",
                                            gap: "5px",
                                            textAlign: "left"
                                        }}
                                    >
                                        <span style={{ fontSize: "32px", fontWeight: "600", textAlign: "left" }}>
                                            1,123.12
                                        </span>
                                        <div
                                            style={{
                                                marginTop: "10px",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                gap: "5px"
                                            }}
                                        >
                                            {" "}
                                            <span style={{ marginLeft: "5px", fontSize: "16px", fontWeight: "400" }}>
                                                Tomxu
                                            </span>
                                            <img src={icon} alt="" />
                                        </div>
                                    </div>
                                    <div style={{ padding: "5px ", marginLeft: "-12px" }}>
                                        <span style={{ fontSize: "16px", fontWeight: "700" }}>XX</span>
                                        <span style={{ marginLeft: "5px", fontSize: "8px", fontWeight: "400" }}>
                                            thành viên hợp lệ sẽ được nhận thưởng̣
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            display: "flex",

                                            alignItems: "center",
                                            gap: "5px",
                                            textAlign: "left"
                                        }}
                                    >
                                        <span>
                                            <AccessAlarmsOutlinedIcon />
                                        </span>
                                        <span>03d</span>: <span>12h</span>: <span>24m</span>: <span>60s</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                            {" "}
                            <div className={classes.card}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        gap: "10px"
                                    }}
                                >
                                    <span style={{ fontSize: "24px", fontWeight: "600" }}>Quỹ 1-10%</span>
                                    <HelpOutlineOutlinedIcon onClick={handleOpen} />
                                </div>
                                <div style={{ padding: "20px 0" }}>
                                    <img src={img3} alt="" style={{ width: "80%" }} />
                                </div>
                                <div>
                                    {" "}
                                    <div
                                        style={{
                                            display: "flex",

                                            alignItems: "center",
                                            gap: "5px",
                                            textAlign: "left"
                                        }}
                                    >
                                        <span style={{ fontSize: "32px", fontWeight: "600", textAlign: "left" }}>
                                            1,123.12
                                        </span>
                                        <div
                                            style={{
                                                marginTop: "10px",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                gap: "5px"
                                            }}
                                        >
                                            {" "}
                                            <span style={{ marginLeft: "5px", fontSize: "16px", fontWeight: "400" }}>
                                                Tomxu
                                            </span>
                                            <img src={icon} alt="" />
                                        </div>
                                    </div>
                                    <div style={{ padding: "5px ", marginLeft: "-12px" }}>
                                        <span style={{ fontSize: "16px", fontWeight: "700" }}>XX</span>
                                        <span style={{ marginLeft: "5px", fontSize: "8px", fontWeight: "400" }}>
                                            thành viên hợp lệ sẽ được nhận thưởng̣
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            display: "flex",

                                            alignItems: "center",
                                            gap: "5px",
                                            textAlign: "left"
                                        }}
                                    >
                                        <span>
                                            <AccessAlarmsOutlinedIcon />
                                        </span>
                                        <span>03d</span>: <span>12h</span>: <span>24m</span>: <span>60s</span>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.card}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        gap: "10px"
                                    }}
                                >
                                    <span style={{ fontSize: "24px", fontWeight: "600" }}>Quỹ 1-10%</span>
                                    <HelpOutlineOutlinedIcon onClick={handleOpen} />
                                </div>
                                <div style={{ padding: "4px 0 " }}>
                                    <img src={img4} alt="" style={{ width: "80%" }} />
                                </div>
                                <div>
                                    {" "}
                                    <div
                                        style={{
                                            display: "flex",

                                            alignItems: "center",
                                            gap: "5px",
                                            textAlign: "left"
                                        }}
                                    >
                                        <span style={{ fontSize: "32px", fontWeight: "600", textAlign: "left" }}>
                                            1,123.12
                                        </span>
                                        <div
                                            style={{
                                                marginTop: "10px",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                gap: "5px"
                                            }}
                                        >
                                            {" "}
                                            <span style={{ marginLeft: "5px", fontSize: "16px", fontWeight: "400" }}>
                                                Tomxu
                                            </span>
                                            <img src={icon} alt="" />
                                        </div>
                                    </div>
                                    <div style={{ padding: "5px ", marginLeft: "-12px" }}>
                                        <span style={{ fontSize: "16px", fontWeight: "700" }}>XX</span>
                                        <span style={{ marginLeft: "5px", fontSize: "8px", fontWeight: "400" }}>
                                            thành viên hợp lệ sẽ được nhận thưởng̣
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            display: "flex",

                                            alignItems: "center",
                                            gap: "5px",
                                            textAlign: "left"
                                        }}
                                    >
                                        <span>
                                            <AccessAlarmsOutlinedIcon />
                                        </span>
                                        <span>03d</span>: <span>12h</span>: <span>24m</span>: <span>60s</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Paper>
            </InfiniteScroll>
        </>
    );
};

export default withDocumentTitle(Money)("Money");
