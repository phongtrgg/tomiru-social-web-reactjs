import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Paper, Typography, Divider } from "@material-ui/core";

import Spinner from "../../../components/Spinner/Spinner";
import ListsItem from "../ListsItem/ListsItem";
import { SUGGESTED } from "../../../constants/path-constants";
import { useDiscoverListsStyles } from "./DiscoverListsStyles";
import { useGlobalStyles } from "../../../util/globalClasses";
import { selectIsListsLoading, selectListsItems } from "../../../store/ducks/lists/selectors";
import ListsItemFllDiscor from "../ListsItem/ListsItemFllDiscor";
import { useTranslation } from "react-i18next";

const DiscoverListsFl = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useDiscoverListsStyles();
    const lists = useSelector(selectListsItems);
    const isListsLoading = useSelector(selectIsListsLoading);
    const { t } = useTranslation();

    return (
        <div id={"list"} className={classes.newLists}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {" "}
                <Typography variant="body1">
                    <p style={{ fontWeight: "600", fontSize: "24px", paddingLeft: "10px" }}>
                        {" "}
                        {t("suggested_for_you")}
                    </p>
                </Typography>
                <span className={globalClasses.itemInfoWrapper} style={{ color: "#1da1f2", cursor: "pointer" }}>
                    {t("show_more")}
                </span>
            </div>
            {isListsLoading ? (
                <div style={{ padding: "59px 0px" }}>
                    <Spinner />
                </div>
            ) : (
                lists
                    .slice(0, 2)
                    .map((list, index) => <ListsItemFllDiscor key={list.id} list={list} listIndex={index} />)
            )}
            {/* <Link to={SUGGESTED} className={globalClasses.link}>
                <Typography variant={"body1"} component={"div"} className={classes.showMore}>
                    Show more
                </Typography>
            </Link> */}
        </div>
    );
};

export default DiscoverListsFl;
