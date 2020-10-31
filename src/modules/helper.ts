import { ScheduleType, TodoType } from '../api/schedule';

export const sortSchedules = (schedules: ScheduleType[]): ScheduleType[] => {
  const copiedSchedule = [...schedules];
  copiedSchedule.sort(
    (prevSchedule: ScheduleType, nextSchedule: ScheduleType): number => {
      return prevSchedule.date > nextSchedule.date ? 1 : -1;
    }
  );
  for (let i = 0; i < copiedSchedule.length; i++) {
    copiedSchedule[i].todos.sort(
      (prevTodo: TodoType, nextTodo: TodoType): number => {
        if (prevTodo.hour > nextTodo.hour) {
          return 1;
        } else if (prevTodo.hour < nextTodo.hour) {
          return -1;
        } else {
          return prevTodo.minutes > nextTodo.minutes ? 1 : -1;
        }
      }
    );
  }
  return copiedSchedule;
};
