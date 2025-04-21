import { createAsyncThunk } from "@reduxjs/toolkit";
import { BoardId } from "../../tasks/hooks/useTasks";
import { api } from "@/1_app/axios config/api";
import { ITask } from "../../tasks/model/ITask";

export const getBoardTasks = createAsyncThunk<
  ITask[],
  BoardId,
  { rejectValue: string }
>("/boards/getBoardTasks", async (boardId, { rejectWithValue }) => {
  try {
    const response = await api.get(`/boards/${boardId}`);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(`Ошибка загрузки списка задач доски, ${String(error)}`);
  }
});