import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ClickAwayListener, List, ListItem, Typography } from "@material-ui/core";

import { useListsHeaderStyles } from "./ListsHeaderStyles";
import ActionIconButton from "../../../components/ActionIconButton/ActionIconButton";
import { AddListsIcon, EditIcon, ListsIcon } from "../../../icons";
import { selectIsLoading } from "../../../store/ducks/lists/selectors";
import { selectUserDataId, selectUserProfileUsername } from "../../../store/ducks/user/selectors";
import CreateListsModal from "./CreateListsModal/CreateListsModal";
import { useModalWindow } from "../../../hook/useModalWindow";
import { useClickAway } from "../../../hook/useClickAway";
import { useTranslation } from "react-i18next";

const ListsHeader = (): ReactElement => {
    const classes = useListsHeaderStyles();
    const isLoading = useSelector(selectIsLoading);
    const myProfileUsername = useSelector(selectUserProfileUsername);
    const myProfileId = useSelector(selectUserDataId);
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();
    const { open, onClickOpen, onClickClose } = useClickAway();
    const { t } = useTranslation();
    return (
        <div style={{ height: "50px", paddingTop: "10px", marginLeft: "40px" }}>
            <div className={classes.iconGroup}>
                <ActionIconButton onClick={onOpenModalWindow} actionText={"Create"} icon={AddListsIcon} />
                <ActionIconButton onClick={onClickOpen} actionText={"More"} icon={EditIcon} />
                {open && (
                    <ClickAwayListener onClickAway={onClickClose}>
                        <List className={classes.listHeader}>
                            <ListItem className={classes.listItem}>
                                <Link to={"/lists"} style={{ textDecoration: "none" }}>
                                    {t("pin")}
                                </Link>
                            </ListItem>
                            <ListItem className={classes.listItem}>
                                <Link to={"/flpage"} style={{ textDecoration: "none" }}>
                                    {t("following")}
                                </Link>
                            </ListItem>
                            <ListItem className={classes.listItem}>
                                <Link to={"/members"} style={{ textDecoration: "none" }}>
                                    {t("members")}{" "}
                                </Link>
                            </ListItem>
                        </List>
                    </ClickAwayListener>
                )}
            </div>
            <CreateListsModal visible={visibleModalWindow} onClose={onCloseModalWindow} />
        </div>
    );
};

export default ListsHeader;
