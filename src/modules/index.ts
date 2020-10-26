import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { signInSaga, signOutSaga } from './auth';

const rootReducer = combineReducers({
  auth,
});

export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga(): Generator {
  yield all([signInSaga(), signOutSaga()]);
}

export default rootReducer;
