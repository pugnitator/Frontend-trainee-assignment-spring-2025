import styled from "styled-components";
import { useLocation } from "react-router";
import { enqueueSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { HeaderMenuItem } from "./HeaderMenuItem";
import { ROUTES } from "@/1_app/routes";
import { Modal } from "../modals/Modal";
import { RootState } from "@/5_entities/store";
import { useAppDispatch, messageVariants } from "@/6_shared/index";
import { appSliceActions } from "@/1_app/appSlice";
import { TaskForm } from "@/4_features/forms/TaskForm";

export const Header = () => {
  const isModalOpen = useSelector((state: RootState) => state.app.isHeaderModalOpen);
  const isTasksLoad = useSelector((state: RootState) => state.tasks.isLoad);
  const dispatch = useAppDispatch();
  const location = useLocation();

  const boardIdStr = location.pathname
    .split("/")
    .filter((item) => item !== "")?.[1];
  const boardId = boardIdStr ? Number(boardIdStr) : undefined;

  const onClickCreateTask = () => {
    if (!isTasksLoad) {
      enqueueSnackbar("Что-то пошло не так", {
        style: messageVariants.error,
      });
    } else dispatch(appSliceActions.openHeaderModal());
  };

  return (
    <StyledHeader>
      <ContentWrapper>
        <Menu>
          <HeaderMenuItem text={"Проекты"} path={ROUTES.BOARDS} />
          <HeaderMenuItem text={"Задачи"} path={ROUTES.ISSUES} />
        </Menu>
        <CreateTaskButton type="button" onClick={onClickCreateTask}>
          Создать задачу
        </CreateTaskButton>
      </ContentWrapper>
      {isModalOpen && (
        <Modal>
          <TaskForm
            onClose={() => dispatch(appSliceActions.closeHeaderModal())}
            {...(boardId ? { boardId } : {})}
          />
        </Modal>
      )}
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 9998;

  width: 100%;
  min-width: 360px;
  height: var(--header-height);

  background-color: var(--color-light);

  border-bottom: 2px solid var(--color-gray-light);
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  max-width: 1280px;

  padding-inline: var(--content-container-padding-x);
`;

const Menu = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: clamp(10px, 6.38vw, 30px);
`;

const CreateTaskButton = styled.button`
  display: inline-flex;
  align-items: center;
  height: clamp(40px, 12.7vw, 50px);
  min-height: 40px;

  color: var(--color-light);
  background-color: var(--color-blue);
`;
