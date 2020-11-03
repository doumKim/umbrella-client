import { createReducer } from 'typesafe-actions';
import { sortSchedules } from '../helper';
import {
  CREATE_USER_SCHEDULE,
  CREATE_USER_SCHEDULE_ERROR,
  CREATE_USER_SCHEDULE_SUCCESS,
  GET_USER_SCHEDULE,
  GET_USER_SCHEDULE_ERROR,
  GET_USER_SCHEDULE_SUCCESS,
  REMOVE_USER_SCHEDULE,
  REMOVE_USER_SCHEDULE_ERROR,
  REMOVE_USER_SCHEDULE_SUCCESS,
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
  [REMOVE_USER_SCHEDULE]: state => ({
    ...state,
    mySchedules: {
      ...state.mySchedules,
      loading: true,
    },
  }),
  [REMOVE_USER_SCHEDULE_SUCCESS]: (state, action) => {
    const { mySchedules } = state;
    const filteredSchedule =
      mySchedules.schedules &&
      mySchedules.schedules.filter(schedule => {
        return schedule && schedule.id !== action.payload;
      });
    return {
      ...state,
      mySchedules: {
        loading: false,
        error: null,
        schedules: filteredSchedule && sortSchedules(filteredSchedule),
      },
    };
  },
  [REMOVE_USER_SCHEDULE_ERROR]: (state, action) => ({
    ...state,
    mySchedules: {
      loading: false,
      error: action.payload,
      schedules: state.mySchedules.schedules,
    },
  }),
  [CREATE_USER_SCHEDULE]: state => ({
    ...state,
    mySchedules: {
      ...state.mySchedules,
      loading: true,
      error: null,
    },
  }),
  [CREATE_USER_SCHEDULE_SUCCESS]: (state, action) => {
    const newSchedules = state.mySchedules.schedules?.concat(action.payload);
    return {
      ...state,
      mySchedules: {
        loading: false,
        error: null,
        schedules: newSchedules && sortSchedules(newSchedules),
      },
    };
  },
  [CREATE_USER_SCHEDULE_ERROR]: (state, action) => ({
    ...state,
    mySchedules: {
      ...state.mySchedules,
      loading: false,
      error: action.payload,
    },
  }),
});

export default schedule;
