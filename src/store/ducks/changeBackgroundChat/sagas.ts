import { takeLatest, put } from 'redux-saga/effects';
import { BackgroundActionsType } from './contracts/actionTypes';
import {setLoadingState, setBackground} from './actionCreators';
import { LoadingStatus } from '../../../types/common';

function* handleSetBackground(action: ReturnType<typeof setBackground>) {
    try {
        yield put(setLoadingState(LoadingStatus.LOADING));
        // Logic to handle background change (e.g., API call, saving to local storage, etc.)
        yield put(setLoadingState(LoadingStatus.LOADED));
    } catch (error) {
        yield put(setLoadingState(LoadingStatus.ERROR));
    }
}

export default function* backgroundSaga() {
    yield takeLatest(BackgroundActionsType.SET_BACKGROUND, handleSetBackground);
}
