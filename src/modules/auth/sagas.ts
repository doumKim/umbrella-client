import {
  getUserTokenAsync,
  removeUserTokenAsync,
  GET_USER_TOKEN,
  REMOVE_USER_TOKEN,
} from './actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import { getUserToken, removeUserToken } from '../../api/auth';

function* getUserTokenSaga() {
  try {
    yield call(getUserToken);
    yield put(getUserTokenAsync.success());
  } catch (err) {
    yield put(getUserTokenAsync.failure(err));
  }
}

export function* signInSaga(): Generator {
  yield takeEvery(GET_USER_TOKEN, getUserTokenSaga);
}

function* removeUserTokenSaga() {
  try {
    yield call(removeUserToken);
    yield put(removeUserTokenAsync.success());
  } catch (err) {
    yield put(removeUserTokenAsync.failure(err));
  }
}

export function* signOutSaga(): Generator {
  yield takeEvery(REMOVE_USER_TOKEN, removeUserTokenSaga);
}
