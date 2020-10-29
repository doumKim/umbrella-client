import { ActionType } from 'typesafe-actions';
import { RequestFriendListType } from '../../api/friend';
import * as actions from './actions';

export type RequestFriendListAction = ActionType<typeof actions>;

export type RequestFriendListState = {
  myRequestFriendList: {
    loading: boolean;
    requestFriendList: RequestFriendListType | null;
    error: Error | null;
  };
};
