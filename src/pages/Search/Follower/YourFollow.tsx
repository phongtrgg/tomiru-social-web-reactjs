import { Avatar, Button, Typography } from "@material-ui/core";
import React, { ChangeEvent, FC, FormEvent, ReactElement, useState } from "react";
import { useYourFollowStyles } from "./YourFollowStyle";
import { useTranslation } from "react-i18next";

const YourFollow: FC = (): ReactElement => {
    const { t } = useTranslation();
    const classes = useYourFollowStyles();

    return (
        <>
            <div className={classes.recentContainer}>
                <div>
                    <p className={classes.titleRecent}>Người theo dõi bạn </p>
                </div>
                <div className={classes.serchRecentContent}>
                    <div style={{ display: "flex", marginTop: "20px" }}>
                        <Avatar className={classes.chatAvatar} />
                        <div style={{ flex: 1 }}>
                            <Typography variant="h6">Cat Cat</Typography>
                            <Typography variant="subtitle2" component={"div"}>
                                @Cat
                            </Typography>
                        </div>
                        <Button className={classes.button1} variant="outlined" color="primary">
                            Theo dõi
                        </Button>
                    </div>
                    <div style={{ display: "flex", marginTop: "20px" }}>
                        <Avatar className={classes.chatAvatar} />
                        <div style={{ flex: 1 }}>
                            <Typography variant="h6">Cat Cat</Typography>
                            <Typography variant="subtitle2" component={"div"}>
                                @Cat
                            </Typography>
                        </div>
                        <Button className={classes.button2} variant="outlined" color="primary">
                            {t("following")}
                        </Button>
                    </div>
                    <div style={{ display: "flex", marginTop: "20px" }}>
                        <Avatar className={classes.chatAvatar} />
                        <div style={{ flex: 1 }}>
                            <Typography variant="h6">Cat Cat</Typography>
                            <Typography variant="subtitle2" component={"div"}>
                                @Cat
                            </Typography>
                        </div>
                        <Button className={classes.button1} variant="outlined" color="primary">
                            Theo dõi
                        </Button>
                    </div>
                    <div style={{ display: "flex", marginTop: "20px" }}>
                        <Avatar className={classes.chatAvatar} />
                        <div style={{ flex: 1 }}>
                            <Typography variant="h6">Cat Cat</Typography>
                            <Typography variant="subtitle2" component={"div"}>
                                @Cat
                            </Typography>
                        </div>
                        <Button className={classes.button1} variant="outlined" color="primary">
                            Theo dõi
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default YourFollow;
