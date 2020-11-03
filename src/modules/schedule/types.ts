import { ActionType } from 'typesafe-actions';
import { ScheduleType } from '../../api/schedule';
import * as actions from './actions';

export type ScheduleAction = ActionType<typeof actions>;

export type ShareInput = {
  friendId: number;
  scheduleId: number;
};

export type ScheduleState = {
  mySchedules: {
    loading: boolean;
    schedules: ScheduleType[] | null | undefined;
    error: Error | null;
  };
};
