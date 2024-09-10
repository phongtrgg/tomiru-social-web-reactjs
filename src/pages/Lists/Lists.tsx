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

const Lists = (): ReactElement => {
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
                <ListsHeaderGroup />
                <Divider />
                <PinnedLists />
                <Divider />
                {/* <DiscoverLists /> */}
                {/* <Divider /> */}
                <UserLists />
                {/* <UserLists /> */}
            </div>
        </Paper>
    );
};

export default Lists;
