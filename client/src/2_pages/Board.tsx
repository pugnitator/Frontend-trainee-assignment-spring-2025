import styled from "styled-components";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { enqueueSnackbar } from "notistack";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import {
  PageContentContainer,
  useAppDispatch,
  messageVariants,
  Loader,
} from "@/6_shared/index";
import {
  TaskCard,
  ITask,
  TaskStatusEnum,
  BoardId,
  useBoardTasks,
  updateTaskStatus,
} from "@/5_entities/tasks/index";
import { RootState } from "@/5_entities/store";
import { appSliceActions } from "@/1_app/appSlice";
import { Modal } from "@/3_widgets/index";
import { TaskForm } from "@/4_features/forms/TaskForm";
import { IBoard, boardsSliceActions } from "@/5_entities/boards/index";
import { DraggableTask } from "@/5_entities/tasks/index";
import { BoardStatusColumn } from "@/5_entities/boards/index";

export interface BoardTaskList {
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
  const { tasks, isLoad, hasError } = useBoardTasks({ boardId });
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
  //Активная задача DragOverlay
  const [activeTask, setActiveTask] = useState<ITask | null>(null);
  const isModalOpen = useSelector((state: RootState) => state.app.isModalOpen);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const hasNotifiedRef = useRef(false);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

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

    setTaskList({ backlog, inProgress, done });

    if (taskFromIssues) {
      dispatch(appSliceActions.openModal());
    }
  }, [tasks, isLoad, hasError, taskFromIssues?.id]);

  const onClickTask = (task: ITask) => {
    setSelectedTask(task);
    dispatch(appSliceActions.openModal());
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveTask(null);
    const task = tasks.find((task) => task.id === event.active.id);
    setActiveTask(task || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    // if (!over || active.id === over.id) return;
    if (!over) return;

    let sourceColumn: keyof BoardTaskList | null = null;
    let targetColumn: keyof BoardTaskList | null = null;

    Object.entries(taskList).forEach(([column, tasks]) => {
      if (tasks.some((task: ITask) => task.id === active.id)) {
        sourceColumn = column as keyof BoardTaskList;
      }
      if (
        over.id === column ||
        tasks.some((task: ITask) => task.id === over.id)
      ) {
        targetColumn = column as keyof BoardTaskList;
      }
    });

    if (!sourceColumn || !targetColumn || sourceColumn === targetColumn) return;

    const sourceTasks = [...taskList[sourceColumn]];
    const targetTasks = [...taskList[targetColumn]];

    //@ts-ignore
    const movingTask: ITask | null = sourceTasks.find(
      (task: ITask) => task.id === active.id
    );
    if (!movingTask) return;

    if (sourceColumn === targetColumn) {
      //в пределах одной колонки ничего не делаем
      return;
    } else {
      //если видим перемещение между колонками, делаем
      const newStatus = {
        backlog: TaskStatusEnum.Backlog,
        inProgress: TaskStatusEnum.InProgress,
        done: TaskStatusEnum.Done,
      }[targetColumn];
      if (!newStatus) return;

      if (typeof movingTask !== "object" || movingTask === null) return;
      const updatedTask: ITask = { ...movingTask, status: newStatus };
      const updatedSourceTasks = sourceTasks.filter(
        (task: ITask) => task.id !== active.id
      ) as ITask[];

      //всегда перетащеную таску кладем в конец колонки
      const updatedTargetTasks = [...targetTasks, updatedTask];

      setTaskList((prev) => ({
        ...prev,
        [sourceColumn as string]: updatedSourceTasks,
        [targetColumn as string]: updatedTargetTasks,
      }));

      dispatch(
        updateTaskStatus({ id: Number(active.id), status: newStatus })
      ).unwrap()
      .catch((e) => {
        //тут возвращаем всё к прежнему виду, если была ошибка смены статуса на сервере
        setTaskList((prev) => ({
          ...prev,
          [sourceColumn as string]: [
            ...prev[sourceColumn as keyof BoardTaskList],
            updatedTask,
          ],
          [targetColumn as string]: prev[
            targetColumn as keyof BoardTaskList
          ].filter((task) => task.id !== updatedTask.id),
        }));
        enqueueSnackbar("Ошибка обновления статуса задачи", {
          style: messageVariants.error,
        });
      });
    }
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
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <BoardContainer>
          {isLoad ? (
            <>
              <BoardStatusColumn
                column="backlog"
                title={TaskStatusEnum.Backlog}
                tasks={taskList.backlog}
                selectedStatus={selectedStatus}
                activeTask={activeTask}
                onClickTask={onClickTask}
              />
              <BoardStatusColumn
                column="inProgress"
                title={TaskStatusEnum.InProgress}
                tasks={taskList.inProgress}
                selectedStatus={selectedStatus}
                activeTask={activeTask}
                onClickTask={onClickTask}
              />
              <BoardStatusColumn
                column="done"
                title={TaskStatusEnum.Done}
                tasks={taskList.done}
                selectedStatus={selectedStatus}
                activeTask={activeTask}
                onClickTask={onClickTask}
              />
            </>
          ) : (
            <Loader isError={taskError || hasError} />
          )}
        </BoardContainer>
        <DragOverlay>
          {activeTask ? (
            <TaskCard task={activeTask} onClick={() => {}} />
          ) : null}
        </DragOverlay>
      </DndContext>

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
