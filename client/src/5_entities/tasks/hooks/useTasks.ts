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
  const [isLoad, setIsLoad] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [search, setSearch] = useState<string | null>(null);
  const [filter, setFilter] = useState<TaskFilters>({});
  const dispatch = useAppDispatch();

  const refetch = () => {
    setIsLoad(false);
    dispatch(getTasks()).then((request) => {
      if (request.meta.requestStatus !== "rejected") {
        setIsLoad(true);
      } else {
        setHasError(true);
      }
    });
  };

  useEffect(() => {
    refetch();
  }, []);

  const searchTask = (text: string | undefined) => {
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

  const applyFilters = () => {
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
            filter.boardId?.length &&
            !filter.boardId.includes(item.boardId)
          ) {
            return false;
          }
          return true;
        })
      : searchedList;

    return filteredList;
  };

  const tasks = applyFilters();

  return {
    tasks,
    isLoad,
    hasError,
    searchTask,
    cancelSearchTask,
    addBoardIdFilter,
    addStatusFilter,
    clearBoardIdFilter,
    clearStatusFilter,
    refetch,
  };
};
