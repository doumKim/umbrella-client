import * as actions from './actions';
import { ActionType } from 'typesafe-actions';

export type AuthAction = ActionType<typeof actions>;

export type AuthState = {
  authStatus: {
    loading: boolean;
    authenticated: boolean;
    error: Error | null;
  };
};
