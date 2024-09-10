import React, { FC, ReactElement } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { IconButton } from "@material-ui/core";

import {
    HomeIcon,
    HomeIconFilled,
    MapIcon,
    MemberIcon,
    MessagesIcon,
    MessagesIconFilled,
    MutualFundIcon,
    NetworkIcon,
    NotificationsIcon,
    NotificationsIconFilled,
    ProfileIcon,
    ProfileIconFilled,
    SearchIconSideMenu,
    ShopIcon
} from "../../icons";
import UserSideProfile from "../UserSideProfile/UserSideProfile";
import { selectUserDataId } from "../../store/ducks/user/selectors";
import { useSideMenuStyles } from "./SideMenuStyles";
import { DisplayProps } from "../../pages/Settings/AccessibilityDisplayLanguages/Display/Display";
import {
    CUSTOMER_SERVICE,
    HOME,
    MAP,
    MESSAGES,
    NOTIFICATIONS,
    PROFILE,
    SEARCH_NEW,
    SHOP,
    TREE_MONEY
} from "../../constants/path-constants";
import AddTweetButton from "./AddTweetButton/AddTweetButton";
import SideMenuItem from "./SideMenuItem/SideMenuItem";
import SideMenuHomeItem from "./SideMenuHomeItem/SideMenuHomeItem";
import SideMenuNotificationItem from "./SideMenuNotificationItem/SideMenuNotificationItem";
import SideMenuMessagesItem from "./SideMenuMessagesItem/SideMenuMessagesItem";
import { useTranslation } from "react-i18next";
import TomiruIcon from "../../assets/icontomiru.png";
import SideMenuMember from "./SideMenuMember/SideMenuMember";
import SideNetwork from "./SideMenuNetwork/SideMenuNetwork";
import SideMutualFund from "./SideMenuMutualFund/SideMenuMutualFund";
import SideMenuShop from "./SideMenuShop/SideMenuShop";
import SideMenuMap from "./SideMenuMap/SideMenuMap";

const SideMenu: FC<DisplayProps> = ({ changeBackgroundColor, changeColorScheme }): ReactElement => {
    const classes = useSideMenuStyles();
    const myProfileId = useSelector(selectUserDataId);
    const { t } = useTranslation();

    return (
        <>
            <ul className={classes.container}>
                <li>
                    <NavLink to={HOME} activeClassName={"selected"} className={classes.navLink}>
                        <div className={classes.logoContainer}>
                            {/* icon tomiru add */}
                            <img src={TomiruIcon} alt="icontomiru" className={classes.iconImage} />
                            <span className={classes.logoText}>TOMIRU</span>
                            {/* <IconButton color="primary">{TweetIcon}</IconButton> */}
                        </div>
                    </NavLink>
                </li>
                <SideMenuHomeItem title={t("home")} path={HOME} icon={HomeIcon} filledIcon={HomeIconFilled} />
                <div className={classes.mg}></div>
                <SideMenuNotificationItem
                    title={t("notifications")}
                    path={NOTIFICATIONS}
                    icon={NotificationsIcon}
                    filledIcon={NotificationsIconFilled}
                />
                <div className={classes.mg}></div>
                <SideMenuMessagesItem
                    title={t("messages")}
                    path={MESSAGES}
                    icon={MessagesIcon}
                    filledIcon={MessagesIconFilled}
                />
                <div className={classes.mg}></div>
                {/* <SideMenuItem title={t("explore")} path={SEARCH} icon={ExploreIcon} filledIcon={ExploreIconFilled} /> */}
                {/* Thêm phần gói thành viên */}
                <SideMenuMember
                    title={t("membership_package")}
                    path={CUSTOMER_SERVICE}
                    icon={MemberIcon}
                    filledIcon={MemberIcon}
                />
                <div className={classes.mg}></div>

                <SideNetwork title={t("network")} path={TREE_MONEY} icon={NetworkIcon} filledIcon={NetworkIcon} />
                <div className={classes.mg}></div>
                <SideMutualFund
                    title={t("mutual_funds")}
                    path={"/money"}
                    icon={MutualFundIcon}
                    filledIcon={MutualFundIcon}
                />
                <div className={classes.mg}></div>

                {/* Thêm phần cửa hàng */}
                <SideMenuShop title={t("shop")} path={SHOP} icon={ShopIcon} filledIcon={ShopIcon} />
                <div className={classes.mg}></div>
                {/* Thêm phần bản đồ */}
                <SideMenuMap title={t("map")} path={MAP} icon={MapIcon} filledIcon={MapIcon} />
                <div className={classes.mg}></div>
                {/* Thêm phần bản đồ */}
                <SideMenuMap
                    title={t("search_side_menu")}
                    path={SEARCH_NEW}
                    icon={SearchIconSideMenu}
                    filledIcon={SearchIconSideMenu}
                />
                <div className={classes.mg}></div>
                <SideMenuItem
                    title={t("profile")}
                    path={`${PROFILE}/${myProfileId}`}
                    icon={ProfileIcon}
                    filledIcon={ProfileIconFilled}
                />

                {/* <SideMenuItem
                    title={t("bookmarks")}
                    path={BOOKMARKS}
                    icon={BookmarksIcon}
                    filledIcon={BookmarksIconFilled}
                />
                <SideMenuItem title={t("lists")} path={LISTS} icon={ListsIcon} filledIcon={ListsIconFilled} />
               
                <SideMenuMoreItem changeBackgroundColor={changeBackgroundColor} changeColorScheme={changeColorScheme} /> */}
                <AddTweetButton />
            </ul>
            <UserSideProfile />
        </>
    );
};

export default SideMenu;
