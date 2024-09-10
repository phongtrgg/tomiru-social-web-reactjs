import produce, { Draft } from 'immer';
import { BackgroundState } from './contracts/state';
import {  BackgroundActionsType } from './contracts/actionTypes';
import{BackgroundActions} from './actionCreators';
import { LoadingStatus } from '../../../types/common';

export const initialBackgroundState: BackgroundState = {
    item: null,
    loadingState: LoadingStatus.LOADING,
};

export const backgroundReducer = produce((draft: Draft<BackgroundState>, action: BackgroundActions) => {
    switch (action.type) {
        case BackgroundActionsType.SET_BACKGROUND:
            draft.item = action.payload;
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case BackgroundActionsType.RESET_BACKGROUND_STATE:
            draft.item = null;
            draft.loadingState = LoadingStatus.LOADING;
            break;

        case BackgroundActionsType.SET_LOADING_STATE:
            draft.loadingState = action.payload;
            break;

        default:
            break;
    }
}, initialBackgroundState);
