import { AxiosError } from 'axios';
import { createAsyncAction } from 'typesafe-actions';
import { ScheduleType } from '../../api/schedule';

// 사용자 일정 가져오기
export const GET_USER_SCHEDULE = 'schedule/GET_USER_SCHEDULE';
export const GET_USER_SCHEDULE_SUCCESS = 'schedule/GET_USER_SCHEDULE_SUCCESS';
export const GET_USER_SCHEDULE_ERROR = 'schedule/GET_USER_SCHEDULE_ERROR';

export const getUserScheduleAsync = createAsyncAction(
  GET_USER_SCHEDULE,
  GET_USER_SCHEDULE_SUCCESS,
  GET_USER_SCHEDULE_ERROR
)<undefined, ScheduleType[], AxiosError>();
