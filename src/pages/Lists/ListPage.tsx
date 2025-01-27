import React, { ReactElement, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Paper } from "@material-ui/core";

import { fetchLists, fetchPinnedLists, fetchUserLists, resetListsState } from "../../store/ducks/lists/actionCreators";
import { useGlobalStyles } from "../../util/globalClasses";
import ListsHeader from "./ListsHeader/ListsHeader";
import PinnedLists from "./PinnedLists/PinnedLists";
import DiscoverLists from "./DiscoverLists/DiscoverLists";
import UserLists from "./UserLists/UserLists";

const ListsPage = (): ReactElement => {
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
        <div className={globalClasses.pageContainer}>
            {/* <ListsHeader /> */}
            {/* <PinnedLists /> */}
            <DiscoverLists />
            {/* <UserLists /> */}
        </div>
    );
};

export default ListsPage;
