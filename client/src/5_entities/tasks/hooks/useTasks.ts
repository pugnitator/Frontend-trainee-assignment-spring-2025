import { useState, useEffect, useMemo, useCallback } from "react";
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


  const searchTask = (text: string) => {
    setSearch(text.toLowerCase());
  };

  const cancelSearchTask = () => {
    setSearch(null);
  };

  const addStatusFilter = (value: TaskStatusEnum) => {
    setFilter((prev) => {
      const currentValues = prev.status || [];
      if (currentValues.includes(value)) return prev;
      return {
        ...prev,
        status: [...currentValues, value],
      };
    });
  };

  const addBoardIdFilter = (value: BoardId) => {
    setFilter((prev) => {
      const currentValues = prev.boardId || [];
      if (currentValues.includes(value)) return prev;
      return {
        ...prev,
        boardId: [...currentValues, value],
      };
    });
  };

  const clearFilters = () => {
    setFilter({});
  };

  const applyFilters = useCallback(() => {
    const searchedList = search
      ? taskList.filter(
          (item: ITask) =>
            item.title.toLowerCase().includes(search) ||
            item.assignee.fullName.toLowerCase().includes(search)
        )
      : taskList;

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

    return filteredList;
  }, [taskList, search, filter]);

  const tasks = useMemo(() => applyFilters(), [applyFilters]);

  return {
    tasks,
    searchTask,
    cancelSearchTask,
    addBoardIdFilter,
    addStatusFilter,
    clearFilters,
    refetch
  };
};
