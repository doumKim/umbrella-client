import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { signInSaga, signOutSaga } from './auth';
import friendList, { friendListSaga } from './friend';
import requestFriendList, { requestFriendListSaga } from './requestFriend';
import schedule, { dropUserScheduleSaga, userScheduleSaga } from './schedule';

const rootReducer = combineReducers({
  auth,
  schedule,
  friendList,
  requestFriendList,
});

export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga(): Generator {
  yield all([
    signInSaga(),
    signOutSaga(),
    userScheduleSaga(),
    friendListSaga(),
    requestFriendListSaga(),
    dropUserScheduleSaga(),
  ]);
}

export default rootReducer;
