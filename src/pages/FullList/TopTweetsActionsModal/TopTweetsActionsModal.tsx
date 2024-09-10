import React, { ReactElement, useEffect } from "react";
import { ClickAwayListener, List, ListItem } from "@material-ui/core";

import { useTopTweetsActionsModalStyles } from "./TopTweetsActionsModalStyles";
import { EditIcon, NotShowIcon, SeeLatestIcon } from "../../../icons";
import ActionIconButton from "../../../components/ActionIconButton/ActionIconButton";
import { useClickAway } from "../../../hook/useClickAway";
import TopTweetsItem from "./TopTweetsItem/TopTweetsItem";
import { t } from "i18next";
import { setOpenErrorSnackBar } from "../../../store/ducks/actionSnackbar/actionCreators";
import { outList, resetStatus } from "../../../store/ducks/list/actionCreators";
import { selectListItem, selectListItemId, selectLoadingState } from "../../../store/ducks/list/selectors";
import { useDispatch, useSelector } from "react-redux";
import { selectUserDataId } from "../../../store/ducks/user/selectors";
import { useCheckStatus } from "../../../hook/useCheckStatus";
import { useHistory } from "react-router-dom";
const TopTweetsActionsModal = (): ReactElement => {
    const classes = useTopTweetsActionsModalStyles();
    const listId = useSelector(selectListItemId);
    const list = useSelector(selectListItem);
    const dispatch = useDispatch();
    const myProfileId = useSelector(selectUserDataId);
    const { open, onClickOpen, onClickClose } = useClickAway();
    const loadingStatusOutGroup = useSelector(selectLoadingState);
    const checkStatus = useCheckStatus();
    const history = useHistory();
    const onClickOutGroup = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        if (list?.listOwner.id === myProfileId) {
            dispatch(setOpenErrorSnackBar(t("You are the group owner; leaving the group failed")));
        } else {
            event.preventDefault();
            event.stopPropagation();
            if (listId) {
                dispatch(outList(listId));
            }
            onClickClose();
        }
    };

    useEffect(() => {
        checkStatus(
            loadingStatusOutGroup,
            () => {
                history.push("/lists");
                dispatch(resetStatus());
            },
            () => {
                dispatch(resetStatus());
                onClickClose();
            },
            "You-have-successfully-left-the-group",
            "đã xảy ra lỗi"
        );
    }, [loadingStatusOutGroup]);

    return (
        <>
            <ClickAwayListener onClickAway={onClickClose}>
                <div className={classes.root}>
                    <ActionIconButton onClick={onClickOpen} actionText={"More"} icon={EditIcon} />
                    {open && (
                        // <div className={classes.dropdown}>
                        <div className={classes.listHeader}>
                            <List>
                                {/* <TopTweetsItem
                                    icon={SeeLatestIcon}
                                    title={"See top Tweets"}
                                    subtitle={
                                        "You’re seeing top Tweets first. Latest Tweets will show up as they happen."
                                    }
                                />
                                <TopTweetsItem
                                    icon={NotShowIcon}
                                    title={"Don’t show these Tweets in Home"}
                                    subtitle={"Top Tweets from this List will no longer show up in your Home timeline."}
                                /> */}
                                <ListItem>
                                    <div onClick={onClickOutGroup}>{t("leave")}</div>
                                </ListItem>
                            </List>
                        </div>
                    )}
                </div>
            </ClickAwayListener>
        </>
    );
};

export default TopTweetsActionsModal;
