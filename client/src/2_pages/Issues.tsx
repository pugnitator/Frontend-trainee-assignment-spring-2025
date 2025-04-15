import styled from "styled-components";
import { PageContentContainer } from "../6_shared/ui/PageContentContainer";
import { ITask } from "../5_entities/tasks/model/ITask";
import { TaskCard } from "../5_entities/tasks/ui/TaskCard";

export const Issues = () => {
  return (
    <PageContentContainer>
      <h1 className="visually-hidden"> Список всех задач</h1>
      <SearchBar>Тут поиск и фильтры</SearchBar>
      <TaskList>
        {tasksArray.map((item: ITask) => (
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

const tasksArray: ITask[] = [
  {
    id: 1,
    title: "Реализация новой галереи изображений",
    description:
      "Реализация нового UI компонента с учетом гайдлайнов дизайн-системы. Детали будут уточнены в процессе разработки.",
    priority: "High",
    status: "Done",
    assignee: {
      id: 1,
      fullName: "Александра Ветрова",
      email: "al.vetrova@avito.ru",
      avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg",
    },
  },
  {
    id: 2,
    title: "Адаптация карточки для мобильных устройств",
    description:
      "Адаптация интерфейса для различных разрешений экрана. Детали будут уточнены в процессе разработки.",
    priority: "Medium",
    status: "Done",
    assignee: {
      id: 2,
      fullName: "Илья Романов",
      email: "il.romanov@avito.ru",
      avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    },
  },
  {
    id: 3,
    title: "Оптимизация загрузки медиа-контента",
    description:
      "Оптимизация загрузки и отображения медиа-контента. Детали будут уточнены в процессе разработки.",
    priority: "Medium",
    status: "Backlog",
    assignee: {
      id: 2,
      fullName: "Илья Романов",
      email: "il.romanov@avito.ru",
      avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    },
  },
  {
    id: 4,
    title: "Добавление микроанимаций интерфейса",
    description:
      "Реализация нового UI компонента с учетом гайдлайнов дизайн-системы. Детали будут уточнены в процессе разработки.",
    priority: "Low",
    status: "Done",
    assignee: {
      id: 1,
      fullName: "Александра Ветрова",
      email: "al.vetrova@avito.ru",
      avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg",
    },
  },
  {
    id: 5,
    title: "Интеграция с системой рекомендаций",
    description:
      "Адаптация интерфейса для различных разрешений экрана. Детали будут уточнены в процессе разработки.",
    priority: "Low",
    status: "Done",
    assignee: {
      id: 1,
      fullName: "Александра Ветрова",
      email: "al.vetrova@avito.ru",
      avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg",
    },
  },
  {
    id: 6,
    title: "Реализация темной темы",
    description:
      "Оптимизация загрузки и отображения медиа-контента. Детали будут уточнены в процессе разработки.",
    priority: "High",
    status: "Backlog",
    assignee: {
      id: 2,
      fullName: "Илья Романов",
      email: "il.romanov@avito.ru",
      avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    },
  },
  {
    id: 7,
    title: "Оптимизация CLS (Cumulative Layout Shift)",
    description:
      "Реализация нового UI компонента с учетом гайдлайнов дизайн-системы. Детали будут уточнены в процессе разработки.",
    priority: "Low",
    status: "Backlog",
    assignee: {
      id: 2,
      fullName: "Илья Романов",
      email: "il.romanov@avito.ru",
      avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    },
  },
  {
    id: 8,
    title: "Добавление быстрого просмотра товара",
    description:
      "Адаптация интерфейса для различных разрешений экрана. Детали будут уточнены в процессе разработки.",
    priority: "Medium",
    status: "Backlog",
    assignee: {
      id: 2,
      fullName: "Илья Романов",
      email: "il.romanov@avito.ru",
      avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    },
  },
  {
    id: 9,
    title: "Интеграция системы рейтингов",
    description:
      "Оптимизация загрузки и отображения медиа-контента. Детали будут уточнены в процессе разработки.",
    priority: "High",
    status: "Done",
    assignee: {
      id: 2,
      fullName: "Илья Романов",
      email: "il.romanov@avito.ru",
      avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    },
  },
  {
    id: 10,
    title: "Реализация sticky-панели действий",
    description:
      "Реализация нового UI компонента с учетом гайдлайнов дизайн-системы. Детали будут уточнены в процессе разработки.",
    priority: "Medium",
    status: "InProgress",
    assignee: {
      id: 2,
      fullName: "Илья Романов",
      email: "il.romanov@avito.ru",
      avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    },
  },
];
