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

const ListsHeaderMember = (): ReactElement => {
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
                    <p style={{ fontWeight: "600", fontSize: "32px" }}> {t("members")}</p>
                </Typography>
            </PageHeaderWrapper>
            <Divider style={{ color: "red" }} />

            <CreateListsModal visible={visibleModalWindow} onClose={onCloseModalWindow} />
        </div>
    );
};

export default ListsHeaderMember;
