import React, { FC, ReactElement } from "react";
import { Avatar, Paper, Typography } from "@material-ui/core";
import classnames from "classnames";

import { useUserNotFoundStyles } from "./UserNotFoundStyles";
import { useGlobalStyles } from "../../../util/globalClasses";
import PageHeaderWrapper from "../../../components/PageHeaderWrapper/PageHeaderWrapper";
import { useTranslation } from "react-i18next";

const UserNotFound: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useUserNotFoundStyles();
    const { t } = useTranslation()
    return (
        <Paper className={classnames(globalClasses.pageContainer, classes.container)} variant="outlined">
            <PageHeaderWrapper backButton>
                <Typography variant={"h5"} component={"span"}>
                    {t("profile")}
                </Typography>
            </PageHeaderWrapper>
            <div className={classes.wallpaper} />
            <div className={classes.avatar}>
                <Avatar>
                    <div></div>
                </Avatar>
            </div>
            <div className={classes.info}>
                <Typography variant={"h4"} component={"div"}>
                    {t("account_doesnt_exist")}
                </Typography>
                <Typography variant={"subtitle1"} component={"div"}>
                    {t("searching_for_another")}
                </Typography>
            </div>
        </Paper>
    );
};

export default UserNotFound;
