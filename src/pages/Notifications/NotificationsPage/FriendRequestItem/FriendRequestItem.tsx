import React, { ReactElement, useEffect } from "react";
import { FriendRequestResponse } from "../../../../store/ducks/friendRequests/contract/state";
import { Avatar, Button, CircularProgress, Paper, Typography } from "@material-ui/core";
import { useFriendRequestItemStyle } from "./FriendRequestItemStyle";
import LinkWrapper from "../../../../components/LinkWrapper/LinkWrapper";
import { PROFILE } from "../../../../constants/path-constants";
import { HoverItemDetail, useHoverItem } from "../../../../hook/useHoverItem";
import { fetchUserDetail } from "../../../../store/ducks/userDetail/actionCreators";
import PopperUserWindow from "../../../../components/PopperUserWindow/PopperUserWindow";
import { useTranslation } from "react-i18next";
import { formatRelativeTime } from "../../../../util/format-date-helper";
import { LoadingStatus } from "../../../../types/common";
import { useDispatch } from "react-redux";
import {
    fetchAcceptFriendRequest,
    fetchDeleteFriendRequest
} from "../../../../store/ducks/friendRequests/actionCreators";
import { setOpenErrorSnackBar } from "../../../../store/ducks/actionSnackbar/actionCreators";

interface FrienRequestItemInterface {
    friendRequest: FriendRequestResponse;
}
export const FrienRequestItem: React.FC<FrienRequestItemInterface> = ({ friendRequest }): ReactElement => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const classes = useFriendRequestItemStyle();
    const { visiblePopperWindow, handleHoverPopper, handleLeavePopper } = useHoverItem(fetchUserDetail);
    const clickAccept = () => {
        if (friendRequest.status === "pending") {
            dispatch(
                fetchAcceptFriendRequest({
                    userId: friendRequest.userId,
                    requestId: friendRequest.id
                })
            );
        }
    };
    const clickDelete = () => {
        dispatch(
            fetchDeleteFriendRequest({
                userId: friendRequest.userId,
                requestId: friendRequest.id
            })
        );
    };
    useEffect(() => {
        if (friendRequest.acceptLoadingstatus === LoadingStatus.ERROR) {
            dispatch(setOpenErrorSnackBar(t("error")));
        }
    }, [friendRequest]);
    console.log("SSSSSSSSSSS", friendRequest);

    return (
        <div>
            <Paper
                className={classes.notificationWrapper}
                onMouseEnter={() => handleHoverPopper({ userId: friendRequest.userId } as HoverItemDetail)}
                onMouseLeave={handleLeavePopper}
            >
                <div className={classes.left}>
                    <LinkWrapper path={`${PROFILE}/${friendRequest.userId!}`} visiblePopperWindow={visiblePopperWindow}>
                        <div id={"userInfo"}>
                            <Avatar
                                className={classes.notificationAvatar}
                                src={friendRequest.avatar}
                                alt={friendRequest.avatar}
                            />
                            <PopperUserWindow visible={visiblePopperWindow} />
                        </div>
                    </LinkWrapper>
                    <LinkWrapper path={`${PROFILE}/${friendRequest.userId!}`} visiblePopperWindow={visiblePopperWindow}>
                        <Typography variant={"h6"} component={"span"}>
                            {friendRequest.fullName}
                        </Typography>
                        <div>
                            <i>{formatRelativeTime(friendRequest.created_at)}</i>
                        </div>
                    </LinkWrapper>
                </div>
                <div className={classes.buttons}>
                    <Button className={classes.acceptButton} onClick={clickAccept}>
                        {friendRequest.acceptLoadingstatus === LoadingStatus.LOADING ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : friendRequest.acceptLoadingstatus === LoadingStatus.SUCCESS ? (
                            t("accepted")
                        ) : (
                            t("confirm")
                        )}
                    </Button>
                    <div>
                        {" "}
                        {friendRequest.acceptLoadingstatus !== LoadingStatus.SUCCESS && (
                            <Button
                                onClick={clickDelete}
                                className={classes.deleteButton}
                                disabled={friendRequest.acceptLoadingstatus === LoadingStatus.LOADING}
                            >
                                {friendRequest.acceptLoadingstatus === LoadingStatus.LOADING ? (
                                    <CircularProgress size={24} color="inherit" />
                                ) : (
                                    t("delete")
                                )}
                            </Button>
                        )}
                    </div>
                </div>
            </Paper>
        </div>
    );
};
