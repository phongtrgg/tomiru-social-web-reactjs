import React, { FC, ReactElement, ReactNode } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";

import CloseButton from "../CloseButton/CloseButton";
import { useDialogTitleComponentStyles } from "./DialogTitleComponentStyles";
import { WriteMessage } from "../../icons";
import Display from "../../pages/Settings/AccessibilityDisplayLanguages/Display/Display";

interface DialogTitleComponentProps {
    title?: string;
    onClose?: () => void;
    borderBottom?: boolean;
    children?: ReactNode;
}

const DialogTitleComponent: FC<DialogTitleComponentProps> = (
    {
        title,
        onClose,
        children,
        borderBottom
    }
): ReactElement => {
    const classes = useDialogTitleComponentStyles({ borderBottom });

    return (
        <DialogTitle className={classes.dialogTitle}>
            {/* <div style={{width:20,display:"flex",justifyContent:"center",alignItems:"center" }}>{WriteMessage}</div> */}
            <p style={{ marginLeft: 10 }}>{title}</p>
            <div className={classes.button}>
                {children}
            </div>
        </DialogTitle>
    );
};

export default DialogTitleComponent;
