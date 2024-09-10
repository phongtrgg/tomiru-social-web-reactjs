import React, { ReactElement, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Paper, Divider } from "@material-ui/core";

import { fetchLists, fetchPinnedLists, fetchUserLists, resetListsState } from "../../store/ducks/lists/actionCreators";
import { useGlobalStyles } from "../../util/globalClasses";
import ListsHeaderFl from "./ListsHeader/ListsHeaderFl";
import UserListsFl from "./UserLists/UserListsFl";
import DiscoverListsFl from "./DiscoverLists/DiscoverListsFl";

const FlPage = (): ReactElement => {
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
                <ListsHeaderFl />
                <Divider />
                <UserListsFl />
                <DiscoverListsFl />
                {/* <Divider /> */}
                {/* <UserLists /> */}
            </div>
        </Paper>
    );
};

export default FlPage;
