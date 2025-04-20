import { createSlice } from "@reduxjs/toolkit";
import { tasksInitialState } from "./model/tasksInitialState";
import { getTasks } from "./api/getTasks";
import { ITask } from "./model/ITask";


const tasksSlice = createSlice({
  name: "tasks",
  initialState: tasksInitialState,
  reducers: {
    setTasks(state, action) {
      state.list = action.payload;
      state.isLoad = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.isLoad = false;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.list = action.payload as ITask[];
        state.isLoad = true;
      })
      .addCase(getTasks.rejected, (state) => {
        state.isLoad = false;
        state.hasError = true;
      })
  },
});

export const tasksSliceActions = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;