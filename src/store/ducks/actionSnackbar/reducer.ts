import produce, { Draft } from "immer";

import { ActionSnackbarActions, ActionSnackbarTypes } from "./contracts/actionTypes";
import { ActionModalState, ActionSnackbarState } from "./contracts/state";

export const initialActionSnackbarState: ActionSnackbarState = {
    snackBarMessage: "",
    isError: false,
    openSnackBar: false
};

export const initialActionModalState: ActionModalState = {
    saveId: null,
    openModal: false
};

export const actionSnackbarReducer = produce((draft: Draft<ActionSnackbarState>, action: ActionSnackbarActions) => {
    switch (action.type) {
        case ActionSnackbarTypes.SET_OPEN_SNACKBAR:
            draft.snackBarMessage = action.payload;
            draft.isError = false;
            draft.openSnackBar = true;
            break;

        case ActionSnackbarTypes.SET_OPEN_ERROR_SNACKBAR:
            draft.snackBarMessage = action.payload;
            draft.isError = true;
            draft.openSnackBar = true;
            break;

        case ActionSnackbarTypes.SET_CLOSE_SNACKBAR:
            draft.openSnackBar = false;
            break;

        default:
            break;
    }
}, initialActionSnackbarState);

export const actionModalReducer = produce((draft: Draft<ActionModalState>, action: ActionSnackbarActions) => {
    switch (action.type) {
        case ActionSnackbarTypes.SET_OPEN_MODAL:
            draft.saveId = action.payload;
            draft.openModal = true;
            break;

        case ActionSnackbarTypes.SET_CLOSE_MODAL:
            draft.openModal = false;
            break;

        default:
            break;
    }
}, initialActionModalState);
