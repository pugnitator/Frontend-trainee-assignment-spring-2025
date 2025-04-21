import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";
import { PageContentContainer, messageVariants, useAppDispatch, Loader } from "@/6_shared/index";
import { ITask, TaskCard, useTasks } from "@/5_entities/tasks/index";
import { Modal } from "@/3_widgets/index";
import { TaskForm, SearchTaskBar } from "@/4_features/index";
import { RootState } from "@/5_entities/store";
import { appSliceActions } from "@/1_app/appSlice";


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
            <Loader isError={hasError}/>
          </ContentWrapper>
        )}
        {}
      </TaskList>
      {isModalOpen && selectedTask && (
        <Modal>
          <TaskForm task={selectedTask} onClose={onCloseForm} boardId={selectedTask.boardId}/>
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

  padding: var(--content-container-padding-x);

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
