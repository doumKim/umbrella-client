import { ActionType } from 'typesafe-actions';
import { ScheduleType } from '../../api/schedule';
import * as actions from './actions';

export type ScheduleAction = ActionType<typeof actions>;

export type ScheduleState = {
  mySchedules: {
    loading: boolean;
    schedules: ScheduleType[] | null;
    error: Error | null;
  };
};
