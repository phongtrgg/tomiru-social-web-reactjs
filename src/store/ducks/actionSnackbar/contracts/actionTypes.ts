import { Action } from "redux";

export enum ActionSnackbarTypes {
    SET_OPEN_SNACKBAR = "actionSnackbar/SET_OPEN_SNACKBAR",
    SET_OPEN_ERROR_SNACKBAR = "actionSnackbar/SET_OPEN_ERROR_SNACKBAR",
    SET_CLOSE_SNACKBAR = "actionSnackbar/SET_CLOSE_SNACKBAR",
    SET_OPEN_MODAL = "actionModal/SET_OPEN_MODAL",
    SET_CLOSE_MODAL = "actionModal/SET_CLOSE_MODAL"
}

export interface SetOpenSnackBarActionInterface extends Action<ActionSnackbarTypes> {
    type: ActionSnackbarTypes.SET_OPEN_SNACKBAR;
    payload: string;
}

export interface SetOpenErrorSnackBarActionInterface extends Action<ActionSnackbarTypes> {
    type: ActionSnackbarTypes.SET_OPEN_ERROR_SNACKBAR;
    payload: string;
}

export interface SetCloseSnackBarActionInterface extends Action<ActionSnackbarTypes> {
    type: ActionSnackbarTypes.SET_CLOSE_SNACKBAR;
}
export interface SetOpenModalActionInterface extends Action<ActionSnackbarTypes> {
    type: ActionSnackbarTypes.SET_OPEN_MODAL;
    payload: string;
}

export interface SetCloseModalActionInterface extends Action<ActionSnackbarTypes> {
    type: ActionSnackbarTypes.SET_CLOSE_MODAL;
}

export type ActionSnackbarActions =
    | SetOpenSnackBarActionInterface
    | SetOpenErrorSnackBarActionInterface
    | SetCloseSnackBarActionInterface
    | SetOpenModalActionInterface
    | SetCloseModalActionInterface;
