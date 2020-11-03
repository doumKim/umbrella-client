import { createAsyncAction } from 'typesafe-actions';

//사용자 토큰 확인
export const GET_USER_TOKEN = 'auth/GET_USER_TOKEN';
export const GET_USER_TOKEN_SUCCESS = 'auth/GET_USER_TOKEN_SUCCESS';
export const GET_USER_TOKEN_ERROR = 'auth/GET_USER_TOKEN_ERROR';

export const getUserTokenAsync = createAsyncAction(
  GET_USER_TOKEN,
  GET_USER_TOKEN_SUCCESS,
  GET_USER_TOKEN_ERROR
)<undefined, undefined, Error>();

//사용자 토큰 삭제
export const REMOVE_USER_TOKEN = 'auth/REMOVE_USER_TOKEN';
export const REMOVE_USER_TOKEN_SUCCESS = 'auth/REMOVE_USER_TOKEN_SUCCESS';
export const REMOVE_USER_TOKEN_ERROR = 'auth/REMOVE_USER_TOKEN_ERROR';

export const removeUserTokenAsync = createAsyncAction(
  REMOVE_USER_TOKEN,
  REMOVE_USER_TOKEN_SUCCESS,
  REMOVE_USER_TOKEN_ERROR
)<undefined, undefined, Error>();
