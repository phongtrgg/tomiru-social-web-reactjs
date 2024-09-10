import React, { FC, memo, ReactElement } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useListsItemStyles } from "./ListsItemStyles";
import { EditIcon, PinIcon, PinIconFilled } from "../../../icons";
import { pinList, unpinList } from "../../../store/ducks/lists/actionCreators";
import { useGlobalStyles } from "../../../util/globalClasses";
import { ListResponse, ListUserResponse } from "../../../types/lists";
import { LISTS } from "../../../constants/path-constants";
import ActionIconButton from "../../../components/ActionIconButton/ActionIconButton";
import ListInfoDescription from "./ListInfoDescription/ListInfoDescription";
import ListsItemAvatar from "./ListsItemAvatar/ListsItemAvatar";
import {
    setCloseModal,
    setOpenErrorSnackBar,
    setOpenModal,
    setOpenSnackBar
} from "../../../store/ducks/actionSnackbar/actionCreators";
import PopupButtonList from "../../../components/PopupButtonList/PopupButtonList";
import { useTranslation } from "react-i18next";
import { selectModalId, selectOpenModal } from "../../../store/ducks/actionSnackbar/selector";

interface ListsItemProps {
    list?: ListResponse | ListUserResponse;
    listIndex?: number;
    isMyList?: boolean;
}

const ListsItem: FC<ListsItemProps> = memo(({ list, listIndex, isMyList }): ReactElement => {
    const { t } = useTranslation();
    const globalClasses = useGlobalStyles({});
    const classes = useListsItemStyles();
    const dispatch = useDispatch();
    const groupId = useSelector(selectModalId);
    const setOpen = useSelector(selectOpenModal);
    const onClickPinList = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        event.preventDefault();
        event.stopPropagation();

        if (list?.isListPinned) {
            dispatch(unpinList(list!.id));
            dispatch(setOpenErrorSnackBar(t("Unpinned successfully")));
        } else {
            dispatch(pinList(list!.id));
            dispatch(setOpenSnackBar(t("Pin successfully")));
        }
        dispatch(setCloseModal());
    };

    const openModal = (): any => {
        if (setOpen) {
            dispatch(setCloseModal());
        } else {
            dispatch(setOpenModal(list?.id));
        }
        if (list?.id !== groupId) {
            dispatch(setOpenModal(list?.id));
        }
    };
    const closeModal = (): void => {
        dispatch(setCloseModal());
    };

    return (
        <>
            <div style={{ position: "relative" }}>
                <Link to={`${LISTS}/${list?.id}`} className={globalClasses.link}>
                    <div className={classes.container} style={{ border: listIndex === 2 ? 0 : 1 }}>
                        <ListsItemAvatar listWallpaper={list?.wallpaper} listAltWallpaper={list?.altWallpaper} />
                        <div className={classes.listInfoContainer}>
                            <ListInfoDescription
                                listId={list?.id}
                                listName={list?.listName}
                                listDescription={list?.description}
                                listIsPrivate={"isPrivate" in list! && list?.isPrivate}
                                listOwnerFullName={list?.listOwner.fullName}
                                listOwnerUsername={list?.listOwner.username}
                                listOwnerAvatar={list?.listOwner.avatar}
                            />
                            <div>
                                {isMyList && (
                                    <div style={{ marginRight: "40px" }}>
                                        <ActionIconButton
                                            onClick={onClickPinList}
                                            actionText={list?.isListPinned ? "Unpin" : "Pin"}
                                            icon={list?.isListPinned ? PinIconFilled : PinIcon}
                                        />
                                    </div>
                                )}
                                {/* {myProfileId === list?.listOwner.id || isMyList ? null : (
                                    <FollowListButton
                                        listId={list!.id}
                                        isFollower={(list as ListResponse).isFollower}
                                    />
                                )} */}
                            </div>
                        </div>
                    </div>
                </Link>
                <div style={{ position: "absolute", top: "20px", right: "3px" }}>
                    <ActionIconButton onClick={openModal} actionText={"More"} icon={EditIcon} />
                </div>
                <div style={{ position: "relative" }}>
                    <div style={{ position: "absolute", top: "-20px", right: "-5px" }}>
                        {setOpen && groupId === list?.id && (
                            <PopupButtonList list={list} isPinned={list?.isListPinned} onClose={closeModal} />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
});

export default ListsItem;
