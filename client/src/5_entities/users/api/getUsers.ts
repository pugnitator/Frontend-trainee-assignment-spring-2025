import { enqueueSnackbar } from "notistack";
import { messageVariants } from "../../../6_shared/config/notificationStyles";
import { api } from "../../../1_app/axios config/api";

export const getUsers = async () => {
  const cached = sessionStorage.getItem("users");
  if (cached) return JSON.parse(cached);

  try {
    const response = await api.get("/users");
    const users = response.data.data;
    sessionStorage.setItem("users", JSON.stringify(users));
    return users;
  } catch (error) {
    enqueueSnackbar("Не удалось получить список ответственных", {
      style: messageVariants.error,
    });
    console.log(error);
    return null;
  }
};
