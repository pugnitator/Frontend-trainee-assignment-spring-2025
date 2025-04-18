import { Navigate, Route, Routes } from "react-router";
import { Boards } from "../2_pages/Boards";
import { Board } from "../2_pages/Board";
import { Header } from "../3_widgets/header/Header";
import { ROUTES } from "./routes";
import { Issues } from "../2_pages/Issues";
import { SnackbarProvider } from "notistack";
import { useAppDispatch } from "../6_shared/hooks/useAppDispatch";
import { useEffect } from "react";
import { getBoards } from "../5_entities/boards/api/getBoards";
import { getTasks } from "../5_entities/tasks/api/getTasks";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getBoards());
    dispatch(getTasks());
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
