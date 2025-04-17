import { createSlice } from "@reduxjs/toolkit";
import { boardsInitialState } from "./model/boardsInitialState";
import { IBoard } from "./model/IBoard";
import { getBoards } from "./api/getBoards";

const boardsSlice = createSlice({
  name: "boards",
  initialState: boardsInitialState,
  reducers: {
    setBoards(state, action) {
      state.list = action.payload;
      state.isLoad = true;
    },
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
      });
  },
});

export const boardsSliceActions = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;