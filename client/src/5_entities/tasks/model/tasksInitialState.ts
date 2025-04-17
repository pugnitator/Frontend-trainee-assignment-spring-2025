import { ITask } from "./ITask";

export interface TasksState {
  list: ITask[];
  isLoad: boolean;
}

export const tasksInitialState: TasksState = {
  list: [],
  isLoad: false,
};
