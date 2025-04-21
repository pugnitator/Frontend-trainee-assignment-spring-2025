import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TaskCardProp } from "./TaskCard";
import { TaskCard } from "./TaskCard";
import styled from "styled-components";

type DraggableTaskCardProps = Omit<TaskCardProp, "isShortCard">;

export const DraggableTask = ({ task, onClick }: DraggableTaskCardProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: task.id });

  return (
    <CardWrapper
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      $transform={CSS.Transform.toString(transform)}
      $transition={transition}
      $isDragging={isDragging}
    >
      <TaskCard task={task} onClick={onClick}  isShortCard={true}/>
    </CardWrapper>
  );
};

const CardWrapper = styled.div<{ $transform?: string; $transition?: string, $isDragging?: boolean}>`
  transform: ${({ $transform }) => $transform};
  transition: ${({ $transition }) => $transition};
  width: 100%;
  opacity: ${({ $isDragging }) => ($isDragging ? 0.3 : 1)};
  cursor: grab;
`;
