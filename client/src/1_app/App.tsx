import { Navigate, Route, Routes } from "react-router";
import { Boards } from "../2_pages/Boards";
import { Board } from "../2_pages/Board";
import { Header } from "../3_widgets/header/Header";
import {ROUTES} from './routes';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to={ROUTES.BOARDS} />} />
        <Route path={ROUTES.BOARDS} element={<Boards />} />
        <Route path={ROUTES.BOARD.PATH} element={<Board />} />
        <Route path={ROUTES.ISSUES} element={<Boards />} />
        <Route path="*" element={<Navigate to='/boards' />} />
      </Routes>
    </>
  );
}

export default App;
