import React from "react";

interface UseClickAway {
    onClickOpen: () => void;
    onClickClose: () => void;
    open: boolean;
    saveId?: any;
    id?: any;
}

export const useClickAway = (): UseClickAway => {
    const [open, setOpen] = React.useState<boolean>(false);
    const [id, setId] = React.useState<any>();

    const onClickOpen = (): void => {
        setOpen((prev) => !prev);
        // setId(props);
    };

    const onClickClose = (): void => {
        setOpen(false);
        setId(null);
    };
    const saveId = (id: any): void => {
        setId(id);
    };

    return { id, open, onClickOpen, onClickClose, saveId };
};
