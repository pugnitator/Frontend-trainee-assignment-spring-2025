import styled from "styled-components";
import { PageContentContainer } from "../6_shared/ui/PageContentContainer";
import { ITask } from "../5_entities/tasks/model/ITask";
import { TaskCard } from "../5_entities/tasks/ui/TaskCard";
import { useTasks } from "../5_entities/tasks/hooks/useTasks";

export const Issues = () => {
  const {tasks, searchTask, cancelSearchTask, addBoardIdFilter, addStatusFilter, clearFilters} = useTasks();

  console.log(tasks);

  return (
    <PageContentContainer>
      <h1 className="visually-hidden"> Список всех задач</h1>
      <SearchBar>Тут поиск и фильтры</SearchBar>
      <TaskList>
        {tasks.map((item: ITask) => (
          <TaskCard task={item} isShortCard={false} />
        ))}
      </TaskList>
    </PageContentContainer>
  );
};

const SearchBar = styled.div`
  background-color: var(--color-gray-light);
`;

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 20px;
  flex-grow: 1;

  padding: 30px;

  background-color: var(--color-gray-light);
  border-radius: var(--border-radius);

  width: 100%;
  height: 100%;
`;
