import { put, call } from 'redux-saga/effects';
import jwtDecode from 'jwt-decode';
import { authActions } from '../actions';

import * as auth from '../../lib/auth';
import history from '../../lib/history';

export function* checkAuth() {
  const token = yield call(auth.getToken);
  if (token) {
    try {
      const user = jwtDecode(token);
      yield put(
        authActions.loginSuccess({
          token,
          user: { ...user.context }
        })
      );
    } catch (e) {
      console.log(e);
    }
  }
}

export function* login(api, object) {
  yield put(authActions.loginRequest());
  try {
    const response = yield call(api.postLogin, object.payload);
    yield call(auth.setToken, response.data.token);
    const user = jwtDecode(response.data.token);
    yield put(
      authActions.loginSuccess({
        token: response.data,
        user: { ...user.context }
      })
    );
    yield call(history.replace, '/');
  } catch (e) {
    yield put(authActions.loginFailure(e));
  }
}

export function* register(api, object) {
  yield put(authActions.registerRequest());
  try {
    const response = yield call(api.postRegister, object.payload);
    yield call(auth.setToken, response.data.token);
    const user = jwtDecode(response.data.token);
    yield put(
      authActions.registerSuccess({
        token: response.data,
        user: { ...user.context }
      })
    );
    yield call(history.replace, '/');
  } catch (e) {
    yield put(authActions.registerFailure(e));
  }
}

export function* logout() {
  yield put(authActions.logoutSuccess());
  yield call(auth.deleteToken);
}

export function* getProfile(api) {
  yield put(authActions.getProfileRequest());
  try {
    const response = yield call(api.getUser);
    yield put(authActions.getProfileSuccess(response.data));
  } catch (e) {
    yield put(authActions.getProfileFailure(e));
  }
}

export function* patchUser(api, object) {
  yield put(authActions.patchUserRequest());
  try {
    const response = yield call(api.patchUser, object.payload);
    yield call(auth.setToken, response.data.token);
    const user = jwtDecode(response.data.token);
    yield put(
      authActions.patchUserSuccess({
        token: response.data.token,
        user: { ...user.context },
        client: response.data.client
      })
    );
  } catch (e) {
    yield put(authActions.patchUserFailure(e));
  }
}
