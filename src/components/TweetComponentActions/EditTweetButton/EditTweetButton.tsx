import React, { FC, memo, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Divider, ListItem, Snackbar, TextareaAutosize, Typography } from "@material-ui/core";
import { CloseIcon, DeleteIcon, EditIcon, EditIconTweet } from "../../../icons";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import ProfileAvatar from "../../AddTweetForm/ProfileAvatar/ProfileAvatar";
import Poll from "../../AddTweetForm/Poll/Poll";
import { useAddTweetFormStyles } from "../../AddTweetForm/AddTweetFormStyles";
import ScheduleDateInfo from "../../AddTweetForm/ScheduleDateInfo/ScheduleDateInfo";
import TweetHeader from "../../TweetComponent/TweetHeader/TweetHeader";
import EditModalImage from "../../AddTweetForm/AddTweetImage/EditModalImage";
import UploadEditImg from "../../UploadImages/UploadEditImg";
import { uploadEditImage } from "../../../util/upload-image-helper";

import {
    editTweetRequest,
    fetchTweets,
    getTweetRequest,
    resetTweets
} from "../../../store/ducks/tweets/actionCreators";
import { TweetResponse } from "../../../types/tweet";
import {
    getTweetById,
    selectErrorMessage,
    selectIsTweetsLoading,
    selectLoadingState
} from "../../../store/ducks/tweets/selectors";
import { RootState } from "../../../store/store";
import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { fetchUserTweets, resetUserTweets } from "../../../store/ducks/userTweets/actionCreators";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { editTweetRequestSaga } from "../../../store/ducks/tweets/sagas";
import { setOpenErrorSnackBar, setOpenSnackBar } from "../../../store/ducks/actionSnackbar/actionCreators";
import { LoadingStatus } from "../../../types/common";
const css = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    border: "none",
    outline: "none"
};

interface EditTweetButtonProps {
    tweet?: TweetResponse;
    tweetId: number;
    addressedTweetId?: number;
    onCloseActionsDropdown: () => void;
}

interface Image {
    id: number;
    src: string;
}

const EditTweetButton: FC<EditTweetButtonProps> = memo(
    ({ tweet, tweetId, addressedTweetId, onCloseActionsDropdown }): ReactElement => {
        const dispatch = useDispatch();
        const [open, setOpen] = React.useState(false);
        const handleOpen = () => setOpen(true);
        const handleClose = () => {
            setOpen(false);
        };
        const classes = useAddTweetFormStyles();
        const history = useHistory();
        const location = useLocation();

        const tweetSelected = useSelector((state: RootState) => getTweetById(tweetId)(state));
        const [text, setText] = useState<string>("");
        const [newImagTweet, setNewImagTweet] = useState<Image[]>([]);
        const [changeImg, setChangImg] = useState<boolean>(false);
        const params = useParams<{ userId: string }>();

        useEffect(() => {
            if (tweetId) {
                dispatch(getTweetRequest(tweetId));
            }
        }, [dispatch, tweetId]);
        useEffect(() => {
            if (tweet) {
                setText(tweet?.text);
                setChangImg(false);
            }
        }, [tweet]);
        const handleChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setText(event.target.value);
        };
        const takeNewImage = async (event: any) => {
            const file = event.target.files[0];
            if (file) {
                try {
                    const uploadedImageUrl = await uploadEditImage(file);
                    setNewImagTweet([{ id: uploadedImageUrl.id, src: uploadedImageUrl.src }]);
                    setChangImg(true);
                } catch (error) {
                    console.error("Failed to upload image:", error);
                }
            }
        };
        // useEffect(() => {
        //     dispatch(fetchTweets(0));
        // }, []);
        const handleEditTweet = () => {
            if (tweet) {
                const updateTweet = {
                    ...tweet,
                    text: text,
                    images: changeImg ? (newImagTweet as Image[]) : tweet.images
                };
                // dispatch(setOpenErrorSnackBar(t("You-have-successfully-left-the-group")));
                dispatch(editTweetRequest(updateTweet));
            }
        };

        const loadingStatus = useSelector(selectLoadingState);
        const errorMessage = useSelector(selectErrorMessage);
        useEffect(() => {
            if (loadingStatus === LoadingStatus.SUCCESS) {
                dispatch(setOpenSnackBar(t("Post edited successfully")));
                dispatch(resetTweets());
                dispatch(fetchTweets(0));
                dispatch(resetUserTweets());
                dispatch(fetchUserTweets({ userId: params.userId, page: 0 }));

                handleClose();
                history.push(location.pathname);
                onCloseActionsDropdown();
            }

            if (loadingStatus === LoadingStatus.ERROR) {
                dispatch(setOpenErrorSnackBar(errorMessage ? errorMessage : t("Post edited failed")));
            }
        }, [loadingStatus]);

        const handleRemoveImage = () => {
            setNewImagTweet([]);
            setChangImg(true);
        };
        return (
            <>
                <ListItem id={"delete"} onClick={handleOpen}>
                    <>{EditIcon}</>
                    <Typography variant={"body1"} component={"span"}>
                        {t("edit-post")}
                    </Typography>
                </ListItem>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={css}>
                        <div style={{ textAlign: "center", padding: "0px 0px 20px 0px" }}>
                            <h3>{t("edit-post")}</h3>
                        </div>{" "}
                        <Divider style={{ marginBottom: "20px" }} />
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "left" }}>
                            {" "}
                            <ProfileAvatar />
                            <div style={{ marginLeft: "20px" }}>
                                <TweetHeader
                                    userId={tweet?.author?.id}
                                    fullName={tweet?.author?.fullName}
                                    username={tweet?.author?.username}
                                    isPrivateProfile={tweet?.author?.isPrivateProfile}
                                    dateTime={tweet!.createdAt}
                                />
                            </div>
                        </div>
                        <div className={classes.textareaWrapper}>
                            <ScheduleDateInfo />
                            <TextareaAutosize
                                onChange={handleChangeText}
                                className={classes.contentTextarea}
                                value={text}
                                style={{ resize: "none" }}
                                maxRows={5}
                            />
                        </div>
                        <div className={classes.formItems}>
                            {changeImg ? (
                                <div style={{ position: "relative" }}>
                                    <EditModalImage imagesTweet={newImagTweet[0]?.src} />
                                </div>
                            ) : (
                                <div style={{ position: "relative" }}>
                                    <EditModalImage
                                        imagesTweet={tweet?.images.length ? tweet?.images[0].src : undefined}
                                        onRemove={handleRemoveImage}
                                    />
                                </div>
                            )}
                            <Poll />
                        </div>
                        <Divider style={{ marginBottom: "20px", marginTop: "20px" }} />
                        <div className={classes.footer}>
                            <div className={classes.footerWrapper}>
                                <UploadEditImg newImg={takeNewImage} />

                                {/* <UploadImages /> */}
                            </div>
                            <div className={classes.footerAddForm}>
                                <Button color="primary" variant="contained" onClick={handleEditTweet}>
                                    {t("save")}
                                </Button>
                            </div>
                        </div>
                    </Box>
                </Modal>
            </>
        );
    }
);

export default EditTweetButton;
