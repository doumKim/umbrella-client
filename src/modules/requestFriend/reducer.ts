import { createReducer } from 'typesafe-actions';
import {
  GET_USER_REQUEST_LIST,
  GET_USER_REQUEST_LIST_ERROR,
  GET_USER_REQUEST_LIST_SUCCESS,
} from './actions';
import { RequestFriendListAction, RequestFriendListState } from './types';

const initialState: RequestFriendListState = {
  myRequestFriendList: {
    loading: false,
    requestFriendList: null,
    error: null,
  },
};

const requestFriendList = createReducer<
  RequestFriendListState,
  RequestFriendListAction
>(initialState, {
  [GET_USER_REQUEST_LIST]: state => ({
    ...state,
    myRequestFriendList: {
      loading: true,
      requestFriendList: null,
      error: null,
    },
  }),
  [GET_USER_REQUEST_LIST_SUCCESS]: (state, action) => ({
    ...state,
    myRequestFriendList: {
      loading: false,
      requestFriendList: action.payload,
      error: null,
    },
  }),
  [GET_USER_REQUEST_LIST_ERROR]: (state, action) => ({
    ...state,
    myRequestFriendList: {
      loading: true,
      requestFriendList: null,
      error: action.payload,
    },
  }),
});

export default requestFriendList;
