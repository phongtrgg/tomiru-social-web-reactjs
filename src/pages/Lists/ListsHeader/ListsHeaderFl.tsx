import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ClickAwayListener, List, ListItem, Typography, Divider } from "@material-ui/core";

import { useListsHeaderStyles } from "./ListsHeaderStyles";
import ActionIconButton from "../../../components/ActionIconButton/ActionIconButton";
import { AddListsIcon, EditIcon, ListsIcon } from "../../../icons";
import { LISTS_MEMBERSHIPS } from "../../../constants/path-constants";
import PageHeaderWrapper from "../../../components/PageHeaderWrapper/PageHeaderWrapper";
import { selectIsLoading } from "../../../store/ducks/lists/selectors";
import { selectUserDataId, selectUserProfileUsername } from "../../../store/ducks/user/selectors";
import CreateListsModal from "./CreateListsModal/CreateListsModal";
import { useModalWindow } from "../../../hook/useModalWindow";
import { useClickAway } from "../../../hook/useClickAway";
import BackButton from "../../../components/BackButton/BackButton";
import { useTranslation } from "react-i18next";

const ListsHeaderFl = (): ReactElement => {
    const classes = useListsHeaderStyles();
    const isLoading = useSelector(selectIsLoading);
    const myProfileUsername = useSelector(selectUserProfileUsername);
    const myProfileId = useSelector(selectUserDataId);
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();
    const { open, onClickOpen, onClickClose } = useClickAway();
    const { t } = useTranslation();
    return (
        <div style={{ height: "50px", display: "flex", alignItems: "center" }}>
            <PageHeaderWrapper backButton>
                <Typography variant="body1" component={"div"}>
                    <p style={{ fontWeight: "600", fontSize: "32px" }}> {t("following")}</p>
                </Typography>
            </PageHeaderWrapper>
            <Divider style={{ color: "red" }} />
            {/* <div className={classes.iconGroup}>
                <ActionIconButton onClick={onOpenModalWindow} actionText={"Create"} icon={AddListsIcon} />
                <ActionIconButton onClick={onClickOpen} actionText={"More"} icon={EditIcon} />
                <div style={{ position: "absolute", top: "20px", right: "3px" }}>
                    {" "}
                    {open && (
                        <List className={classes.listHeader1}>
                            <ListItem className={classes.listItem1}>Ghim</ListItem>
                            <ListItem className={classes.listItem1}>Đang theo dõi</ListItem>
                            <ListItem className={classes.listItem1}>Thành viên</ListItem>
                        </List>
                    )}
                </div>
            </div> */}
            <CreateListsModal visible={visibleModalWindow} onClose={onCloseModalWindow} />
        </div>
    );
};

export default ListsHeaderFl;
