import { useForm } from "react-hook-form";
import {
  ITask,
  TaskPriorityEnum,
  TaskStatusEnum,
} from "../../5_entities/tasks/model/ITask";
import styled from "styled-components";
import { BoardId, useTasks } from "../../5_entities/tasks/hooks/useTasks";
import { enqueueSnackbar } from "notistack";
import { useAppDispatch } from "../../6_shared/hooks/useAppDispatch";
import {
  createTask,
  CreateTaskProp,
} from "../../5_entities/tasks/api/createTask";
import { messageVariants } from "../../6_shared/config/notificationStyles";
import { FormInput } from "../../6_shared/ui/FormInput";
import { FormTextarea } from "../../6_shared/ui/FormTextArea";
import { FormSelect } from "../../6_shared/ui/FormSelect";
import { useSelector } from "react-redux";
import { RootState } from "../../5_entities/store";
import { IBoard } from "../../5_entities/boards/model/IBoard";
import { appSliceActions } from "../../1_app/appSlice";
import { getUsers } from "../../5_entities/users/api/getUsers";
import { IUser } from "../../5_entities/users/model/IUser";
import { useEffect, useState } from "react";
import { updateTask } from "../../5_entities/tasks/api/updateTask";
import { useNavigate } from "react-router";
import { ROUTES } from "../../1_app/routes";

//TODO: предзаполнять проект при открытии со страницы проекта + запрет изменения

interface TaskFormProp {
  task?: ITask;
  boardId?: BoardId;
  onClose: () => void;
}

export const TaskForm = ({ task, boardId, onClose }: TaskFormProp) => {
  const [assigneeOptions, setAssigneeOptions] = useState([]);
  const dispatch = useAppDispatch();
  const { refetch } = useTasks();
  const navigate = useNavigate();
  const form = useForm<CreateTaskProp>({
    defaultValues: {
      title: task?.title || "",
      description: task?.description || "",
      boardId: task?.boardId || 0,
      priority: task?.priority || TaskPriorityEnum.Medium,
      assigneeId: task?.assignee.id || 0,
      status: task?.status || TaskStatusEnum.Backlog,
    },
  });

  useEffect(() => {
    getUsers().then((users) => {
      if (users) {
        setAssigneeOptions(
          users.map((user: IUser) => ({
            value: user.id,
            label: user.fullName,
          }))
        );
      }
    });

    if (boardId && !task) {
      form.setValue("boardId", boardId);
    }
  }, [boardId]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = form;

  const boardOptions = useSelector((state: RootState) =>
    state.boards.list.map((item: IBoard) => ({
      value: item.id,
      label: item.name,
    }))
  );

  const statusOptions = Object.values(TaskStatusEnum).map((status) => ({
    value: status,
    label: status,
  }));

  const priorityOptions = Object.values(TaskPriorityEnum).map((priority) => ({
    value: priority,
    label: priority,
  }));

  const onClickGoToBoard = () => {
    if (!task) {
      enqueueSnackbar("Что-то пошло не так", {
        style: messageVariants.error,
      });
      return;
    }
    navigate(ROUTES.BOARD.link(task.boardId));
    dispatch(appSliceActions.closeModal());
  };

  const onSubmitCreate = async (data: CreateTaskProp) => {
    try {
      await dispatch(createTask(data));
      await refetch();
      enqueueSnackbar("Задача успешно создана", {
        style: messageVariants.success,
      });
      dispatch(appSliceActions.closeModal());
    } catch (error) {
      enqueueSnackbar("Не удалось создать задачу", {
        style: messageVariants.error,
      });
      console.log(error);
    }
  };

  const onSubmitUpdate = async (data: CreateTaskProp) => {
    if (!task) {
      enqueueSnackbar("Что-то пошло не так", {
        style: messageVariants.error,
      });
      return;
    }
    try {
      await dispatch(updateTask({ task: data, id: task.id }));
      await refetch();
      enqueueSnackbar("Задача успешно обновлена", {
        style: messageVariants.success,
      });
      dispatch(appSliceActions.closeModal());
    } catch (error) {
      enqueueSnackbar("Не удалось обновить задачу", {
        style: messageVariants.error,
      });
      console.log(error);
    }
  };

  const onSubmit = task ? onSubmitUpdate : onSubmitCreate;

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <h2>{task ? "Редактирование задачи" : "Создание задачи"}</h2>
      <CancelButton
        type="button"
        onClick={() => onClose()}
      >
        ❌
      </CancelButton>
      <FormInput
        register={register("title", {
          required: "Обязательно для заполнения",
          minLength: {
            value: 1,
            message: "Название должно содержать минимум 1 символ",
          },
          maxLength: {
            value: 100,
            message: "Название должно содержать не более 100 символов",
          },
        })}
        title="Название"
        placeholder="Название"
        errorMessage={errors.title?.message}
      />
      <FormTextarea
        register={register("description", {
          required: "Обязательно для заполнения",
          minLength: {
            value: 1,
            message: "Название должно содержать минимум 1 символ",
          },
          maxLength: {
            value: 500,
            message: "Название должно содержать не более 100 символов",
          },
        })}
        title="Описание"
        placeholder="Описание"
        errorMessage={errors.description?.message}
      />
      <FormSelect
        title="Проект"
        errorMessage={errors.description?.message}
        options={boardOptions}
        control={control}
        name={"boardId"}
        isDisabled={Boolean(boardId || task)}
      />
      <FormSelect
        title="Приоритет"
        errorMessage={errors.description?.message}
        options={priorityOptions}
        control={control}
        name={"priority"}
      />
      {task && (
        <FormSelect
          title="Статус"
          errorMessage={errors.description?.message}
          options={statusOptions}
          control={control}
          name={"status"}
        />
      )}
      <FormSelect
        title="Ответственный"
        errorMessage={errors.description?.message}
        options={assigneeOptions}
        control={control}
        name={"assigneeId"}
      />
      <ButtonWrapper>
        {task ? (
          <>
            <button type="button" onClick={onClickGoToBoard}>
              Перейти к доске
            </button>
            <SubmitButton>Сохранить изменения</SubmitButton>
          </>
        ) : (
          <SubmitButton>Создать</SubmitButton>
        )}
      </ButtonWrapper>
    </StyledForm>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 800px;
  color: var(--color-dark);
  background-color: var(--color-light-alt);
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: start;
  justify-content: space-between;

  color: var(--color-light);
`;

const CancelButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;

  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  width: 0;
  padding: 0 30px;

  background-color: transparent;
`;
const SubmitButton = styled.button`
  background-color: var(--color-blue);
`;
