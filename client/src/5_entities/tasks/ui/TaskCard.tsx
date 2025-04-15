import styled from "styled-components";
import { ITask } from "../model/ITask";
import { truncateText } from "../../../6_shared/utils/truncateText";

interface TaskCardProp{
    task: ITask;
    isShortCard?: boolean;
}

interface CardProp {
    isShortCard: boolean;
}

export const TaskCard = ({task, isShortCard = true}: TaskCardProp) => {
  const { title, description } = task;
  const maxLength = isShortCard ? 80 : 150;
  return (
    <Card isShortCard={isShortCard}>
      <span>{title}</span>
      <Description>{truncateText({ text: description, maxLength: maxLength })}</Description>
    </Card>
  );
};

const Card = styled.article<CardProp>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 5px;
  
  height: ${props => props.isShortCard ? '110px' : '60px'};
  width: 100%;
  padding: var(--list-item-padding);

  background-color: var(--color-light);
  border: 1px solid transparent;
  border-radius: var(--border-radius);

  &:hover{
    border: 1px solid var(--color-blue);
    cursor: pointer;
  }
`;

const Description = styled.span`
  font-size: 14px;
  color: var(--color-gray);
`;
