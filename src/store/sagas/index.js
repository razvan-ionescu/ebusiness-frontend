import createSagaMiddleware from 'redux-saga';
import { takeLatest, all } from 'redux-saga/effects';
import api from '../../lib/api';

import * as auth from './auth';
import * as product from './product';
import * as category from './category';
import * as review from './review';
import * as address from './address';
import * as order from './order';
import {
  authTypes,
  productTypes,
  categoryTypes,
  reviewTypes,
  addressTypes,
  orderTypes
} from '../actionTypes';

const API = api();

function* watchAuth() {
  yield all([
    takeLatest(authTypes.LOGIN, auth.login, API),
    takeLatest(authTypes.REGISTER, auth.register, API),
    takeLatest(authTypes.CHECK_AUTH, auth.checkAuth),
    takeLatest(authTypes.LOGOUT, auth.logout),
    takeLatest(authTypes.GET_PROFILE, auth.getProfile, API),
    takeLatest(authTypes.PATCH_USER, auth.patchUser, API)
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

function* watchReviews() {
  yield all([
    takeLatest(reviewTypes.GET_REVIEWS, review.getReviews, API),
    takeLatest(reviewTypes.POST_REVIEW, review.postReview, API)
  ]);
}

function* watchAddresses() {
  yield all([
    takeLatest(addressTypes.GET_ADDRESSES, address.getAddresses, API),
    takeLatest(addressTypes.POST_ADDRESS, address.postAddress, API)
  ]);
}

function* watchOrders() {
  yield all([
    takeLatest(orderTypes.GET_ORDERS, order.getOrders, API),
    takeLatest(orderTypes.POST_ORDER, order.postOrder, API)
  ]);
}

export const sagaMiddleware = createSagaMiddleware();
export const authSaga = watchAuth;
export const productSaga = watchProduct;
export const categorySaga = watchCategories;
export const reviewSaga = watchReviews;
export const addressSaga = watchAddresses;
export const orderSaga = watchOrders;
