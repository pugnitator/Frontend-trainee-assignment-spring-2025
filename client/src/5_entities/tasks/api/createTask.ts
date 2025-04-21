import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/1_app/axios config/api";
import { enqueueSnackbar } from "notistack";
import { messageVariants } from "@/6_shared/config/notificationStyles";
import { ITask, TaskStatusEnum } from "../model/ITask";
import { BoardId } from "../hooks/useTasks";

export interface CreateTaskProp {
  assigneeId: number;
  boardId: BoardId;
  description: string;
  priority: string;
  title: string;
  status?: TaskStatusEnum;
}

export const createTask = createAsyncThunk<
  ITask[],
  CreateTaskProp,
  { rejectValue: string }
>("/tasks/createTask", async (task: CreateTaskProp, { rejectWithValue }) => {
  try {
    const response = await api.post("/tasks/create", task);
    return response.data.data;
  } catch (error) {
    enqueueSnackbar("Не удалось создать задачу", {
      style: messageVariants.error,
    });
    return rejectWithValue(`Ошибка создания задачи, ${String(error)}`);
  }
});
