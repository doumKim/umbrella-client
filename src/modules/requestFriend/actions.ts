import { AxiosError } from 'axios';
import { createAsyncAction } from 'typesafe-actions';
import { RequestFriendListType } from '../../api/friend';

// 친구 요청 목록 가져오기
export const GET_USER_REQUEST_LIST = 'requestFriend/GET_USER_REQUEST_LIST';
export const GET_USER_REQUEST_LIST_SUCCESS =
  'requestFriend/GET_USER_REQUEST_LIST_SUCCESS';
export const GET_USER_REQUEST_LIST_ERROR =
  'requestFriend/GET_USER_REQUEST_LIST_ERROR';

export const getRequestFriendListAsync = createAsyncAction(
  GET_USER_REQUEST_LIST,
  GET_USER_REQUEST_LIST_SUCCESS,
  GET_USER_REQUEST_LIST_ERROR
)<undefined, RequestFriendListType, AxiosError>();
