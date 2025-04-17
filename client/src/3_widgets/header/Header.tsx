import styled from "styled-components";
import { HeaderMenuItem } from "./HeaderMenuItem";
import { ROUTES } from "../../1_app/routes";
import { Modal } from "../modals/Modal";
import { useSelector } from "react-redux";
import { RootState } from "../../5_entities/store";
import { useAppDispatch } from "../../6_shared/hooks/useAppDispatch";
import { appSliceActions } from "../../1_app/appSlice";
import { TaskForm } from "../../4_features/forms/TaskForm";

export const Header = () => {
  const isModalOpen = useSelector((state: RootState) => state.app.isModalOpen);
  const dispatch = useAppDispatch();
  const onClickCreateTask = () => {
    dispatch(appSliceActions.openModal());
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
          <TaskForm />
        </Modal>
      )}
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: var(--header-height);

  border-bottom: 2px solid var(--color-dark);
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
  gap: 30px;
`;

const CreateTaskButton = styled.button`
  display: inline-flex;
  align-items: center;

  color: var(--color-light);
  background-color: var(--color-blue);
`;
