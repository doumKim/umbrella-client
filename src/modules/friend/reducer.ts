import { createReducer } from 'typesafe-actions';
import {
  GET_USER_FRIEND_LIST,
  GET_USER_FRIEND_LIST_ERROR,
  GET_USER_FRIEND_LIST_SUCCESS,
} from './actions';
import { FriendListAction, FriendListState } from './types';

const initialState: FriendListState = {
  myFriendList: {
    loading: false,
    friendList: undefined,
    error: null,
  },
};

const friendList = createReducer<FriendListState, FriendListAction>(
  initialState,
  {
    [GET_USER_FRIEND_LIST]: state => ({
      ...state,
      myFriendList: {
        loading: true,
        friendList: undefined,
        error: null,
      },
    }),
    [GET_USER_FRIEND_LIST_SUCCESS]: (state, action) => ({
      ...state,
      myFriendList: {
        loading: false,
        friendList: action.payload,
        error: null,
      },
    }),
    [GET_USER_FRIEND_LIST_ERROR]: (state, action) => ({
      ...state,
      myFriendList: {
        loading: true,
        friendList: undefined,
        error: action.payload,
      },
    }),
  }
);

export default friendList;
