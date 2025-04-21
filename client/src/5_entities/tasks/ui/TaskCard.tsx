import styled from "styled-components";
import { ITask } from "../model/ITask";
import { truncateText, TaskStatus } from "@/6_shared/index";

export interface TaskCardProp {
  task: ITask;
  isShortCard?: boolean;
  onClick: (task: ITask) => void;
}

interface CardProp {
  isShortCard: boolean;
}

export const TaskCard = ({
  task,
  isShortCard = true,
  onClick,
}: TaskCardProp) => {
  const { title, description, status, assignee } = task;
  const maxLength = isShortCard ? 80 : 150;
  return (
    <Card isShortCard={isShortCard} onClick={() => onClick(task)}>
      <TitleWrapper>
        <span>{title}</span>
        {!isShortCard && (
          <Info>
            <Assignee>{assignee.fullName}</Assignee>
            <TaskStatus status={status} />
          </Info>
        )}
      </TitleWrapper>
      <Description>
        {truncateText({ text: description, maxLength: maxLength })}
      </Description>
    </Card>
  );
};

const Card = styled.article<CardProp>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 5px;

  min-height: ${(props) => (props.isShortCard ? "80px" : "60px")};
  width: 100%;
  padding: var(--list-item-padding);

  background-color: var(--color-light);
  border: 1px solid transparent;
  border-radius: var(--border-radius);

  &:hover {
    border: 1px solid var(--color-blue);
    cursor: pointer;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  gap: 5px;
`;

const Assignee = styled.span`
  font-size: var(--font-size-small);
  color: var(--color-gray);
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
  gap: 5px;

  width: 100%;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const Description = styled.span`
  font-size: var(--font-size-small);
  color: var(--color-gray);
`;
