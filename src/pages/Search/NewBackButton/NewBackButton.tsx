import React, { ReactElement } from "react";
import { useHistory } from "react-router-dom";
import { useBackButtonStyles } from "../../../components/BackButton/BackButtonStyles";
import ActionIconButton from "../../../components/ActionIconButton/ActionIconButton";
import { ArrowIcon } from "../../../icons";


const NewBackButton = (): ReactElement => {
    const classes = useBackButtonStyles();
    const history = useHistory();

    const handleClickButton = (): void => {
        history.goBack();
    };

    return (
        <div className={classes.container}>
            <ActionIconButton actionText={"Back"} onClick={handleClickButton} icon={ArrowIcon} />
        </div>
    );
};

export default NewBackButton;
