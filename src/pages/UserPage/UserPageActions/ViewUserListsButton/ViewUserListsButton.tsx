import React, { FC, memo, ReactElement } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import UserItemAction from "../UserItemAction/UserItemAction";
import { resetUserProfileState } from "../../../../store/ducks/userProfile/actionCreators";
import { LISTS_MEMBERSHIPS } from "../../../../constants/path-constants";
import { selectUserProfileId } from "../../../../store/ducks/userProfile/selectors";
import { ListsIcon } from "../../../../icons";
import { useTranslation } from "react-i18next";

const ViewUserListsButton: FC = memo((): ReactElement => {
    const dispatch = useDispatch();
    const history = useHistory();
    const userProfileId = useSelector(selectUserProfileId);
    const { t } = useTranslation()
    const onClickViewUserLists = (): void => {
        dispatch(resetUserProfileState());
        history.push(`${LISTS_MEMBERSHIPS}/${userProfileId}`);
    };

    return (
        <div id={"viewUserLists"} onClick={onClickViewUserLists}>
            <UserItemAction title={t("view_list")} icon={ListsIcon} />
        </div>
    );
});

export default ViewUserListsButton;
