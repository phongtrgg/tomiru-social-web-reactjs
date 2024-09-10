import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { Paper, Typography } from "@material-ui/core";

import { useUserListsStyles } from "./UserListsStyles";
import Spinner from "../../../components/Spinner/Spinner";
import ListsItem from "../ListsItem/ListsItem";
import { useGlobalStyles } from "../../../util/globalClasses";
import { selectIsUserListsLoading, selectUserListsItems } from "../../../store/ducks/lists/selectors";
import ListsItemFl from "../ListsItem/ListsItemFl";
import MemberListUser from "../ListsItem/MemberListUser";
import { useTranslation } from "react-i18next";

const MemberList = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useUserListsStyles();
    const userLists = useSelector(selectUserListsItems);
    const isUserListsLoading = useSelector(selectIsUserListsLoading);
    const { t } = useTranslation();
    return (
        <Paper id={"userLists"} className={classes.myLists} variant="outlined">
            <Typography variant="body1" className={globalClasses.itemInfoWrapper} style={{ marginTop: "10px" }}>
                <p style={{ fontWeight: "600", fontSize: "24px", paddingLeft: "10px" }}> {t("following")}</p>
            </Typography>

            {isUserListsLoading ? (
                <Spinner />
            ) : (
                userLists.map((list) => <MemberListUser key={list.id} list={list} isMyList />)
            )}
        </Paper>
    );
};

export default MemberList;
