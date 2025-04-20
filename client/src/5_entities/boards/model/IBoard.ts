import { BoardId } from "../../tasks/hooks/useTasks";

export interface IBoard {
  description: string;
  id: BoardId;
  name: string;
  taskCount: number;
}
