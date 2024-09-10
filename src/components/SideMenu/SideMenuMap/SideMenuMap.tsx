import React, { FC, ReactElement } from "react";
import { useSelector } from "react-redux";

import SideMenuItem from "../SideMenuItem/SideMenuItem";
import { selectUserDataUnreadMessagesCount } from "../../../store/ducks/user/selectors";
import { useSideMenuStyles } from "../SideMenuStyles";

interface SideMenuMap {
    title: string;
    path: string;
    icon: JSX.Element;
    filledIcon: JSX.Element;
}

const SideMenuMap: FC<SideMenuMap> = ({ title, path, icon, filledIcon }): ReactElement => {
    const classes = useSideMenuStyles();
    const unreadMessagesCount = useSelector(selectUserDataUnreadMessagesCount);

    return (
        <SideMenuItem title={title} path={path} icon={icon} filledIcon={filledIcon}>
            {/* {unreadMessagesCount !== 0 && <span className={classes.count}>{unreadMessagesCount}</span>} */}
        </SideMenuItem>
    );
};

export default SideMenuMap;
