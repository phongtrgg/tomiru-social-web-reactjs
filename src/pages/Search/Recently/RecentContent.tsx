import { Avatar, Typography } from "@material-ui/core";
import React, { ChangeEvent, FC, FormEvent, ReactElement, useState } from "react";
import { useRecentContentStyles } from "./RecentContentStyle";



const RecentContent: FC = (): ReactElement => {
    const classes = useRecentContentStyles();

    return (
        <>  
            <div className={classes.recentContainer}>
                <div className={classes.titleDelete}>
                    <p className={classes.titleRecent}>Tìm kiếm gần đây </p>
                    <a className={classes.linkDelete} href="">Xóa tất cả</a>
                </div>
                <div className={classes.serchRecentContent}>
                    <div style={{ display: "flex", marginTop: "20px" }}>
                                <Avatar className={classes.chatAvatar}  />
                                <div style={{ flex: 1 }}>
                                    <Typography variant="h6" >
                                        Cat Cat
                                    </Typography>
                                    <Typography variant="subtitle2" component={"div"}>
                                        @Cat
                                    </Typography>
                                </div>
                    </div>
                    <div style={{ display: "flex", marginTop: "20px" }}>
                                <Avatar className={classes.chatAvatar}  />
                                <div style={{ flex: 1 }}>
                                    <Typography variant="h6">
                                        Cat Cat
                                    </Typography>
                                    <Typography variant="subtitle2" component={"div"}>
                                        @Cat
                                    </Typography>
                                </div>
                    </div>
                    <div style={{ display: "flex", marginTop: "20px" }}>
                                <Avatar className={classes.chatAvatar}  />
                                <div style={{ flex: 1 }}>
                                    <Typography variant="h6">
                                        Cat Cat
                                    </Typography>
                                    <Typography variant="subtitle2" component={"div"}>
                                        @Cat
                                    </Typography>
                                </div>
                    </div>
                    <div style={{ display: "flex", marginTop: "20px" }}>
                                <Avatar className={classes.chatAvatar}  />
                                <div style={{ flex: 1 }}>
                                    <Typography variant="h6">
                                        Cat Cat
                                    </Typography>
                                    <Typography variant="subtitle2" component={"div"}>
                                        @Cat
                                    </Typography>
                                </div>
                    </div>
                   
                </div>
            </div>
        </>
    );
};

export default RecentContent
