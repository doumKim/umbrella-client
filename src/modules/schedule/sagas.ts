import {
  getUserScheduleAsync,
  GET_USER_SCHEDULE,
  removeUserScheduleAsync,
  REMOVE_USER_SCHEDULE,
} from './actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import { getUserSchedule, removeUserSchedule } from '../../api/schedule';

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

function* removeUserScheduleSaga(
  action: ReturnType<typeof removeUserScheduleAsync.request>
) {
  try {
    yield call(removeUserSchedule, action.payload);
    yield put(removeUserScheduleAsync.success(action.payload));
  } catch (e) {
    yield put(removeUserScheduleAsync.failure(e));
  }
}

export function* dropUserScheduleSaga(): Generator {
  yield takeEvery(REMOVE_USER_SCHEDULE, removeUserScheduleSaga);
}
