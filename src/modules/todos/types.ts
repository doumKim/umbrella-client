import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type TodosAction = ActionType<typeof actions>;

export type InputTodoType = {
  hour: number;
  minutes: number;
  note: string;
  placeName: string;
  latitude: string;
  longitude: string;
};

export type TodoState = InputTodoType & {
  id: number;
};

export type TodosState = TodoState[];

export type ScheduleInputState = {
  title: string;
  date: Date;
  todos: TodosState;
};
