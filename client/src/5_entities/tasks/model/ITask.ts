import { BoardId } from "../hooks/useTasks";

export enum TaskStatusEnum {
  Backlog = "Backlog",
  InProgress = "InProgress",
  Done = "Done",
}

export enum TaskPriorityEnum {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High'
}

export interface ITask {
  assignee: {
    avatarUrl: string;
    email: string;
    fullName: string;
    id: number;
  };
  boardId: BoardId;
  boardName: string;
  description: string;
  id: number;
  priority: TaskPriorityEnum;
  status: TaskStatusEnum;
  title: string;
}
