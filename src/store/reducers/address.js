import { createReducer } from 'redux-act';

import { addressActions } from '../actions';

const initialState = {
  addresses: []
};

export default createReducer(
  {
    [addressActions.getAddressesSuccess]: (state, payload) => ({
      ...state,
      addresses: payload.length ? [...payload] : []
    }),
    [addressActions.postAddressSuccess]: (state, payload) => ({
      ...state,
      addresses: state.addresses.concat(payload)
    })
  },
  initialState
);
