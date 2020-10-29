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

//사용자 일정 삭제
export const REMOVE_USER_SCHEDULE = 'schedule/REMOVE_USER_SCHEDULE';
export const REMOVE_USER_SCHEDULE_SUCCESS =
  'schedule/REMOVE_USER_SCHEDULE_SUCCESS';
export const REMOVE_USER_SCHEDULE_ERROR = 'schedule/REMOVE_USER_SCHEDULE_ERROR';

export const removeUserScheduleAsync = createAsyncAction(
  REMOVE_USER_SCHEDULE,
  REMOVE_USER_SCHEDULE_SUCCESS,
  REMOVE_USER_SCHEDULE_ERROR
)<number, number, AxiosError>();
