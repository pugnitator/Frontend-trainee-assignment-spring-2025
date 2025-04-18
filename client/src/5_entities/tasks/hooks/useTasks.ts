import { useState, useEffect } from "react";
import { ITask } from "../model/ITask";
import { useAppDispatch } from "../../../6_shared/hooks/useAppDispatch";
import { getTasks } from "../api/getTasks";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { TaskStatusEnum } from "../model/ITask";

export type TaskFilters = {
  status?: TaskStatusEnum[];
  boardId?: BoardId[];
};

export type BoardId = number;

export const useTasks = () => {
  const taskList = useSelector((state: RootState) => state.tasks.list);
  const [search, setSearch] = useState<string | null>(null);
  const [filter, setFilter] = useState<TaskFilters>({});
  const dispatch = useAppDispatch();
  const refetch = () => dispatch(getTasks());

  useEffect(() => {
    refetch();
  }, []);


  const searchTask = (text: string | undefined) => {
    console.log('searchText', text);
    if (!text) return;
    setSearch(text.toLowerCase());
  };

  const cancelSearchTask = () => {
    setSearch(null);
  };
  const addBoardIdFilter = (values: BoardId[]) => {
    setFilter((prev) => ({
      ...prev,
      boardId: values,
    }));
  };

  const clearBoardIdFilter = () => {
    setFilter((prev) => ({
      ...prev,
      boardId: undefined,
    }));
  };
  
  const addStatusFilter = (values: TaskStatusEnum[]) => {
    setFilter((prev) => ({
      ...prev,
      status: values,
    }));
  };

  const clearStatusFilter = () => {
    setFilter((prev) => ({
      ...prev,
      status: undefined,
    }));
  };

  const clearFilters = () => {
    setFilter({});
  };

  const applyFilters = 
    () => {
    console.log('apply')
    const searchedList = search
      ? taskList.filter(
          (item: ITask) =>
            item.title.toLowerCase().includes(search) ||
            item.assignee.fullName.toLowerCase().includes(search)
        )
      : taskList;

      console.log('searchedList', searchedList)

    const filteredList = filter
      ? searchedList.filter((item: ITask) => {
          if (filter.status?.length && !filter.status.includes(item.status)) {
            return false;
          }
          if (
            filter.boardId?.length && !filter.boardId.includes(item.boardId)
          ) {
            return false;
          }
          return true;
        })
      : searchedList;

    console.log('filteredList', filteredList)

    return filteredList;
  }
  const tasks = applyFilters();
  // console.log('tasks', tasks)

  return {
    tasks,
    searchTask,
    cancelSearchTask,
    addBoardIdFilter,
    addStatusFilter,
    clearBoardIdFilter,
    clearStatusFilter,
    clearFilters,
    refetch
  };
};
