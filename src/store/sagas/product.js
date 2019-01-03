import { put, call } from 'redux-saga/effects';
import { productActions } from '../actions';

export function* getProducts(api) {
  yield put(productActions.getProductsRequest());
  try {
    const response = yield call(api.getProducts);
    yield put(productActions.getProductsSuccess(response.data));
  } catch (e) {
    yield put(productActions.getProductsFailure(e));
  }
}

export function* getProduct(api, object) {
  yield put(productActions.getProductRequest());
  try {
    const response = yield call(api.getProduct, object.payload);
    yield put(productActions.getProductSuccess(response.data));
  } catch (e) {
    yield put(productActions.getProductFailure(e));
  }
}
