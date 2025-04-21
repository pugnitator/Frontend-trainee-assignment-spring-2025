import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/1_app/axios config/api";
import { IBoard } from "../model/IBoard";
import { enqueueSnackbar } from "notistack";
import { messageVariants } from "@/6_shared/config/notificationStyles";

export const getBoards = createAsyncThunk<
  IBoard[],
  void,
  { rejectValue: string }
>("/boards/getBoards", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/boards");
    return response.data.data;
  } catch (error) {
    enqueueSnackbar("Не удалось получить список досок", {
      style: messageVariants.error,
    });
    return rejectWithValue(`Ошибка загрузки списка бордов, ${String(error)}`);
  }
});
