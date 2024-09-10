import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import "emoji-mart/css/emoji-mart.css";

import {
    addPoll,
    addQuoteTweet,
    addScheduledTweet,
    addTweet,
    updateScheduledTweet
} from "../../store/ducks/tweets/actionCreators";
import { fetchReplyTweet } from "../../store/ducks/tweet/actionCreators";

import Quote from "../Quote/Quote";
import { formatScheduleDate } from "../../util/format-date-helper";
import { QuoteTweetResponse, TweetResponse } from "../../types/tweet";
import { Image } from "../../types/common";
import { setOpenSnackBar } from "../../store/ducks/actionSnackbar/actionCreators";

import { useParams } from "react-router-dom";
import { TweetApi } from "../../services/api/tweet-service/tweetApi";
import { useInputText } from "../../hook/useInputText";
import { BaseListResponse } from "../../types/lists";
import GifImage from "../GifImage/GifImage";

import { MAX_TEXT_LENGTH } from "../../constants/common-constants";
import {
    selectGif,
    selectImageDescription,
    selectImages,
    selectPollData,
    selectReplyType,
    selectScheduledDate,
    selectSelectedUsers,
    selectVisiblePoll
} from "../../store/ducks/addTweetForm/selector";
import { resetAddTweetFormState, setImages, setScheduleDate } from "../../store/ducks/addTweetForm/actionCreators";
import { useAddTweetFormStyles } from "../AddTweetForm/AddTweetFormStyles";
import ProfileAvatar from "../AddTweetForm/ProfileAvatar/ProfileAvatar";
import ScheduleDateInfo from "../AddTweetForm/ScheduleDateInfo/ScheduleDateInfo";
import AddTweetImage from "../AddTweetForm/AddTweetImage/AddTweetImage";
import TweetListComponent from "../TweetListComponent/TweetListComponent";
import TextCountProgress from "../AddTweetForm/TextCountProgress/TextCountProgress";
import { t } from "i18next";

export interface AddTweetFormProps {
    unsentTweet?: TweetResponse;
    quoteTweet?: QuoteTweetResponse;
    tweetList?: BaseListResponse;
    maxRows?: number;
    minRows?: number;
    tweetId?: number;
    title?: string;
    buttonName?: string;
    addressedUsername?: string;
    addressedId?: number;
    onCloseModal?: () => void;
    reload?: () => void;
}

export interface ImageObj {
    src: string;
    file: File;
}

