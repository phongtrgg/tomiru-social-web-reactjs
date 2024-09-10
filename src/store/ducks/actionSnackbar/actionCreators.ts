import {
    ActionSnackbarTypes,
    SetCloseModalActionInterface,
    SetCloseSnackBarActionInterface,
    SetOpenErrorSnackBarActionInterface,
    SetOpenModalActionInterface,
    SetOpenSnackBarActionInterface
} from "./contracts/actionTypes";

export const setOpenSnackBar = (payload: string): SetOpenSnackBarActionInterface => ({
    type: ActionSnackbarTypes.SET_OPEN_SNACKBAR,
    payload
});

export const setOpenErrorSnackBar = (payload: string): SetOpenErrorSnackBarActionInterface => ({
    type: ActionSnackbarTypes.SET_OPEN_ERROR_SNACKBAR,
    payload
});

export const setCloseSnackBar = (): SetCloseSnackBarActionInterface => ({
    type: ActionSnackbarTypes.SET_CLOSE_SNACKBAR
});

export const setOpenModal = (payload: any): SetOpenModalActionInterface => ({
    type: ActionSnackbarTypes.SET_OPEN_MODAL,
    payload
});

export const setCloseModal = (): SetCloseModalActionInterface => ({
    type: ActionSnackbarTypes.SET_CLOSE_MODAL
});
