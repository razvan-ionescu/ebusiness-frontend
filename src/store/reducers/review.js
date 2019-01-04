import { createReducer } from 'redux-act';

import { reviewActions } from '../actions';

const initialState = {
  reviews: []
};

export default createReducer(
  {
    [reviewActions.getReviewsSuccess]: (state, payload) => ({
      ...state,
      reviews: payload.length ? [...payload] : []
    }),
    [reviewActions.postReviewSuccess]: (state, payload) => ({
      ...state,
      reviews: [...state.reviews, payload]
    })
  },
  initialState
);
