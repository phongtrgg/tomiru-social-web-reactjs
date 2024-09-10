import React, { FC, memo, ReactElement } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { List, ListItem, Paper } from "@material-ui/core";

import { useListsItemStyles } from "./ListsItemStyles";
import { selectUserDataId } from "../../../store/ducks/user/selectors";
import { EditIcon, PinIcon, PinIconFilled } from "../../../icons";
import { pinList, unpinList } from "../../../store/ducks/lists/actionCreators";
import { useGlobalStyles } from "../../../util/globalClasses";
import { ListResponse, ListUserResponse } from "../../../types/lists";
import { LISTS } from "../../../constants/path-constants";
import ActionIconButton from "../../../components/ActionIconButton/ActionIconButton";
import FollowListButton from "../../../components/FollowListButton/FollowListButton";
import ListInfoDescription from "./ListInfoDescription/ListInfoDescription";
import ListsItemAvatar from "./ListsItemAvatar/ListsItemAvatar";
import { useClickAway } from "../../../hook/useClickAway";
import { useModalWindow } from "../../../hook/useModalWindow";

interface ListsItemProps {
    list?: ListResponse | ListUserResponse;
    listIndex?: number;
    isMyList?: boolean;
}

const ListsItemFllDiscor: FC<ListsItemProps> = memo(({ list, listIndex, isMyList }): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useListsItemStyles();
    const dispatch = useDispatch();
    const myProfileId = useSelector(selectUserDataId);

    const onClickPinList = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        event.preventDefault();
        event.stopPropagation();

        if (list?.isListPinned) {
            dispatch(unpinList(list!.id));
        } else {
            dispatch(pinList(list!.id));
        }
    };
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();
    const { open, onClickOpen, onClickClose } = useClickAway();
    return (
        <>
            <div style={{ position: "relative", paddingTop: "10px" }}>
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
                                {myProfileId === list?.listOwner.id || isMyList ? null : (
                                    <FollowListButton
                                        listId={list!.id}
                                        isFollower={(list as ListResponse).isFollower}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    );
});

export default ListsItemFllDiscor;
