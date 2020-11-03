import { AxiosError } from 'axios';
import { createAsyncAction } from 'typesafe-actions';
import { FriendListType } from '../../api/friend';

// 친구 목록 가져오기
export const GET_USER_FRIEND_LIST = 'friendList/GET_USER_FRIEND_LIST';
export const GET_USER_FRIEND_LIST_SUCCESS =
  'friendList/GET_USER_FRIEND_LIST_SUCCESS';
export const GET_USER_FRIEND_LIST_ERROR =
  'friendList/GET_USER_FRIEND_LIST_ERROR';

export const getFriendListAsync = createAsyncAction(
  GET_USER_FRIEND_LIST,
  GET_USER_FRIEND_LIST_SUCCESS,
  GET_USER_FRIEND_LIST_ERROR
)<undefined, FriendListType, AxiosError>();
