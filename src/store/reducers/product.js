import { createReducer } from 'redux-act';

import { productActions } from '../actions';

const initialState = {
  products: [],
  currentProduct: null
};

export default createReducer(
  {
    [productActions.getProductsSuccess]: (state, payload) => ({
      ...state,
      products: payload.length ? [...payload] : []
    }),
    [productActions.getProductSuccess]: (state, payload) => ({
      ...state,
      currentProduct: { ...payload }
    })
  },
  initialState
);
