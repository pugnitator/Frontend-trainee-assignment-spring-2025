import { Navigate, Route, Routes } from "react-router";
import { SnackbarProvider } from "notistack";
import { useEffect } from "react";
import { Boards, Board, Issues } from "@/2_pages/index";
import { Header } from "@/3_widgets/index";
import { ROUTES } from "./routes";
import { useAppDispatch } from "@/6_shared/index";
import { getBoards } from "@/5_entities/boards/index";
import { useTasks } from "@/5_entities/tasks/index";

function App() {
  const dispatch = useAppDispatch();
  //запрашиваю задачи, чтобы обновить стейт до перехода на страницу задач, чтобы к ним был доступ при переходе к доске
  const {tasks} = useTasks(); 
  
  useEffect(() => {
    dispatch(getBoards());
  }, []);

  return (
    <>
      <SnackbarProvider maxSnack={3} autoHideDuration={3000} />
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to={ROUTES.BOARDS} />} />
        <Route path={ROUTES.BOARDS} element={<Boards />} />
        <Route path={ROUTES.ISSUES} element={<Issues />} />
        <Route path={ROUTES.BOARD.PATH} element={<Board />} />
        <Route path="*" element={<Navigate to="/boards" />} />
      </Routes>
    </>
  );
}

export default App;
