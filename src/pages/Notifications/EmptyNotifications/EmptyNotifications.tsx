import React, { FC, ReactElement } from "react";
import { Typography } from "@material-ui/core";

import { useEmptyNotificationsStyles } from "./EmptyNotificationsStyles";
import { useTranslation } from "react-i18next";

interface EmptyNotificationsProps {
    isNotification: boolean;
}

const EmptyNotifications: FC<EmptyNotificationsProps> = ({ isNotification }): ReactElement => {
    const classes = useEmptyNotificationsStyles();
    const { t } = useTranslation();

    return (
        <div className={classes.infoWindow}>
            <Typography variant={"h4"} component={"div"}>
                {t("nothing_to_see_here_yet")}
            </Typography>
            <Typography variant={"subtitle1"} component={"div"}>
                {isNotification ? (
                    t("from_like_to_retweets")
                ) : (
                    t("when_someone_mentions")
                )}
            </Typography>
        </div>
    );
};

export default EmptyNotifications;
