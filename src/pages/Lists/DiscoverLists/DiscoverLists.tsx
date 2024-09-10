import React, { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Paper, Typography } from "@material-ui/core";

import Spinner from "../../../components/Spinner/Spinner";
import ListsItem from "../ListsItem/ListsItem";
import { SUGGESTED } from "../../../constants/path-constants";
import { useDiscoverListsStyles } from "./DiscoverListsStyles";
import { useGlobalStyles } from "../../../util/globalClasses";
import { selectIsListsLoading, selectListsItems } from "../../../store/ducks/lists/selectors";
import { useTranslation } from "react-i18next";
import { ListResponse } from "../../../types/lists";

const DiscoverLists = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useDiscoverListsStyles();
    const lists = useSelector(selectListsItems);
    const isListsLoading = useSelector(selectIsListsLoading);
    const [data, setData] = useState<ListResponse[]>([]);
    const { t } = useTranslation();
    useEffect(() => {
        setData([...lists].reverse());
    }, [lists]);

    return (
        <div id={"list"} className={classes.newLists}>
            <Typography variant="h5" className={globalClasses.itemInfoWrapper}>
                {t("all-group-joined")} ({lists.length})
            </Typography>
            {isListsLoading ? (
                <div style={{ padding: "59px 0px" }}>
                    <Spinner />
                </div>
            ) : (
                data.map((list, index) => <ListsItem key={list.id} list={list} listIndex={index} />)
            )}
            {/* <Link to={SUGGESTED} className={globalClasses.link}>
                <Typography variant={"body1"} component={"div"} className={classes.showMore}>
                    Show more
                </Typography>
            </Link> */}
        </div>
    );
};

export default DiscoverLists;
