import { createReducer } from 'redux-act';

import { productActions } from '../actions';

const initialState = {
  products: [],
  currentProduct: null,
  sortFilter: '',
  categoryFilter: ''
};

export default createReducer(
  {
    [productActions.setCategoryFilter]: (state, payload) => ({
      ...state,
      categoryFilter: payload
    }),
    [productActions.setSortFilter]: (state, payload) => ({
      ...state,
      sortFilter: payload
    }),
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
