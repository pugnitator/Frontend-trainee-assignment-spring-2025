import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/1_app/axios config/api";
import { CreateTaskProp } from "./createTask";

interface UpdateTaskProp {
  task: CreateTaskProp;
  id: number;
}

export const updateTask = createAsyncThunk<
  void,
  UpdateTaskProp,
  { rejectValue: string }
>(
  "/tasks/updateTask",
  async ({ task, id }: UpdateTaskProp, { rejectWithValue }) => {
    try {
      await api.put(`/tasks/update/${id}`, { ...task, boardId: undefined });
    } catch (error) {
      return rejectWithValue(`Ошибка создания задачи, ${String(error)}`);
    }
  }
);
