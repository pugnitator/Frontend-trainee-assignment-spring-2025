import styled from "styled-components";
import { PageContentContainer } from "../6_shared/ui/PageContentContainer";
import { IBoard } from "../5_entities/boards/model/IBoard";
import { useSelector } from "react-redux";
import { RootState } from "../5_entities/store";
import Loader from "../6_shared/ui/Loader";
import { BoardId } from "../5_entities/tasks/hooks/useTasks";
import { useNavigate } from "react-router";
import { ROUTES } from "../1_app/routes";

export const Boards = () => {
  const boards = useSelector((state: RootState) => state.boards.list);
  const isBoardsLoad = useSelector((state: RootState) => state.boards.isLoad);
  const navigate = useNavigate()

  const onClickBoard = (id: BoardId) => {
    navigate(ROUTES.BOARD.link(id));
  }

  return (
    <PageContentContainer>
      <h1 className="visually-hidden">Список проектов</h1>
      <ContentWrapper>
        {isBoardsLoad ? (
          <BoardsList>
            {boards.map((item: IBoard) => (
              <Board onClick={() => onClickBoard(item.id)}>{item.name}</Board>
            ))}
          </BoardsList>
        ) : (
          <Loader />
        )}
      </ContentWrapper>
    </PageContentContainer>
  );
};

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
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

const Board = styled.li`
  display: flex;
  align-items: center;

  width: 100%;
  min-height: 60px;
  padding: var(--list-item-padding);

  border-radius: var(--border-radius);
  background-color: var(--color-gray-light);

  &:hover {
    opacity: 80%;
    cursor: pointer;
  }
`;
