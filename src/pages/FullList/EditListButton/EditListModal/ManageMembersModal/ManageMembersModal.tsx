import React, { ChangeEvent, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogContent, DialogTitle, InputAdornment, Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { useManageMembersModalStyles } from "./ManageMembersModalStyles";
import ManageMembersItem from "./ManageMembersItem/ManageMembersItem";
import { ArrowIcon, ForwardArrowIcon, SearchIcon } from "../../../../../icons";
import { selectListItem } from "../../../../../store/ducks/list/selectors";
import {
    selectIsListMembersLoading,
    selectListMembersItems,
    selectListSuggestedItems
} from "../../../../../store/ducks/listMembers/selectors";
import {
    fetchListMembers,
    fetchListMembersByUsername,
    resetListMembersState,
    resetListSuggested
} from "../../../../../store/ducks/listMembers/actionCreators";
import Spinner from "../../../../../components/Spinner/Spinner";
import { ManageMembersInput } from "./ManageMembersInput/ManageMembersInput";
import EmptyPageDescription from "../../../../../components/EmptyPageDescription/EmptyPageDescription";
import { useModalWindow } from "../../../../../hook/useModalWindow";
import { useGlobalStyles } from "../../../../../util/globalClasses";
import { useTranslation } from "react-i18next";

const ManageMembersModal = (): ReactElement => {
    const globalClasses = useGlobalStyles({ dialogContentHeight: 577 });
    const classes = useManageMembersModalStyles();
    const dispatch = useDispatch();
    const list = useSelector(selectListItem);
    const members = useSelector(selectListMembersItems);
    const suggested = useSelector(selectListSuggestedItems);
    const isMembersLoading = useSelector(selectIsListMembersLoading);
    const [activeTab, setActiveTab] = React.useState<number>(0);
    const [searchText, setSearchText] = React.useState<string>("");
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();
    const { t } = useTranslation()

    useEffect(() => {
        if (visibleModalWindow) {
            dispatch(fetchListMembers({ listId: list?.id!, listOwnerId: list?.listOwner.id! }));
        }

        return () => {
            dispatch(resetListMembersState());
            dispatch(resetListSuggested());
        };
    }, [visibleModalWindow]);

    const handleChangeTab = (event: ChangeEvent<{}>, newValue: number): void => {
        setActiveTab(newValue);

        if (newValue === 0) {
            setSearchText("");
            dispatch(resetListSuggested());
            dispatch(fetchListMembers({ listId: list?.id!, listOwnerId: list?.listOwner.id! }));
        }
    };

    const onSearch = (text: string): void => {
        if (text) {
            setSearchText(text);
            dispatch(fetchListMembersByUsername({ listId: list?.id!, username: encodeURIComponent(text) }));
        } else {
            setSearchText("");
            dispatch(resetListSuggested());
        }
    };

    return (
        <>
            <Typography
                id={"onOpenManageMembersModal"}
                className={classes.manageMembers}
                onClick={onOpenModalWindow}
                variant={"body1"}
                component={"div"}
            >
                {t("manage_members")}
                <>{ForwardArrowIcon}</>
            </Typography>
            <Dialog
                className={classes.dialog}
                open={visibleModalWindow}
                onClose={onCloseModalWindow}
                hideBackdrop
            >
                <DialogTitle>
                    <IconButton onClick={onCloseModalWindow} color="primary" size="small">
                        <>{ArrowIcon}</>
                    </IconButton>
                    {t("manage_members")}
                </DialogTitle>
                <DialogContent className={globalClasses.dialogContent}>
                    <div className={classes.tabs}>
                        <Tabs value={activeTab} indicatorColor="primary" textColor="primary" onChange={handleChangeTab}>
                            <Tab className={classes.tab} label={`Members (${list?.membersSize})`} />
                            <Tab className={classes.tab} label="Suggested" />
                        </Tabs>
                    </div>
                    {(activeTab === 0) ? (
                        isMembersLoading ? (
                            <Spinner />
                        ) : (
                            (members.length !== 0) ? (
                                members.map((member) => (
                                    <ManageMembersItem
                                        key={member.id}
                                        listId={list?.id}
                                        listOwnerId={list?.listOwner.id}
                                        user={member}
                                    />
                                ))
                            ) : (
                                <EmptyPageDescription
                                    title={t("there_isn’t_anyone_in_this_list")}
                                    subtitle={t("when_people_get_added")}
                                />
                            )
                        )
                    ) : (
                        <div className={classes.container}>
                            <ManageMembersInput
                                fullWidth
                                placeholder={t("search_people")}
                                variant="outlined"
                                onChange={(event) => onSearch(event.target.value)}
                                value={searchText}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            {SearchIcon}
                                        </InputAdornment>
                                    )
                                }}
                            />
                            {(suggested.length !== 0) ? (
                                suggested.map((suggest) => (
                                    <ManageMembersItem
                                        key={suggest.id}
                                        listId={list?.id}
                                        listOwnerId={list?.listOwner.id}
                                        user={suggest}
                                        isSuggested
                                    />
                                ))
                            ) : (
                                <EmptyPageDescription
                                    title={t("there_aren’t_any_suggested_members")}
                                    subtitle={t("to_see_suggestions")}
                                />
                            )}
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ManageMembersModal;
