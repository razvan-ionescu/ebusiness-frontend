import createSagaMiddleware from 'redux-saga';
import { takeLatest, all } from 'redux-saga/effects';
import api from '../../lib/api';

import * as auth from './auth';
import { authTypes } from '../actionTypes';

const API = api();

function* watchAuth() {
  yield all([
    takeLatest(authTypes.LOGIN, auth.login, API),
    takeLatest(authTypes.REGISTER, auth.register, API),
    takeLatest(authTypes.CHECK_AUTH, auth.checkAuth),
    takeLatest(authTypes.LOGOUT, auth.logout)
  ]);
}

export const sagaMiddleware = createSagaMiddleware();
export const authSaga = watchAuth;
