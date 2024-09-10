import React, { ChangeEvent, FC, FormEvent, ReactElement, useState } from "react";
import "./ForYouContent.css";
import { useTranslation } from "react-i18next";

// Placeholder components for tab contents
const RecentContent = () => <div>Gần đây content</div>;
const FollowingContent = () => <div>Người theo dõi bạn content</div>;

const ForYouContent: FC = (): ReactElement => {
    const { t } = useTranslation();

    return (
        <>
            <div className="for-you">
                <p className="title1">{t("trend-for-you")}</p>
                <div className="topicWeek">
                    <p className="title2">#Chủ đề nổi trội tuần này</p>
                    <p className="postNumber">1,000 bài đăng</p>
                </div>
                <div className="sell">
                    <p className="title2">#Bán hàng</p>
                    <p className="postNumber">80 bài đăng</p>
                </div>
                <div className="tomxu">
                    <p className="title2"> #Tomxu</p>
                    <p className="postNumber">60 bài đăng</p>
                </div>
                <div className="package">
                    <p className="title2">#Gói thành viên</p>
                    <p className="postNumber">200 bài đăng</p>
                </div>
                <br />

                <a className="linkShow" href="">
                    Hiển thị thêm
                </a>
            </div>
        </>
    );
};

export default ForYouContent;
