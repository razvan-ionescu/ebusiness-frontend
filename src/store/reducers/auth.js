import { createReducer } from 'redux-act';

import { authActions } from '../actions';

const initialState = {
  currentUser: null,
  token: null
};

export default createReducer(
  {
    [authActions.loginSuccess]: (state, payload) => ({
      ...state,
      token: payload.token,
      currentUser: { ...payload.user }
    }),
    [authActions.registerSuccess]: (state, payload) => ({
      ...state,
      token: payload.token,
      currentUser: { ...payload.user }
    }),
    [authActions.logoutSuccess]: state => ({
      ...state,
      token: null,
      currentUser: null
    }),
    [authActions.getProfileSuccess]: (state, payload) => ({
      ...state,
      currentUser: { ...payload }
    }),
    [authActions.patchUserSuccess]: (state, payload) => ({
      ...state,
      token: payload.token,
      currentUser: {
        ...payload.user,
        client: { ...payload.client }
      }
    })
  },
  initialState
);
