export interface ITask {
  assignee: {
    avatarUrl: string;
    email: string;
    fullName: string;
    id: number;
  };
  boardName?: string;
  description: string;
  id: number;
  priority: string;  //TODO: добавить enum
  status: string; //TODO: добавить enum
  title: string;
}
