import styled from "styled-components";
import { BoardId } from "../5_entities/tasks/hooks/useTasks";
import { useRef, useState } from "react";
import { TaskStatusEnum } from "../5_entities/tasks/model/ITask";
import closeIcon from "../assets/icons/closeIcon.svg";
import searchIcon from "../assets/icons/searchIcon.svg";
import { useSelector } from "react-redux";
import { RootState } from "../5_entities/store";
import { IBoard } from "../5_entities/boards/model/IBoard";
import { MultiSelectFilter } from "../6_shared/ui/MultiSelectFilter";

interface SearchTaskBarProp {
  searchTask: (text: string | undefined) => void;
  cancelSearchTask: () => void;
  addBoardIdFilter: (value: BoardId[]) => void;
  addStatusFilter: (value: TaskStatusEnum[]) => void;
  clearBoardIdFilter: () => void;
  clearStatusFilter: () => void;
}

export const SearchTaskBar = ({
  searchTask,
  cancelSearchTask,
  addBoardIdFilter,
  addStatusFilter,
  clearBoardIdFilter,
  clearStatusFilter,
}: SearchTaskBarProp) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState<string>("");

  const boardOptions = useSelector((state: RootState) =>
    state.boards.list.map((item: IBoard) => ({
      value: item.id,
      label: item.name,
    }))
  );
  const statusOptions = Object.values(TaskStatusEnum).map((status) => ({
    value: status,
    label: status,
  }));

  const onSearch = () => {
    const searchValue = searchRef.current?.value;
    if (searchValue) searchTask(searchValue);
    else cancelSearchTask();
  };

  const onCancelSearch = () => {
    cancelSearchTask();
    setSearchValue("");
  };

  const handleBoardChange = (values: (string | number)[]) => {
    const boardIds = values as BoardId[];
    addBoardIdFilter(boardIds);
  };

  const handleStatusChange = (values: (string | number)[]) => {
    const statuses = values as TaskStatusEnum[];
    addStatusFilter(statuses);
  };

  return (
    <Container>
      <Wrapper>
        <MultiSelectFilter
          options={boardOptions}
          onChange={handleBoardChange}
          clearFilter={clearBoardIdFilter}
          name={"boardId"}
          placeHolder="Проект"
        />
        <MultiSelectFilter
          options={statusOptions}
          onChange={handleStatusChange}
          clearFilter={clearStatusFilter}
          name={"status"}
          placeHolder="Статус"
        />
      </Wrapper>
      <Wrapper>
        <InputWrapper>
          <SearchInput
            ref={searchRef}
            type="text"
            placeholder="Поиск"
            value={searchValue ?? ""}
            onChange={() => setSearchValue(searchRef.current?.value ?? "")}
          />
          {searchValue && (
            <ImageButton type="button" onClick={onCancelSearch}>
              <img
                src={closeIcon}
                alt="Отменить поиск"
                width="20px"
                height="20px"
                loading="lazy"
              />
            </ImageButton>
          )}
        </InputWrapper>
        <ImageButton type="button" onClick={onSearch}>
          <img
            src={searchIcon}
            alt="Начать поиск"
            width="25px"
            height="25px"
            loading="lazy"
          />
        </ImageButton>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  min-height: 60px;
  padding: 10px var(--content-container-padding-x);

  background-color: var(--color-gray-light);
  border-radius: var(--border-radius);

  @media (max-width: 870px) {
    flex-direction: column-reverse;
    gap: 12px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 10px;

  min-width: 300px;
  height: 100%;
  flex-shrink: 0;

  @media (max-width: 870px) {
    width: 100%;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5px;

  width: calc(100% - 25px);
  background-color: var(--color-light);
  border-radius: var(--border-radius-small);
  border: 1px solid transparent;
  &:focus {
    border: 1px solid var(--color-blue);
  }

  @media (max-width: 870px) {
    justify-content: start;
    gap: 5px;
    width: 100%;
  }
`;

const ImageButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 1px;
  min-height: 1px;
  background-color: transparent;
  padding: 0;
`;

const SearchInput = styled.input`
  width: calc(100% - 20px); // 20px - ширина кратинки крестика
  border: none;
  &:focus {
    border: none;
  }
`;
