import { put, call } from 'redux-saga/effects';
import { categoryActions } from '../actions';

export function* getCategories(api) {
  yield put(categoryActions.getCategoriesRequest());
  try {
    const response = yield call(api.getCategories);
    yield put(categoryActions.getCategoriesSuccess(response.data));
  } catch (e) {
    yield put(categoryActions.getCategoriesFailure(e));
  }
}
