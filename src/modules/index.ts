import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { signInSaga, signOutSaga } from './auth';
import schedule, { userScheduleSaga } from './schedule';

const rootReducer = combineReducers({
  auth,
  schedule,
});

export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga(): Generator {
  yield all([signInSaga(), signOutSaga(), userScheduleSaga()]);
}

export default rootReducer;
