import { IBoard } from "./IBoard";

export interface BoardsState {
  list: IBoard[];
  isLoad: boolean;
}

export const boardsInitialState: BoardsState = {
  list: [],
  isLoad: false,
};
