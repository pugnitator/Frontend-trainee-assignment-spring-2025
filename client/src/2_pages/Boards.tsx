import styled from "styled-components";
import { PageContentContainer } from "../6_shared/ui/PageContentContainer";
import { IBoard } from "../5_entities/boards/model/IBoard";
import { useEffect } from "react";
import { useAppDispatch } from "../6_shared/hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { RootState } from "../5_entities/store";
import { getBoards } from "../5_entities/boards/api/getBoards";
import Loader from "../6_shared/ui/Loader";

export const Boards = () => {
  const boards = useSelector((state: RootState) => state.boards.list);
  const isBoardsLoad = useSelector((state: RootState) => state.boards.isLoad);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getBoards());
  }, []);

  console.log(boards);

  return (
    <PageContentContainer>
      <h1 className="visually-hidden">Список проектов</h1>
      <ContentWrapper>
        {isBoardsLoad ? (
          <BoardsList>
            {boards.map((item: IBoard) => (
              <BoardsListItem>{item.name}</BoardsListItem>
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

const BoardsListItem = styled.li`
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
