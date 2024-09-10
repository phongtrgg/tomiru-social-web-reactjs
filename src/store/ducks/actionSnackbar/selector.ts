import { RootState } from "../../store";
import { ActionModalState, ActionSnackbarState } from "./contracts/state";

export const selectActionSnackbarState = (state: RootState): ActionSnackbarState => state.actionSnackbar;
export const selectSnackBarMessage = (state: RootState): string => selectActionSnackbarState(state).snackBarMessage;
export const selectOpenSnackBar = (state: RootState): boolean => selectActionSnackbarState(state).openSnackBar;
export const selectErrorSnackBar = (state: RootState): boolean => selectActionSnackbarState(state).isError;

export const selectActionModalState = (state: RootState): ActionModalState => state.actionModal;
export const selectModalId = (state: RootState): any => selectActionModalState(state).saveId;
export const selectOpenModal = (state: RootState): boolean => selectActionModalState(state).openModal;
