import { createAsyncThunk } from "@reduxjs/toolkit";
import { TaskStatusEnum } from "../model/ITask";
import { api } from "@/1_app/axios config/api";

interface UpdateTaskStatusProp {
  id: number;
  status: TaskStatusEnum;
}

export const updateTaskStatus = createAsyncThunk<
  void,
  UpdateTaskStatusProp,
  { rejectValue: string }
>(
  "/tasks/updateTaskStatus",
  async ({ id, status }: UpdateTaskStatusProp, { rejectWithValue }) => {
    try {
      await api.put(`/tasks/updateStatu/${id}`, { status });
    } catch (error) {
      return rejectWithValue(
        `Ошибка Обновления статуса задачи, ${String(error)}`
      );
    }
  }
);