import React, { FC, memo, ReactElement } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import CopyToClipboard from "react-copy-to-clipboard";
import { ListItem, Typography } from "@material-ui/core";

import { CLIENT_URL } from "../../../../constants/url-constants";
import { LinkIcon } from "../../../../icons";
import { setOpenSnackBar } from "../../../../store/ducks/actionSnackbar/actionCreators";
import { useTranslation } from "react-i18next";

interface CopyProfileLinkButtonProps {
    onCloseUserPageActions: () => void;
}

const CopyProfileLinkButton: FC<CopyProfileLinkButtonProps> = memo(({ onCloseUserPageActions }): ReactElement => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { t } = useTranslation();
    const onCopyLinkToProfile = (): void => {
        dispatch(setOpenSnackBar("Copied to clipboard"));
        onCloseUserPageActions();
    };

    return (
        <CopyToClipboard text={CLIENT_URL + location.pathname}>
            <ListItem id={"copyLinkToProfile"} onClick={onCopyLinkToProfile}>
                <>{LinkIcon}</>
                <Typography component={"span"}>
                    {t("copy_link_to_profile")}
                </Typography>
            </ListItem>
        </CopyToClipboard>
    );
});

export default CopyProfileLinkButton;
