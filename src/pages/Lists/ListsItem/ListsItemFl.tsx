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
import FollowListButtonFl from "../../../components/FollowListButton/FollowListButtonFl";
import FollowListButtonPro from "../../../components/FollowListButton/FollowListButtonPro";

interface ListsItemProps {
    list?: ListResponse | ListUserResponse;
    listIndex?: number;
    isMyList?: boolean;
}

const ListsItemFl: FC<ListsItemProps> = memo(({ list, listIndex, isMyList }): ReactElement => {
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
            <div style={{ marginTop: "10px" }}>
                <div className={globalClasses.link}>
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
                                <FollowListButtonPro listId={list!.id} isFollower={(list as ListResponse).isFollower} />
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div style={{ position: "absolute", top: "20px", right: "3px" }}>
                    <ActionIconButton onClick={onClickOpen} actionText={"More"} icon={EditIcon} />
                </div>
                <div style={{ position: "relative" }}>
                    {" "}
                    <div style={{ position: "absolute", top: "-20px", right: "-5px" }}>
                        {" "}
                        {open && (
                            <List className={classes.listHeader} onClick={onClickClose}>
                                <ListItem className={classes.listItem}>
                                    <Link to={"/lists"}>Ghim</Link>
                                </ListItem>
                                <ListItem className={classes.listItem}>Rời Nhóm</ListItem>
                            </List>
                        )}
                    </div>
                </div> */}
            </div>
        </>
    );
});

export default ListsItemFl;
