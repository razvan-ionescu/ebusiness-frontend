import { put, call } from 'redux-saga/effects';
import { addressActions } from '../actions';

export function* getAddresses(api, object) {
  yield put(addressActions.getAddressesRequest());
  try {
    const response = yield call(api.getAddresses);
    yield put(addressActions.getAddressesSuccess(response.data));
  } catch (e) {
    yield put(addressActions.getAddressesFailure(e));
  }
}

export function* postAddress(api, object) {
  yield put(addressActions.postAddressRequest());
  try {
    const response = yield call(api.postAddress, object.payload);
    yield put(addressActions.postAddressSuccess(response.data));
  } catch (e) {
    yield put(addressActions.postAddressFailure(e));
  }
}
