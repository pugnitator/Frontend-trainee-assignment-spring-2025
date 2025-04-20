import styled from "styled-components";
import { PageContentContainer } from "../6_shared/ui/PageContentContainer";
import { TaskCard } from "../5_entities/tasks/ui/TaskCard";
import { ITask, TaskStatusEnum } from "../5_entities/tasks/model/ITask";
import { useSelector } from "react-redux";
import { RootState } from "../5_entities/store";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../6_shared/hooks/useAppDispatch";
import { appSliceActions } from "../1_app/appSlice";
import { Modal } from "../3_widgets/modals/Modal";
import { TaskForm } from "../4_features/forms/TaskForm";
import { useNavigate, useParams } from "react-router";
import { IBoard } from "../5_entities/boards/model/IBoard";
import { BoardId } from "../5_entities/tasks/hooks/useTasks";
import { enqueueSnackbar } from "notistack";
import { messageVariants } from "../6_shared/config/notificationStyles";
import { useBoardTasks } from "../5_entities/tasks/hooks/useBoardTasks";
import Loader from "../6_shared/ui/Loader";
import { boardsSliceActions } from "../5_entities/boards/boardsSlice";

interface BoardTaskList {
  backlog: ITask[];
  inProgress: ITask[];
  done: ITask[];
}

export const Board = () => {
  const boardId = Number(useParams().id) as BoardId;
  const board = useSelector((state: RootState) =>
    state.boards.list.find((item: IBoard) => item.id === boardId)
  );
  const taskError = useSelector((state: RootState) => state.tasks.hasError);
  const { tasks, isLoad, hasError, refetch } = useBoardTasks({ boardId });
  const taskFromIssues = useSelector(
    (state: RootState) => state.boards.selectedTask
  );

  const [taskList, setTaskList] = useState<BoardTaskList>({
    backlog: [],
    inProgress: [],
    done: [],
  });

  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<TaskStatusEnum>(
    TaskStatusEnum.Backlog
  );
  const isModalOpen = useSelector((state: RootState) => state.app.isModalOpen);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const hasNotifiedRef = useRef(false);

  useEffect(() => {
    if (hasError && !hasNotifiedRef.current) {
      enqueueSnackbar("Не удалось получить список задач", {
        style: messageVariants.error,
      });
      hasNotifiedRef.current = true;
    }

    if (boardId === null) {
      navigate("/boards");
      enqueueSnackbar("Что-то пошло не так", {
        style: messageVariants.error,
      });
      return;
    }

    console.log("boardTasks2", tasks);

    const backlog: ITask[] = [];
    const inProgress: ITask[] = [];
    const done: ITask[] = [];
    const invalid: ITask[] = [];

    tasks.forEach((task) => {
      if (task.status === TaskStatusEnum.Backlog) {
        backlog.push(task);
      } else if (task.status === TaskStatusEnum.InProgress) {
        inProgress.push(task);
      } else if (task.status === TaskStatusEnum.Done) {
        done.push(task);
      } else {
        invalid.push(task);
      }
    });

    console.log("boardTasks3", { backlog, inProgress, done });

    setTaskList({ backlog, inProgress, done });
    invalid.forEach((task) => {
      console.log(`Неверный статус у задачи ${task.id}`);
    });

    if (taskFromIssues) {
      console.log("taskFromIssues:", taskFromIssues);
      dispatch(appSliceActions.openModal());
    }
  }, [tasks, isLoad, hasError, taskFromIssues?.id]);

  console.log("render taskFromIssues:", taskFromIssues);

  const onClickTask = (task: ITask) => {
    setSelectedTask(task);
    dispatch(appSliceActions.openModal());
  };

  const onCloseForm = () => {
    setSelectedTask(null);
    dispatch(appSliceActions.closeModal());
    dispatch(boardsSliceActions.clearSelectedTask());
  };

  return (
    <PageContentContainer>
      <h1>{board?.name}</h1>
      <ButtonWrapper>
        <MenuButton
          type="button"
          onClick={() => setSelectedStatus(TaskStatusEnum.Backlog)}
        >
          Backlog
        </MenuButton>
        <MenuButton
          type="button"
          onClick={() => setSelectedStatus(TaskStatusEnum.InProgress)}
        >
          In progress
        </MenuButton>
        <MenuButton
          type="button"
          onClick={() => setSelectedStatus(TaskStatusEnum.Done)}
        >
          Done
        </MenuButton>
      </ButtonWrapper>
      <BoardContainer>
        {isLoad ? (
          <>
            <Column isHidden={selectedStatus !== TaskStatusEnum.Backlog}>
              <h2>Backlog</h2>
              {taskList.backlog.length > 0 ? (
                taskList.backlog.map((item: ITask) => (
                  <TaskCard task={item} onClick={onClickTask} />
                ))
              ) : (
                <StyledSpan>Нет задач</StyledSpan>
              )}
            </Column>
            <Column isHidden={selectedStatus !== TaskStatusEnum.InProgress}>
              <h2>In progress</h2>
              {taskList.inProgress.length > 0 ? (
                taskList.inProgress.map((item: ITask) => (
                  <TaskCard task={item} onClick={onClickTask} />
                ))
              ) : (
                <StyledSpan>Нет задач</StyledSpan>
              )}
            </Column>
            <Column isHidden={selectedStatus !== TaskStatusEnum.Done}>
              <h2>Done</h2>
              {taskList.done.length > 0 ? (
                taskList.done.map((item: ITask) => (
                  <TaskCard task={item} onClick={onClickTask} />
                ))
              ) : (
                <StyledSpan>Нет задач</StyledSpan>
              )}
            </Column>
          </>
        ) : (
          <Loader isError={taskError || hasError} />
        )}
      </BoardContainer>
      {isModalOpen && (taskFromIssues || selectedTask) && (
        <Modal>
          <TaskForm
            task={(taskFromIssues || selectedTask) ?? undefined}
            boardId={
              boardId || selectedTask?.boardId || taskFromIssues?.boardId
            }
            onClose={() => onCloseForm()}
          />
        </Modal>
      )}
    </PageContentContainer>
  );
};

const BoardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 5px;
  flex-grow: 1;

  width: 100%;
  min-height: 100%;
`;

const StyledSpan = styled.span`
  color: var(--color-gray);
`;

const ButtonWrapper = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 100%;

  @media (max-width: 700px) {
    display: flex;
  }
`;

const MenuButton = styled.button`
  width: 100%;
  border: 1px solid transparent;

  &:focus {
    border: 1px solid var(--color-blue);
  }
`;

interface ColumnProp {
  isHidden: boolean;
}

const Column = styled.section<ColumnProp>`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 10px;

  flex: 1;
  min-height: 100%;
  padding: 10px 20px 20px;

  background-color: var(--color-gray-light);
  border-radius: var(--border-radius);

  @media (max-width: 700px) {
    display: ${(props) => (props.isHidden ? "none" : "flex")};
  }
`;
