import React, { FC, ReactElement } from "react";
import { useHistory } from "react-router-dom";

import { useBackButtonStyles } from "./BackButtonStyles";
import { ArrowIcon } from "../../icons";
import ActionIconButton from "../ActionIconButton/ActionIconButton";

interface PageProps {
    isGroup?: boolean;
}

const BackButton: FC<PageProps> = ({ isGroup }): ReactElement => {
    // Destructure props here
    const classes = useBackButtonStyles();
    const history = useHistory();

    const handleClickButton = (): void => {
        if (isGroup === true) {
            history.push("/home/group");
        } else {
            history.goBack();
        }
    };

    return (
        <div className={classes.container}>
            <ActionIconButton actionText={"Back"} onClick={handleClickButton} icon={ArrowIcon} />
        </div>
    );
};

export default BackButton;
