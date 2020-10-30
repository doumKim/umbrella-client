import { getFriendListAsync, GET_USER_FRIEND_LIST } from './actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import { getFriends } from '../../api/friend';

function* getFriendListSaga() {
  try {
    const friendList = yield call(getFriends);
    yield put(getFriendListAsync.success(friendList));
  } catch (e) {
    yield put(getFriendListAsync.failure(e));
  }
}
export function* friendListSaga(): Generator {
  yield takeEvery(GET_USER_FRIEND_LIST, getFriendListSaga);
}