const Reply: FC<AddTweetFormProps> = ({
    unsentTweet,
    quoteTweet,
    tweetList,
    maxRows,
    minRows,
    tweetId,
    title,
    buttonName,
    addressedUsername,
    addressedId,
    reload,
    onCloseModal
}): ReactElement => {
    const classes = useAddTweetFormStyles();
    const dispatch = useDispatch();
    const params = useParams<{ userId: string }>();
    const visiblePoll = useSelector(selectVisiblePoll);
    const pollData = useSelector(selectPollData);
    const gif = useSelector(selectGif);
    const scheduledDate = useSelector(selectScheduledDate);
    const replyType = useSelector(selectReplyType);
    const imageDescription = useSelector(selectImageDescription);
    const images = useSelector(selectImages);
    const selectedUsers = useSelector(selectSelectedUsers);
    const { text, setText, handleChangeText, addEmoji, textConverter } = useInputText();

    useEffect(() => {
        if (unsentTweet) {
            setText(unsentTweet.text);
            dispatch(setScheduleDate(new Date(unsentTweet.scheduledDate!)));
            if (unsentTweet.images?.length !== 0) {
                const newImages = [...images];
                const newImage = { ...images[0] };
                newImage.src = unsentTweet.images![0].src;
                newImages[0] = newImage;
                dispatch(setImages(newImages));
            }
        }
    }, [unsentTweet]);

    const handleClickAddTweet = async (): Promise<void> => {
        const tweet = await tweetPreProcessing();

        if (visiblePoll) {
            const { day, hour, minute, choice1, choice2, choice3, choice4 } = pollData;
            const pollDateTime = day * 1440 + hour * 60 + minute;
            const choices = [choice1, choice2, choice3, choice4].filter((item) => item);
            dispatch(addPoll({ ...tweet, pollDateTime, choices }));
        } else if (scheduledDate !== null && unsentTweet === undefined) {
            dispatch(addScheduledTweet({ ...tweet, scheduledDate }));
        } else if (unsentTweet) {
            dispatch(updateScheduledTweet({ ...tweet, id: unsentTweet?.id }));
            if (onCloseModal) onCloseModal();
        } else {
            dispatch(addTweet(tweet));
        }
        tweetPostProcessing(
            scheduledDate ? `Your Tweet will be sent on ${formatScheduleDate(scheduledDate)}` : "Your Tweet was sent."
        );
    };

    const handleClickQuoteTweet = async (): Promise<void> => {
        const tweet = await tweetPreProcessing();
        dispatch(addQuoteTweet({ ...tweet, tweetId: quoteTweet!.id, userId: params.userId }));
        tweetPostProcessing();
    };

    const handleClickReplyTweet = async (): Promise<void> => {
        const tweet = await tweetPreProcessing();

        dispatch(
            fetchReplyTweet({
                ...tweet,
                tweetId: tweetId!,
                userId: params.userId,
                addressedUsername: addressedUsername!,
                addressedId: addressedId!,
                text: text
            })
        );
        tweetPostProcessing();
        if (reload) {
            reload();
        }
    };

    const tweetPreProcessing = async () => {
        let result: Array<Image> = [];

        for (const image of images) {
            const formData = new FormData();
            formData.append("file", image.file);
            const { data } = await TweetApi.uploadTweetImage(formData);
            result.push(data);
        }
        const taggedImageUsers = selectedUsers.map((user) => user.id);
        return {
            text: textConverter(),
            listId: tweetList?.id,
            gifImage: gif?.images.downsized,
            images: result,
            imageDescription,
            taggedImageUsers,
            replyType
        };
    };

    const tweetPostProcessing = (snackBarText?: string): void => {
        dispatch(setOpenSnackBar(snackBarText ?? t("Your tweet was sent")));
        dispatch(resetAddTweetFormState());
        setText("");
        if (onCloseModal) onCloseModal();
    };

    return (
        <>
            <div style={{ padding: 5 }}>
                {" "}
                <div className={classes.content} style={{ marginLeft: 6 }}>
                    <ProfileAvatar />
                    <div className={classes.textareaWrapper}>
                        <ScheduleDateInfo />
                        <TextareaAutosize
                            style={{
                                backgroundColor: "rgb(229, 229, 229)",
                                borderRadius: 20,
                                padding: 10,
                                fontSize: 18
                            }}
                            onChange={handleChangeText}
                            className={classes.contentTextarea}
                            placeholder={visiblePoll ? "Ask a question..." : title}
                            value={text}
                            maxRows={maxRows}
                            minRows={images.length !== 0 ? 1 : minRows}
                        />
                    </div>
                </div>
                <div className={classes.formItems}>
                    <AddTweetImage />
                    {gif && <GifImage gifImage={gif.images.downsized} removeButton />}
                    {quoteTweet && <Quote quoteTweet={quoteTweet} />}
                    {tweetList && <TweetListComponent tweetList={tweetList} />}
                </div>
                {/* <Reply isUnsentTweet={!!unsentTweet} /> */}
                <div className={classes.footer}>
                    <div className={classes.footerWrapper}>
                        {/* <UploadImages /> */}
                        {/* <GifIconButton />
                    <PollIconButton buttonName={buttonName} disabled={!!quoteTweet || scheduledDate !== null} />
                    <EmojiIconButton addEmoji={addEmoji} />
                    <ScheduleIconButton buttonName={buttonName} disabled={!!quoteTweet} /> */}
                    </div>
                    <div className={classes.footerAddForm} style={{ marginBottom: 10 }}>
                        <TextCountProgress text={text} />
                        <Button
                            onClick={
                                buttonName === "Reply"
                                    ? handleClickReplyTweet
                                    : quoteTweet !== undefined
                                    ? handleClickQuoteTweet
                                    : handleClickAddTweet
                            }
                            disabled={
                                visiblePoll
                                    ? !pollData.choice1 || !pollData.choice2 || !text || text.length >= MAX_TEXT_LENGTH
                                    : !gif && (!text || text.length >= MAX_TEXT_LENGTH)
                            }
                            color="primary"
                            variant="contained"
                        >
                            {buttonName}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Reply;
