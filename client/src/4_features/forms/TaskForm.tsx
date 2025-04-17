import { useForm } from "react-hook-form";
import { ITask, TaskPriorityEnum, TaskStatusEnum } from "../../5_entities/tasks/model/ITask";
import styled from "styled-components";
import { useTasks } from "../../5_entities/tasks/hooks/useTasks";
import { enqueueSnackbar } from "notistack";
import { useAppDispatch } from "../../6_shared/hooks/useAppDispatch";
import { createTask, CreateTaskProp } from "../../5_entities/tasks/api/createTask";
import { messageVariants } from "../../6_shared/config/notificationStyles";
import { FormInput } from "../../6_shared/ui/FormInput";
import { FormTextarea } from "../../6_shared/ui/FormTextArea";
import { FormSelect } from "../../6_shared/ui/FormSelect";
import { useSelector } from "react-redux";
import { RootState } from "../../5_entities/store";
import { IBoard } from "../../5_entities/boards/model/IBoard";

interface TaskFormProp {
  task?: ITask;
}

export const TaskForm = ({ task }: TaskFormProp) => {
  const dispatch = useAppDispatch();
  const { refetch } = useTasks();

  const form = useForm<CreateTaskProp>({
    defaultValues: {
      title: "",
      description: "",
      boardId: 0,
      priority: TaskPriorityEnum.Medium,
      assigneeId: 0,
      // status?: 0,
    },
  });

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
  console.log("boardOptions in form", boardOptions);

  const statusOptions = Object.values(TaskStatusEnum).map((status) => ({
    value: status,
    label: status,
  }));
  
  const priorityOptions = Object.values(TaskPriorityEnum).map((priority) => ({
    value: priority,
    label: priority,
  }));

  const assigneeOptions = 0; //TODO: запрос всех юзеров сделать



  const onSubmitCreate = async (data: CreateTaskProp) => {
    try {
      await dispatch(createTask(data));
      await refetch();
      enqueueSnackbar("Задача успешно создана", {
        style: messageVariants.success,
      });
    } catch (error) {
      enqueueSnackbar("Не удалось создать задачу", {
        style: messageVariants.error,
      });
      console.log(error);
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmitCreate)}>
      <h2>Создание задачи</h2>
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
      />
      <FormSelect
        title="Приоритет"
        errorMessage={errors.description?.message}
        options={priorityOptions}
        control={control}
        name={"priority"}
      />
      {task && <FormSelect
        title="Статус"
        errorMessage={errors.description?.message}
        options={statusOptions}
        control={control}
        name={"status"}
      />}
      <FormSelect
        title="Ответственный"
        errorMessage={errors.description?.message}
        options={boardOptions}
        control={control}
        name={"assigneeId"}
      />
      <ButtonWrapper>
        <CancelButton>Отмена</CancelButton>
        {task ? (
          <SubmitButton>Сохранить изменения</SubmitButton>
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
  background-color: var(--color-red);
`;
const SubmitButton = styled.button`
  background-color: var(--color-blue);
`;
