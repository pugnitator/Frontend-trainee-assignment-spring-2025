import { ITask } from "../../tasks/model/ITask";
import { IBoard } from "./IBoard";

export interface BoardsState {
  list: IBoard[];
  isLoad: boolean;
  hasError: boolean;
  currentBoardTaskList: ITask[];
  selectedTask: ITask | null;
}

export const boardsInitialState: BoardsState = {
  list: [],
  isLoad: false,
  hasError: false,
  currentBoardTaskList: [],
  selectedTask: null,
};
