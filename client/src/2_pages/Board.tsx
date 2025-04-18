import styled from "styled-components";
import { PageContentContainer } from "../6_shared/ui/PageContentContainer";
import { TaskCard } from "../5_entities/tasks/ui/TaskCard";
import { ITask, TaskStatusEnum } from "../5_entities/tasks/model/ITask";
import { useSelector } from "react-redux";
import { RootState } from "../5_entities/store";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../6_shared/hooks/useAppDispatch";
import { appSliceActions } from "../1_app/appSlice";
import { Modal } from "../3_widgets/modals/Modal";
import { TaskForm } from "../4_features/forms/TaskForm";
import { useNavigate, useParams } from "react-router";
import { IBoard } from "../5_entities/boards/model/IBoard";
import { BoardId } from "../5_entities/tasks/hooks/useTasks";
import { enqueueSnackbar } from "notistack";
import { messageVariants } from "../6_shared/config/notificationStyles";

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

  const tasks = useSelector((state: RootState) => state.tasks.list);

  const [taskList, setTaskList] = useState<BoardTaskList>({
    backlog: [],
    inProgress: [],
    done: [],
  });

  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const isModalOpen = useSelector((state: RootState) => state.app.isModalOpen);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (boardId === null) {
      navigate("/boards");
      enqueueSnackbar("Что-то пошло не так", {
        style: messageVariants.error,
      });
      return;
    }

    const backlog: ITask[] = [];
    const inProgress: ITask[] = [];
    const done: ITask[] = [];
    const invalid: ITask[] = [];

    tasks
      .filter((item: ITask) => item.boardId === boardId)
      .forEach((task) => {
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

    setTaskList({ backlog, inProgress, done });
    invalid.forEach((task) => {
      console.log(`Неверный статус у задачи ${task.id}`);
    });
  }, [tasks, boardId]);

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
      <h1>{board?.name}</h1>
      <BoardContainer>
        <Column>
          <h2>Backlog</h2>
          {taskList.backlog.map((item: ITask) => (
            <TaskCard task={item} onClick={onClickTask} />
          ))}
        </Column>
        <Column>
          <h2>In progress</h2>
          {taskList.inProgress.map((item: ITask) => (
            <TaskCard task={item} onClick={onClickTask} />
          ))}
        </Column>
        <Column>
          <h2>Done</h2>
          {taskList.done.map((item: ITask) => (
            <TaskCard task={item} onClick={onClickTask} />
          ))}
        </Column>
      </BoardContainer>
      {isModalOpen && selectedTask && (
        <Modal>
          <TaskForm task={selectedTask} onClose={() => onCloseForm()} />
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

const Column = styled.section`
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
`;
