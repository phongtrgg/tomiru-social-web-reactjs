import React, { FC, memo, ReactElement, useState } from "react";
import { Avatar, Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

import { useNotificationItemStyles } from "./NotificationItemStyles";
import { NotificationResponse } from "../../../../types/notification";
import { NotificationType } from "../../../../types/common";
import { LikeIcon, ListsIconFilled, ProfileIconFilled, RetweetIcon } from "../../../../icons";
import { DEFAULT_PROFILE_IMG } from "../../../../constants/url-constants";
import PopperUserWindow from "../../../../components/PopperUserWindow/PopperUserWindow";
import { textFormatter } from "../../../../util/text-formatter";
import { HoverItemDetail, useHoverItem } from "../../../../hook/useHoverItem";
import { HOME_TWEET, LISTS, NOTIFICATION, PROFILE } from "../../../../constants/path-constants";
import LinkWrapper from "../../../../components/LinkWrapper/LinkWrapper";
import { fetchUserDetail } from "../../../../store/ducks/userDetail/actionCreators";
import NotificationsPageAction from "../NotificationsPageAction/NotificationsPageAction";
import NotificationItemAction from "./NotificationItemAction/NotificationItemAction";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { markNotificationAsRead } from "../../../../store/ducks/notifications/actionCreators";
import { formatRelativeTime } from "../../../../util/format-date-helper";

export interface NotificationItemProps {
    notification: NotificationResponse;
}

const NotificationItem: FC<NotificationItemProps> = memo(({ notification }): ReactElement => {
    const classes = useNotificationItemStyles();
    const { t } = useTranslation();
    const { visiblePopperWindow, handleHoverPopper, handleLeavePopper } = useHoverItem(fetchUserDetail);
    const avatar = notification.user.avatar ?? DEFAULT_PROFILE_IMG;
    const dispatch = useDispatch();
    const clickNotification = () => {
        if (!notification.read) {
            dispatch(markNotificationAsRead(notification.id));
        }
    };
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    return (
        // <div
        //     path={
        //         notification.notificationType === NotificationType.FOLLOW
        //             ? `${PROFILE}/${notification.user.id}`
        //             : notification.notificationType === NotificationType.LISTS
        //             ? `${LISTS}/${notification.list.id}`
        //             : `${NOTIFICATION}/${notification.id}`
        //     }
        //     visiblePopperWindow={visiblePopperWindow}
        // >
        <div>
            <Paper
                className={classes.notificationWrapper}
                variant="outlined"
                style={{
                    position: "relative",
                    backgroundColor: isHovered ? "#e6f0ee" : notification.read ? "white" : "#e1faf7",
                    transition: "background-color 0.3s"
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* <div className={classes.notificationIcon} onClick={clickNotification}>
                    {notification.notificationType === NotificationType.LIKE && <span id={"like"}>{LikeIcon}</span>}
                    {notification.notificationType === NotificationType.RETWEET && (
                        <span id={"retweet"}>{RetweetIcon}</span>
                    )}
                    {notification.notificationType === NotificationType.FOLLOW && (
                        <span id={"follow"}>{ProfileIconFilled}</span>
                    )}
                    {notification.notificationType === NotificationType.BROWSE_LIST && (
                        <span id={"list"}>{ListsIconFilled}</span>
                    )}
                    {notification.notificationType === NotificationType.LISTS && (
                        <span id={"list"}>{ListsIconFilled}</span>
                    )}
                </div> */}
                <div style={{ display: "flex", flex: 1 }} onClick={clickNotification}>
                    <LinkWrapper path={`${PROFILE}/${notification.user.id!}`} visiblePopperWindow={visiblePopperWindow}>
                        <div
                            id={"userInfo"}
                            onMouseEnter={() => handleHoverPopper({ userId: notification.user.id } as HoverItemDetail)}
                            onMouseLeave={handleLeavePopper}
                        >
                            <Avatar className={classes.notificationAvatar} src={avatar} alt={avatar} />
                            <PopperUserWindow visible={visiblePopperWindow} />
                        </div>
                    </LinkWrapper>
                    <div className={classes.notificationInfo} onClick={clickNotification}>
                        <LinkWrapper
                            path={`${PROFILE}/${notification.user.id!}`}
                            visiblePopperWindow={visiblePopperWindow}
                        >
                            <div>
                                <Typography variant={"h6"} component={"span"}>
                                    {`${notification.user.username} `}
                                </Typography>
                                <Typography onClick={clickNotification} variant={"body1"} component={"span"}>
                                    {notification.notificationType === NotificationType.FOLLOW ? (
                                        <LinkWrapper
                                            path={`${PROFILE}/${notification.user.id!}`}
                                            visiblePopperWindow={visiblePopperWindow}
                                        >
                                            <>{t("have-followed-you")}</>
                                        </LinkWrapper>
                                    ) : notification.notificationType === NotificationType.LISTS ? (
                                        <>
                                            {`${t("added-you-to-their-list")} `}
                                            <Typography variant={"h6"} component={"span"}>
                                                {notification.list.listName}
                                            </Typography>
                                        </>
                                    ) : notification.notificationType === NotificationType.FRIEND ? (
                                        <>{`${t("have-accpeted-your-request")} `}</>
                                    ) : notification.notificationType === NotificationType.LIKE ||
                                      notification.notificationType === NotificationType.REPLY ||
                                      notification.notificationType === NotificationType.TWEET ? (
                                        <LinkWrapper
                                            path={`${HOME_TWEET}/${notification.tweet.id!}`}
                                            visiblePopperWindow={visiblePopperWindow}
                                        >
                                            <>
                                                {notification.notificationType === NotificationType.LIKE
                                                    ? t("like-your-tweet")
                                                    : t("comment-your-tweet")}{" "}
                                            </>
                                        </LinkWrapper>
                                    ) : notification.notificationType === NotificationType.BROWSE_LIST ? (
                                        <>
                                            {` ${t("request-to-join-group")} `}
                                            <Typography variant={"h6"} component={"span"}>
                                                {notification.list.listName}
                                            </Typography>
                                        </>
                                    ) : (
                                        <LinkWrapper
                                            path={`${HOME_TWEET}/${notification.tweet.id!}`}
                                            visiblePopperWindow={visiblePopperWindow}
                                        >
                                            <>{` ${t("shared-tweet")}`}</>
                                        </LinkWrapper>
                                    )}
                                </Typography>
                            </div>
                        </LinkWrapper>

                        <div>
                            <i>{formatRelativeTime(notification.date)}</i>
                        </div>
                    </div>
                    {/* <Typography variant={"body1"} component={"div"} className={classes.notificationText}>
                        {notification.tweet && textFormatter(notification.tweet.text)}
                    </Typography> */}
                </div>
                <NotificationItemAction id={notification.id} read={notification.read} />
            </Paper>
        </div>
    );
});

export default NotificationItem;
