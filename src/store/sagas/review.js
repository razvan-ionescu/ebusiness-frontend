import { put, call } from 'redux-saga/effects';
import { reviewActions } from '../actions';

export function* getReviews(api, object) {
  yield put(reviewActions.getReviewsRequest());
  try {
    const response = yield call(api.getReviews, object.payload);
    yield put(reviewActions.getReviewsSuccess(response.data));
  } catch (e) {
    yield put(reviewActions.getReviewsFailure(e));
  }
}

export function* postReview(api, object) {
  yield put(reviewActions.postReviewRequest());
  try {
    const response = yield call(
      api.postReview,
      object.payload.id,
      object.payload.review
    );
    yield put(reviewActions.postReviewSuccess(response.data));
  } catch (e) {
    yield put(reviewActions.postReviewFailure(e));
  }
}
