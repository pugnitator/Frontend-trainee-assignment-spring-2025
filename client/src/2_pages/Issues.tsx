import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
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
import { SearchTaskBar } from "../4_features/SearchTaskBar";
import Loader from "../6_shared/ui/Loader";
import { enqueueSnackbar } from "notistack";
import { messageVariants } from "../6_shared/config/notificationStyles";

export const Issues = () => {
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const {
    tasks,
    isLoad,
    hasError,
    searchTask,
    cancelSearchTask,
    addBoardIdFilter,
    addStatusFilter,
    clearBoardIdFilter,
    clearStatusFilter,
  } = useTasks();
  const dispatch = useAppDispatch();
  const isModalOpen = useSelector((state: RootState) => state.app.isModalOpen);

  const hasNotifiedRef = useRef(false);

  useEffect(() => {
    if (hasError && !hasNotifiedRef.current) {
      enqueueSnackbar("Не удалось получить список задач", {
        style: messageVariants.error,
      });
      hasNotifiedRef.current = true;
    }
  }, [hasError]);

  const onClickTask = (task: ITask) => {
    setSelectedTask(task);
    dispatch(appSliceActions.openModal());
  };

  const onCloseForm = () => {
    setSelectedTask(null);
    dispatch(appSliceActions.closeModal());
  };

  return (
    <PageContentContainer>
      <h1 className="visually-hidden"> Список всех задач</h1>
      <SearchTaskBar
        searchTask={searchTask}
        cancelSearchTask={cancelSearchTask}
        addBoardIdFilter={addBoardIdFilter}
        addStatusFilter={addStatusFilter}
        clearBoardIdFilter={clearBoardIdFilter}
        clearStatusFilter={clearStatusFilter}
      />
      <TaskList>
        {isLoad ? (
          tasks.map((item: ITask) => (
            <TaskCard
              key={`${item.id}${item.boardId}`}
              task={item}
              isShortCard={false}
              onClick={onClickTask}
            />
          ))
        ) : (
          <ContentWrapper>
            <Loader />
          </ContentWrapper>
        )}
        {}
      </TaskList>
      {isModalOpen && selectedTask && (
        <Modal>
          <TaskForm task={selectedTask} onClose={onCloseForm} />
        </Modal>
      )}
    </PageContentContainer>
  );
};

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

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  width: 100%;
`;
