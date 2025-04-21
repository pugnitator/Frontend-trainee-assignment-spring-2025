import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/1_app/axios config/api";
import { ITask } from "../model/ITask";

export const getTasks = createAsyncThunk<
  ITask[],
  void,
  { rejectValue: string }
>("/tasks/getTasks", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/tasks");
    return response.data.data;
  } catch (error) {
    return rejectWithValue(`Ошибка загрузки списка задач, ${String(error)}`);
  }
});
