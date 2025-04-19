import styled from "styled-components";
import { TaskStatusEnum } from "../../5_entities/tasks/model/ITask";

const statusTheme: Record<TaskStatusEnum, string> = {
  [TaskStatusEnum.Backlog]: "var(--color-gray)",
  [TaskStatusEnum.InProgress]: "var(--color-blue)",
  [TaskStatusEnum.Done]: "var(--color-green)",
};

interface TaskStatusProps {
  status: TaskStatusEnum;
}

export const TaskStatus = ({ status }: TaskStatusProps) => {
  const color = statusTheme[status] || "var(--color-gray)";
  return <Container color={color}>{status}</Container>;
};
interface ContainerProp {
  color: string;
}
const Container = styled.div<ContainerProp>`
  display: inline-flex;
  justify-content: end;
  align-items: center;
  padding: 2px;
  border-radius: var(--border-radius-small);
  font-size: var(--font-size-small);
  font-weight: 400;
  color: ${(props) => props.color};
`;
