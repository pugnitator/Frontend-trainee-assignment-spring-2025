import { ITask } from "../../tasks/model/ITask";
import { IBoard } from "./IBoard";

export interface BoardsState {
  list: IBoard[];
  isLoad: boolean;
  currentBoardTaskList: ITask[]
}

export const boardsInitialState: BoardsState = {
  list: [],
  isLoad: false,
  currentBoardTaskList: [],
};
