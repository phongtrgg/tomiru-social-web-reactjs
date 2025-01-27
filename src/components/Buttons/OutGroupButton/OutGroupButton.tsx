import React, { FC, memo, ReactElement } from "react";
import { useDispatch } from "react-redux";
import { ListItem, Typography } from "@material-ui/core";

import { DeleteIcon } from "../../../icons";
import { deleteTweetReply } from "../../../store/ducks/tweet/actionCreators";
import { fetchDeleteTweet } from "../../../store/ducks/tweets/actionCreators";
import { setOpenSnackBar } from "../../../store/ducks/actionSnackbar/actionCreators";
import { useModalWindow } from "../../../hook/useModalWindow";
import TweetComponentActionsModal from "../../TweetComponentActions/TweetComponentActionsModal/TweetComponentActionsModal";
import { useTranslation } from "react-i18next";

interface DeleteTweetButtonProps {
    tweetId: number;
    addressedTweetId?: number;
    onCloseActionsDropdown: () => void;
}

const OutGroupButton: FC<DeleteTweetButtonProps> = memo(
    ({ tweetId, addressedTweetId, onCloseActionsDropdown }): ReactElement => {
        const { t } = useTranslation();
        const dispatch = useDispatch();
        const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();

        const onDeleteUserTweet = (): void => {
            if (addressedTweetId) {
                dispatch(deleteTweetReply(tweetId));
            } else {
                dispatch(fetchDeleteTweet(tweetId));
            }
            dispatch(setOpenSnackBar("Your Tweet was deleted"));
            onCloseModalWindow();
            onCloseActionsDropdown();
        };

        return (
            <>
                <ListItem id={"delete"} onClick={onOpenModalWindow}>
                    <>{DeleteIcon}</>
                    <Typography variant={"body1"} component={"span"}>
                        {t("delete-post")}
                    </Typography>
                </ListItem>
            </>
        );
    }
);

export default OutGroupButton;
