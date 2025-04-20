import { ITask } from "./ITask";

export interface TasksState {
  list: ITask[];
  isLoad: boolean;
  hasError: boolean;
}

export const tasksInitialState: TasksState = {
  list: [],
  isLoad: false,
  hasError: false,
};
