import styled from "styled-components";
import { ITask } from "../model/ITask";
import { truncateText } from "../../../6_shared/utils/truncateText";
import { TaskStatus } from "../../../6_shared/ui/TaskStatus";

interface TaskCardProp {
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
  const { title, description, status } = task;
  const maxLength = isShortCard ? 80 : 150;
  return (
    <Card isShortCard={isShortCard} onClick={() => onClick(task)}>
      <TitleWrapper>
        <span>{title}</span>
        {!isShortCard && <TaskStatus status={status} />}
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

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 5px;

  width: 100%;
`;

const Description = styled.span`
  font-size: 14px;
  color: var(--color-gray);
`;
