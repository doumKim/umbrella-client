import { getRequestFriendListAsync, GET_USER_REQUEST_LIST } from './actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import { getRequestFriends } from '../../api/friend';

function* getRequestFriendListSaga() {
  try {
    const RequestFriendList = yield call(getRequestFriends);
    yield put(getRequestFriendListAsync.success(RequestFriendList));
  } catch (e) {
    yield put(getRequestFriendListAsync.failure(e));
  }
}
export function* requestFriendListSaga(): Generator {
  yield takeEvery(GET_USER_REQUEST_LIST, getRequestFriendListSaga);
}
