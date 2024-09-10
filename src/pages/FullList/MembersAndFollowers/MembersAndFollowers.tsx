import React, { memo, ReactElement } from "react";
import { useSelector } from "react-redux";

import MembersAndFollowersModal from "../FullListTweets/MembersAndFollowersModal/MembersAndFollowersModal";
import {
    selectListItemFollowersSize,
    selectListItemId,
    selectListItemMembersSize,
    selectListItemOwnerId
} from "../../../store/ducks/list/selectors";
import FullListUserCount from "./FullListUserCount/FullListUserCount";
import { useListModal } from "../../../hook/useListModal";
import { useTranslation } from "react-i18next";

const MembersAndFollowers = memo((): ReactElement => {
    const listId = useSelector(selectListItemId);
    const listOwnerId = useSelector(selectListItemOwnerId);
    const membersSize = useSelector(selectListItemMembersSize);
    const followersSize = useSelector(selectListItemFollowersSize);
    const { visibleMembersAndFollowersModal, modalWindowTitle, onOpenModalWindow, onCloseModalWindow } = useListModal();
    const { t } = useTranslation();
    return (
        <div>
            <FullListUserCount
                id={"listMembers"}
                userCount={membersSize}
                title={t("members")}
                onOpenModalWindow={onOpenModalWindow}
            />
            <FullListUserCount
                id={"listFollowers"}
                userCount={followersSize}
                title={t("followers")}
                onOpenModalWindow={onOpenModalWindow}
            />
            <MembersAndFollowersModal
                listId={listId!}
                listOwnerId={listOwnerId!}
                visible={visibleMembersAndFollowersModal}
                title={modalWindowTitle}
                onClose={onCloseModalWindow}
            />
        </div>
    );
});

export default MembersAndFollowers;
