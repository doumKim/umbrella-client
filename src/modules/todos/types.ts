import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type TodosAction = ActionType<typeof actions>;

export type LocationType = {
  placeName: string;
  latitude: string;
  longitude: string;
};

export type InputTodoType = {
  hour: number;
  minutes: number;
  note: string;
  location: LocationType;
};

export type TodoState = InputTodoType & {
  id: number;
};

export type TodosState = TodoState[];
