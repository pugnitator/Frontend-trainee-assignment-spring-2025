import styled from "styled-components";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ITask, TaskStatusEnum } from "@/5_entities/tasks/index";
import { DraggableTask } from "@/5_entities/tasks/ui/DraggableTask";
import { useDroppable } from "@dnd-kit/core";

interface BoardTaskList {
  backlog: ITask[];
  inProgress: ITask[];
  done: ITask[];
}

interface BoardColumnProps {
  column: keyof BoardTaskList;
  title: TaskStatusEnum;
  tasks: ITask[];
  selectedStatus: TaskStatusEnum;
  activeTask: ITask | null;
  onClickTask: (task: ITask) => void;
}

export const BoardStatusColumn = ({
  column,
  title,
  tasks,
  selectedStatus,
  activeTask,
  onClickTask,
}: BoardColumnProps) => {
  const { setNodeRef } = useDroppable({ id: column });
  return (
    <Column
      isHidden={selectedStatus !== TaskStatusEnum[title]}
      ref={setNodeRef}
    >
      <h2>{title}</h2>
      <SortableContext
        id={column}
        items={tasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        {tasks.length > 0 ? (
          tasks.map((item: ITask) => (
            <DraggableTask key={item.id} task={item} onClick={onClickTask} />
          ))
        ) : (
          <StyledSpan>Нет задач</StyledSpan>
        )}
        {activeTask && activeTask.status !== TaskStatusEnum[title] && (
          <Placeholder />
        )}
      </SortableContext>
    </Column>
  );
};

const StyledSpan = styled.span`
  color: var(--color-gray);
`;

const Placeholder = styled.div`
  width: 100%;
  height: 60px;
  /* border: 2px dashed var(--color-gray); */
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-gray-light);
  margin-top: 10px;
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
