import { createReducer } from 'typesafe-actions';
import {
  GET_USER_TOKEN,
  GET_USER_TOKEN_SUCCESS,
  GET_USER_TOKEN_ERROR,
  REMOVE_USER_TOKEN,
  REMOVE_USER_TOKEN_ERROR,
  REMOVE_USER_TOKEN_SUCCESS,
} from './actions';
import { AuthAction, AuthState } from './types';

const initialState: AuthState = {
  authStatus: {
    loading: false,
    authenticated: false,
    error: null,
  },
};

const auth = createReducer<AuthState, AuthAction>(initialState, {
  [GET_USER_TOKEN]: state => ({
    ...state,
    authStatus: {
      loading: true,
      error: null,
      authenticated: false,
    },
  }),
  [GET_USER_TOKEN_SUCCESS]: state => ({
    ...state,
    authStatus: {
      loading: false,
      error: null,
      authenticated: true,
    },
  }),
  [GET_USER_TOKEN_ERROR]: (state, action) => ({
    ...state,
    authStatus: {
      loading: false,
      error: action.payload,
      authenticated: false,
    },
  }),
  [REMOVE_USER_TOKEN]: state => ({
    ...state,
    authStatus: {
      loading: true,
      error: null,
      authenticated: true,
    },
  }),
  [REMOVE_USER_TOKEN_SUCCESS]: state => ({
    ...state,
    authStatus: {
      loading: false,
      error: null,
      authenticated: false,
    },
  }),
  [REMOVE_USER_TOKEN_ERROR]: (state, action) => ({
    ...state,
    authStatus: {
      loading: false,
      error: action.payload,
      authenticated: true,
    },
  }),
});

export default auth;
