import { ActionType } from 'typesafe-actions';
import { FriendListType } from '../../api/friend';
import * as actions from './actions';

export type FriendListAction = ActionType<typeof actions>;

export type FriendListState = {
  myFriendList: {
    loading: boolean;
    friendList: FriendListType | undefined;
    error: Error | null;
  };
};
