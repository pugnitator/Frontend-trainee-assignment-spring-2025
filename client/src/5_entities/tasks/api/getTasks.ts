import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../1_app/axios config/api";
import { enqueueSnackbar } from "notistack";
import { messageVariants } from "../../../6_shared/config/notificationStyles";
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
    enqueueSnackbar("Не удалось получить список задач", {
      style: messageVariants.error,
    });
    return rejectWithValue(`Ошибка загрузки списка задач, ${String(error)}`);
  }
});
