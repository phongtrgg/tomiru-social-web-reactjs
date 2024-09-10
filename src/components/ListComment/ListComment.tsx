import React, { FC, ReactElement, useEffect, useState } from "react";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import { Avatar, Divider, Link as MuiLink, Typography } from "@material-ui/core";
import classnames from "classnames";
import { formatDate } from "../../util/format-date-helper";
import { DEFAULT_PROFILE_IMG } from "../../constants/url-constants";
import { textFormatter } from "../../util/text-formatter";
import { Image } from "../../types/common";
import { useGlobalStyles } from "../../util/globalClasses";
import { UserTweetResponse } from "../../types/tweet";
import { useListCommentStyles } from "./ListCommentStyles";
import LikeIconButton from "../TweetComponent/LikeIconButton/LikeIconButton";
import ReplyIconButton from "../TweetComponent/ReplyIconButton/ReplyIconButton";
import ShareTweetIconButton from "../ShareTweetIconButton/ShareTweetIconButton";
import Container from "@mui/material/Container";
import TweetComponent from "../TweetComponent/TweetComponent";
import { TweetApi } from "../../services/api/tweet-service/tweetApi";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import ActionIconButton from "../ActionIconButton/ActionIconButton";
import { ReplyIcon } from "../../icons";
import Reply from "../Reply/Reply";
import { title } from "process";
import { t } from "i18next";
import { useDispatch } from "react-redux";
import { fetchTweetsByListId } from "../../store/ducks/list/actionCreators";
import { fetchTweets, resetTweets } from "../../store/ducks/tweets/actionCreators";
interface ReplyModalProps {
    replies?: any;
    tweet: any;
    author: UserTweetResponse;
    tweetId: number;
    text: string;
    image?: Image;
    createdAt: string;
    visible?: boolean;
    onClose: () => void;
}

const ListComment: FC<ReplyModalProps> = ({
    tweet,
    author,
    tweetId,
    text,
    image,
    createdAt,
    visible,
    onClose
}): ReactElement | null => {
    const globalClasses = useGlobalStyles({});
    const classes = useListCommentStyles();
    const [replies, setReplies] = useState<any[]>([]);
    const dispatch = useDispatch();
    const data = async () => {
        const response: any = await TweetApi.getRepliesByTweetId(tweetId);

        setReplies(response.data);
    };
    useEffect(() => {
        try {
            data();
        } catch (error) {
            console.error("Failed to fetch retweeted users:", error);
        }
    }, []);

    if (!visible) {
        return null;
    }
    const ReplyCheck = () => {
        data();
        // dispatch(resetTweets());
        // dispatch(fetchTweets(0));
    };

    return (
        <Dialog className={classes.dialogWrapper} open={visible} onClose={onClose}>
            {/* <DialogTitleComponent onClose={onClose} /> */}
            <DialogContent className={classes.container}>
                <div style={{ paddingBottom: 150 }}>
                    <Container className={classes.modalWrapper}>
                        <Avatar
                            className={classnames(globalClasses.avatar, classes.avatar)}
                            alt={`avatar ${author.id}`}
                            src={author.avatar ?? DEFAULT_PROFILE_IMG}
                        />

                        <div>
                            <div className={classes.header}>
                                <div>
                                    <Typography variant={"h6"} component={"span"}>
                                        {author.fullName}
                                    </Typography>
                                    &nbsp;
                                    <Typography variant={"subtitle1"} component={"span"}>
                                        @{author.username}
                                    </Typography>
                                    &nbsp;
                                    <Typography variant={"subtitle1"} component={"span"}>
                                        ·
                                    </Typography>
                                    &nbsp;
                                    <Typography variant={"subtitle1"} component={"span"}>
                                        {formatDate(new Date(createdAt))}
                                    </Typography>
                                </div>
                            </div>
                            <span className={classes.text}>{textFormatter(text)}</span>
                            {image && (
                                <div className={classes.image}>
                                    <img src={image?.src} alt={image?.src} />
                                </div>
                            )}
                        </div>
                        <div className={classes.footer}>
                            <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10 }}>
                                <FavoriteOutlinedIcon style={{ color: "red", fontSize: 15 }} />
                                <span>{tweet?.likesCount}</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 50 }}>
                                <div>
                                    <ActionIconButton actionText={"Reply"} icon={ReplyIcon} />
                                    <span style={{ fontSize: 10 }}>{tweet?.repliesCount}</span>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                                    <ShareTweetIconButton tweetId={tweet!.id} />
                                    <span style={{ fontSize: 10 }}>{tweet?.retweetsCount}</span>
                                </div>
                            </div>
                        </div>
                        <Divider />
                    </Container>
                    <Container>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <LikeIconButton check={true} tweetId={tweet?.id} isTweetLiked={tweet?.isTweetLiked} />
                                <span>Thích</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                                <ReplyIconButton
                                    tweet={tweet}
                                    tweetId={tweet?.id}
                                    text={tweet?.text}
                                    image={tweet?.images?.[0]}
                                    createdAt={tweet?.createdAt}
                                    tweetAuthor={tweet?.author}
                                    repliesCount={0}
                                    disabled={true}
                                />
                                <span style={{ width: "100%" }}>{"Bình Luận"}</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                                <ShareTweetIconButton tweetId={tweet!.id} />
                                <span>{"Chia sẻ"}</span>
                            </div>
                        </div>
                    </Container>
                    {/* Hiển thị phần retweeted users */}
                    <Container style={{ width: "100%", overflow: "hidden" }}>
                        <>
                            {replies?.map((tweet, index) => (
                                <>
                                    <TweetComponent key={tweet.id} tweet={tweet} />
                                </>
                            ))}
                        </>
                    </Container>
                </div>
                <Container
                    className={classes.container}
                    style={{
                        marginTop: 10,
                        position: "absolute",
                        bottom: 0,
                        overflow: "hidden",
                        left: 0,
                        backgroundColor: "white"
                    }}
                >
                    {/* <Divider /> */}
                    <Reply
                        minRows={3}
                        tweetId={tweetId}
                        addressedUsername={author.username}
                        addressedId={author.id}
                        title={t("Write a Comment")}
                        buttonName={"Reply"}
                        onCloseModal={ReplyCheck}
                        reload={data}
                    />
                </Container>
            </DialogContent>
        </Dialog>
    );
};

export default ListComment;
