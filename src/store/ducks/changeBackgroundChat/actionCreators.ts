import { Action } from 'redux';
import { BackgroundActionsType } from './contracts/actionTypes';
import { LoadingStatus } from '../../../types/common';

interface SetBackgroundAction extends Action<BackgroundActionsType> {
    type: BackgroundActionsType.SET_BACKGROUND;
    payload: string;
}

interface ResetBackgroundStateAction extends Action<BackgroundActionsType> {
    type: BackgroundActionsType.RESET_BACKGROUND_STATE;
}

interface SetLoadingStateAction extends Action<BackgroundActionsType> {
    type: BackgroundActionsType.SET_LOADING_STATE;
    payload: LoadingStatus;
}

export type BackgroundActions =
    | SetBackgroundAction
    | ResetBackgroundStateAction
    | SetLoadingStateAction;

export const setBackground = (background: string): SetBackgroundAction => ({
    type: BackgroundActionsType.SET_BACKGROUND,
    payload: background,
});

export const resetBackgroundState = (): ResetBackgroundStateAction => ({
    type: BackgroundActionsType.RESET_BACKGROUND_STATE,
});

export const setLoadingState = (status: LoadingStatus): SetLoadingStateAction => ({
    type: BackgroundActionsType.SET_LOADING_STATE,
    payload: status,
});
