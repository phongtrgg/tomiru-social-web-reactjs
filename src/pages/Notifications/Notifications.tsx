import React, { ChangeEvent, FC, ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Tabs from "@material-ui/core/Tabs";
import Paper from "@material-ui/core/Paper";
import classnames from "classnames";

import { useNotificationsStyles } from "./NotificationsStyles";
import { useGlobalStyles } from "../../util/globalClasses";
import { withDocumentTitle } from "../../hoc/withDocumentTitle";
import NotificationsPage from "./NotificationsPage/NotificationsPage";
import NotificationsPageAction from "./NotificationsPage/NotificationsPageAction/NotificationsPageAction";
import { useTranslation } from "react-i18next";
import { selectNotificationsList } from "../../store/ducks/notifications/selectors";
import { NotificationResponse } from "../../types/notification";
import { NotificationType } from "../../types/common";
import { selectFriendRequestsList } from "../../store/ducks/friendRequests/selectors";
import { NotificationTab } from "./NotificationsPage/NofificationTab";

const Notifications: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useNotificationsStyles();
    // const history = useHistory();
    const [showFriendRequest, setShowFriendRequest] = useState<boolean>(false);
    const notifications = useSelector(selectNotificationsList);

    const friendRequests = useSelector(selectFriendRequestsList);
    const friendRequestsCount = friendRequests.filter((f) => f.status === "pending").length;

    const tweetNotifications = notifications.filter(
        (n: NotificationResponse) =>
            n.notificationType === NotificationType.TWEET ||
            n.notificationType === NotificationType.LIKE ||
            n.notificationType === NotificationType.REPLY
    );
    const notReadYetTweets = tweetNotifications.filter((n) => !n.read);
    const notReadYetTweetsCount = notReadYetTweets.length;
    const accountNotifications = notifications.filter(
        (n) =>
            n.notificationType === NotificationType.LISTS ||
            n.notificationType === NotificationType.FOLLOW ||
            n.notificationType === NotificationType.FRIEND
    );
    const notReadYetAccounts = accountNotifications.filter((n) => !n.read);
    const notReadYetAccountCount = notReadYetAccounts.length;
    const [notificationsToShow, setNotificationsToShow] = useState<NotificationResponse[]>([]);

    const notReadYetNotifications = notifications.filter((n) => !n.read);
    const notReadYetNotificationsCount = notReadYetNotifications.length;
    // const notReads = notifications.filter((n)=>n.r)
    const [activeTab, setActiveTab] = useState<number>(0);
    const { t } = useTranslation();
    const handleChangeTab = (event: ChangeEvent<{}>, newValue: number): void => {
        // history.push(NOTIFICATIONS);

        setActiveTab(newValue);
    };

    useEffect(() => {
        switch (activeTab) {
            case 0:
                setNotificationsToShow(notifications);
                setShowFriendRequest(false);
                break;
            case 1:
                setNotificationsToShow(tweetNotifications);
                setShowFriendRequest(false);
                break;
            case 2:
                setNotificationsToShow(accountNotifications);
                setShowFriendRequest(false);
                break;
            case 3:
                setShowFriendRequest(true);
                break;
            default:
                break;
        }
    }, [activeTab, notifications]);

    return (
        <Paper className={globalClasses.pageContainer} variant="outlined">
            <Paper className={classnames(globalClasses.pageHeader, classes.header)}>
                <NotificationsPageAction />
            </Paper>
            <div className={globalClasses.contentWrapper}>
                <div className={classes.tabs}>
                    <Tabs value={activeTab} indicatorColor="primary" textColor="primary" onChange={handleChangeTab}>
                        <NotificationTab
                            onChange={handleChangeTab}
                            value={0}
                            className={classes.tapItem}
                            count={notReadYetNotificationsCount}
                            title={t("all")}
                        />
                        <NotificationTab
                            onChange={handleChangeTab}
                            value={1}
                            className={classes.tapItem}
                            count={notReadYetTweetsCount}
                            title={t("interact")}
                        />
                        <NotificationTab
                            onChange={handleChangeTab}
                            value={2}
                            className={classes.tapItem}
                            count={notReadYetAccountCount}
                            title={t("account")}
                        />
                        <NotificationTab
                            onChange={handleChangeTab}
                            value={3}
                            className={classes.tapItem}
                            count={friendRequestsCount}
                            title={t("friend-requests")}
                        />
                    </Tabs>
                </div>
                <NotificationsPage
                    friendRequests={friendRequests}
                    notificationsToShow={notificationsToShow}
                    showFriendRequest={showFriendRequest}
                />
                {/* <Route exact path={NOTIFICATIONS} component={NotificationsPage} /> */}
                {/* <Route exact path={NOTIFICATIONS_MENTIONS} component={MentionsPage} /> */}
            </div>
        </Paper>
    );
};

export default withDocumentTitle(Notifications)("Notifications");
