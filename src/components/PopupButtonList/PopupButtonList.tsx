import { List, ListItem } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useListsItemStyles } from "../../pages/Lists/ListsItem/ListsItemStyles";
import { fetchLists, fetchUserLists, pinList, unpinList } from "../../store/ducks/lists/actionCreators";
import { ListResponse, ListUserResponse } from "../../types/lists";
import { setCloseModal, setOpenErrorSnackBar, setOpenSnackBar } from "../../store/ducks/actionSnackbar/actionCreators";
import { useDispatch, useSelector } from "react-redux";
import { outList, resetStatus } from "../../store/ducks/list/actionCreators";
import { selectUserDataId } from "../../store/ducks/user/selectors";
import { useCheckStatus } from "../../hook/useCheckStatus";
import { selectLoadingState as stateGroup } from "../../store/ducks/list/selectors";
import { selectLoadingState as stateAllList } from "../../store/ducks/lists/selectors";
interface PopupButtonListProps {
    // list?: ListResponse | ListUserResponse;
    list?: any;
    onClose: () => void;
    isPinned: any;
}

const PopupButtonList: FC<PopupButtonListProps> = ({ list, onClose, isPinned }) => {
    const classes = useListsItemStyles();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const myProfileId = useSelector(selectUserDataId);
    const loadingStatusPin = useSelector(stateAllList);
    const loadingStatusOutGroup = useSelector(stateGroup);
    const checkStatus = useCheckStatus();
    const [pinLoading, setPinLoading] = useState(false);

    const onClickPinList = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): any => {
        event.preventDefault();
        event.stopPropagation();

        if (pinLoading) {
            return dispatch(setOpenSnackBar(t("Too fast operation")));
        }
        setPinLoading(true);
        if (list?.isListPinned) {
            dispatch(unpinList(list!.id));
            dispatch(setOpenErrorSnackBar(t("Unpinned successfully")));
        } else {
            dispatch(pinList(list!.id));
            dispatch(setOpenSnackBar(t("Pin successfully")));
        }
        dispatch(fetchUserLists());
        dispatch(fetchLists());
        setPinLoading(false);
        dispatch(setCloseModal());
    };

    const onClickOutGroup = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        if (list?.listOwner.id === myProfileId) {
            dispatch(setOpenErrorSnackBar(t("You are the group owner; leaving the group failed")));
        } else {
            event.preventDefault();
            event.stopPropagation();
            dispatch(outList(list!.id));
            // dispatch(setCloseModal());
        }
    };

    useEffect(() => {
        checkStatus(
            loadingStatusOutGroup,
            () => {
                dispatch(fetchUserLists());
                dispatch(fetchLists());
                dispatch(resetStatus());
            },
            () => {
                dispatch(resetStatus());
                dispatch(setCloseModal());
            },
            "You-have-successfully-left-the-group",
            "You-have-failed-left-the-group"
        );
    }, [loadingStatusOutGroup]);
    // useEffect(() => {
    //     checkStatus(loadingStatusPin, () => {
    //         console.log("check status");
    //         dispatch(fetchUserLists());
    //         dispatch(fetchLists());
    //         dispatch(setCloseModal());
    //     });
    // }, [loadingStatusPin]);

    return (
        <List className={classes.listHeader} onClick={onClose}>
            <ListItem className={classes.listItem}>
                <div onClick={onClickPinList}>{isPinned ? t("Unpin") : t("pin")}</div>
            </ListItem>
            <ListItem className={classes.listItem}>
                <div onClick={onClickOutGroup}>{t("leave")}</div>
            </ListItem>
        </List>
    );
};

export default PopupButtonList;
