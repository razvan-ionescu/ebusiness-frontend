import createSagaMiddleware from 'redux-saga';
import { takeLatest, all } from 'redux-saga/effects';
import api from '../../lib/api';

import * as auth from './auth';
import * as product from './product';
import * as category from './category';
import { authTypes, productTypes, categoryTypes } from '../actionTypes';

const API = api();

function* watchAuth() {
  yield all([
    takeLatest(authTypes.LOGIN, auth.login, API),
    takeLatest(authTypes.REGISTER, auth.register, API),
    takeLatest(authTypes.CHECK_AUTH, auth.checkAuth),
    takeLatest(authTypes.LOGOUT, auth.logout)
  ]);
}

function* watchProduct() {
  yield all([
    takeLatest(productTypes.GET_PRODUCT, product.getProduct, API),
    takeLatest(productTypes.GET_PRODUCTS, product.getProducts, API)
  ]);
}

function* watchCategories() {
  yield takeLatest(categoryTypes.GET_CATEGORIES, category.getCategories, API);
}

export const sagaMiddleware = createSagaMiddleware();
export const authSaga = watchAuth;
export const productSaga = watchProduct;
export const categorySaga = watchCategories;
