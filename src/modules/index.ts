import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { signInSaga, signOutSaga } from './auth';
import schedule, { dropUserScheduleSaga, userScheduleSaga } from './schedule';
import todos from './todos';

const rootReducer = combineReducers({
  auth,
  schedule,
  todos,
});

export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga(): Generator {
  yield all([
    signInSaga(),
    signOutSaga(),
    userScheduleSaga(),
    dropUserScheduleSaga(),
  ]);
}

export default rootReducer;
