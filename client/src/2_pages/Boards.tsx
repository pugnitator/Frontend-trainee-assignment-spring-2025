import styled from "styled-components";

export interface IProject {
  id: number;
  name: string;
  description: string;
  taskCount: number;
}

export const Boards = () => {
  const boardArray = [
    {
      id: 1,
      name: "Редизайн карточки товара",
      description: "Обновление UI/UX основных страниц",
      taskCount: 10,
    },
    {
      id: 2,
      name: "Оптимизация производительности",
      description: "Улучшение Core Web Vitals",
      taskCount: 7,
    },
    {
      id: 3,
      name: "Рефакторинг API",
      description: "Оптимизация серверных методов",
      taskCount: 5,
    },
    {
      id: 4,
      name: "Миграция на новую БД",
      description: "Перенос данных на PostgreSQL 15",
      taskCount: 7,
    },
    {
      id: 5,
      name: "Автоматизация тестирования",
      description: "Написание E2E тестов",
      taskCount: 7,
    },
    {
      id: 6,
      name: "Переход на Kubernetes",
      description: "Миграция инфраструктуры",
      taskCount: 5,
    },
  ];

  return (
    <Container>
      <BoardsList>
        {boardArray.map((item: IProject) => (
          <BoardsListItem>{item.name}</BoardsListItem>
        ))}
      </BoardsList>
    </Container>
  );
};

const Container = styled.main`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-grow: 1;

  padding: 50px var(--content-container-padding-x);
  width: 100%;
`;

const BoardsList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 10px;

  width: 100%;
`;

const BoardsListItem = styled.li`
  display: flex;
  align-items: center;

  width: 100%;
  min-height: 60px;
  padding: 5px 10px;

  border-radius: var(--border-radius);
  background-color: var(--color-gray);

  &:hover {
    opacity: 80%;
  }
`;
