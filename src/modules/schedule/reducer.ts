import { createReducer } from 'typesafe-actions';
import {
  GET_USER_SCHEDULE,
  GET_USER_SCHEDULE_ERROR,
  GET_USER_SCHEDULE_SUCCESS,
} from './actions';
import { ScheduleAction, ScheduleState } from './types';

const initialState: ScheduleState = {
  mySchedules: {
    loading: false,
    schedules: null,
    error: null,
  },
};

const schedule = createReducer<ScheduleState, ScheduleAction>(initialState, {
  [GET_USER_SCHEDULE]: state => ({
    ...state,
    mySchedules: {
      loading: true,
      error: null,
      schedules: null,
    },
  }),
  [GET_USER_SCHEDULE_SUCCESS]: (state, action) => ({
    ...state,
    mySchedules: {
      loading: false,
      error: null,
      schedules: action.payload,
    },
  }),
  [GET_USER_SCHEDULE_ERROR]: (state, action) => ({
    ...state,
    mySchedules: {
      loading: false,
      error: action.payload,
      schedules: null,
    },
  }),
});

export default schedule;
