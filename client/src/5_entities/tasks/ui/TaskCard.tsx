import styled from "styled-components";
import { ITask } from "../model/ITask";
import { truncateText } from "../../../6_shared/utils/truncateText";

export const TaskCard = (task: ITask) => {
  const { title, description } = task;
  return (
    <Card>
      <span>{title}</span>
      <Description>{truncateText({ text: description, maxLength: 80 })}</Description>
    </Card>
  );
};

const Card = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 10px;
  
  height: 110px;
  width: 100%;
  padding: var(--list-item-padding);

  background-color: var(--color-light);
  border-radius: var(--border-radius);

  /* border: 2px solid var(--color-blue); */
`;

const Description = styled.span`
  font-size: 14px;
  color: var(--color-gray);
`;
