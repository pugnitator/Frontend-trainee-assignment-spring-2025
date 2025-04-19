import { createSlice } from "@reduxjs/toolkit";
import { boardsInitialState } from "./model/boardsInitialState";
import { IBoard } from "./model/IBoard";
import { getBoards } from "./api/getBoards";
import { getBoardTasks } from "./api/getBoardTasks";

const boardsSlice = createSlice({
  name: "boards",
  initialState: boardsInitialState,
  reducers: {
    setBoards(state, action) {
      state.list = action.payload;
      state.isLoad = true;
    },
    setCurrentBoardList(state, action) {
      state.currentBoardTaskList = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBoards.pending, (state) => {
        state.isLoad = false;
      })
      .addCase(getBoards.fulfilled, (state, action) => {
        state.list = action.payload as IBoard[];
        state.isLoad = true;
      })
      .addCase(getBoards.rejected, (state) => {
        state.isLoad = false;
      })
      .addCase(getBoardTasks.fulfilled, (state, action) => {
        state.currentBoardTaskList = action.payload;
      })
      .addCase(getBoardTasks.rejected, (state, action) => {
        console.error(action.payload); 
      });
  },
});

export const boardsSliceActions = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;