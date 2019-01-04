import { put, call } from 'redux-saga/effects';
import { orderActions } from '../actions';

import history from '../../lib/history';

export function* getOrders(api) {
  yield put(orderActions.getOrdersRequest());
  try {
    const response = yield call(api.getOrders);
    yield put(orderActions.getOrdersSuccess(response.data));
  } catch (e) {
    yield put(orderActions.getOrdersFailure(e));
  }
}

export function* postOrder(api, object) {
  yield put(orderActions.postOrderRequest());
  try {
    const response = yield call(api.postOrder, object.payload);
    yield put(orderActions.postOrderSuccess(response.data));
    yield call(history.replace, '/');
  } catch (e) {
    yield put(orderActions.postOrderFailure(e));
  }
}
