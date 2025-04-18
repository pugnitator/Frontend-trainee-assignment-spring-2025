import styled from "styled-components";
import { useState } from "react";
import { PageContentContainer } from "../6_shared/ui/PageContentContainer";
import { ITask } from "../5_entities/tasks/model/ITask";
import { TaskCard } from "../5_entities/tasks/ui/TaskCard";
import { useTasks } from "../5_entities/tasks/hooks/useTasks";
import { Modal } from "../3_widgets/modals/Modal";
import { TaskForm } from "../4_features/forms/TaskForm";
import { useAppDispatch } from "../6_shared/hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { RootState } from "../5_entities/store";
import { appSliceActions } from "../1_app/appSlice";

export const Issues = () => {
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const {
    tasks,
    searchTask,
    cancelSearchTask,
    addBoardIdFilter,
    addStatusFilter,
    clearFilters,
    refetch,
  } = useTasks();
  const dispatch = useAppDispatch();
  const isModalOpen = useSelector((state: RootState) => state.app.isModalOpen);

  const onClickTask = (task: ITask) => {
    setSelectedTask(task);
    dispatch(appSliceActions.openModal());
  };

  return (
    <PageContentContainer>
      <h1 className="visually-hidden"> Список всех задач</h1>
      <SearchBar>Тут поиск и фильтры</SearchBar>
      <TaskList>
        {tasks.map((item: ITask) => (
          <TaskCard
            key={`${item.id}${item.boardId}`}
            task={item}
            isShortCard={false}
            onClick={onClickTask}
          />
        ))}
      </TaskList>
      {isModalOpen && selectedTask && (
        <Modal>
          <TaskForm task={selectedTask} />
        </Modal>
      )}
    </PageContentContainer>
  );
};

const SearchBar = styled.div`
  background-color: var(--color-gray-light);
`;

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 20px;
  flex-grow: 1;

  padding: 30px;

  background-color: var(--color-gray-light);
  border-radius: var(--border-radius);

  width: 100%;
  height: 100%;
`;
