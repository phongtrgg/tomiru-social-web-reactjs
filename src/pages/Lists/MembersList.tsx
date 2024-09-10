import React, { ReactElement, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Paper, Divider } from "@material-ui/core";

import { fetchLists, fetchPinnedLists, fetchUserLists, resetListsState } from "../../store/ducks/lists/actionCreators";
import { useGlobalStyles } from "../../util/globalClasses";
import ListsHeader from "./ListsHeader/ListsHeader";
import PinnedLists from "./PinnedLists/PinnedLists";
import DiscoverLists from "./DiscoverLists/DiscoverLists";
import UserLists from "./UserLists/UserLists";
import ListsHeaderGroup from "./ListsHeader/ListsHeaderGroup";
import ListsHeaderFl from "./ListsHeader/ListsHeaderFl";
import UserListsFl from "./UserLists/UserListsFl";
import DiscoverListsFl from "./DiscoverLists/DiscoverListsFl";
import ListsHeaderMember from "./ListsHeader/ListsHeaderMember";
import MemberList from "./UserLists/MemberList";

const MembersList = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Lists / Twitter";
        dispatch(fetchLists());
        dispatch(fetchUserLists());
        dispatch(fetchPinnedLists());

        return () => {
            dispatch(resetListsState());
        };
    }, []);

    return (
        <Paper className={globalClasses.pageContainer}>
            <div style={{ padding: "0 10px" }}>
                {" "}
                <ListsHeaderMember />
                <Divider />
                <MemberList />
                <Divider />
                <DiscoverListsFl />
            </div>
        </Paper>
    );
};

export default MembersList;
