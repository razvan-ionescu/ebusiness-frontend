import { createReducer } from 'redux-act';

import { categoryActions } from '../actions';

const initialState = {
  categories: []
};

export default createReducer(
  {
    [categoryActions.getCategoriesSuccess]: (state, payload) => ({
      ...state,
      categories: payload.length ? [...payload] : []
    })
  },
  initialState
);
