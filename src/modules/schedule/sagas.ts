import { getUserScheduleAsync, GET_USER_SCHEDULE } from './actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import { getUserSchedule } from '../../api/schedule';

function* getUserScheduleSaga() {
  try {
    const userSchedules = yield call(getUserSchedule);
    yield put(getUserScheduleAsync.success(userSchedules));
  } catch (e) {
    yield put(getUserScheduleAsync.failure(e));
  }
}

export function* userScheduleSaga(): Generator {
  yield takeEvery(GET_USER_SCHEDULE, getUserScheduleSaga);
}
