import { BoardId, TaskStatusEnum } from "../hooks/useTasks";

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
  priority: string;  //TODO: добавить enum
  status: TaskStatusEnum;
  title: string;
}
