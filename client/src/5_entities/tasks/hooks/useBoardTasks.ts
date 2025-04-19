import { useEffect, useState } from "react";
import { BoardId } from "./useTasks";
import { ITask } from "../model/ITask";
import { getBoardTasks } from "../../boards/api/getBoardTasks";
import { useAppDispatch } from "../../../6_shared/hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface UseBoardTasksProp {
  boardId: BoardId;
}

export const useBoardTasks = ({ boardId }: UseBoardTasksProp) => {
  const tasks = useSelector((state: RootState) => state.boards.currentBoardTaskList);
  const [isLoad, setIsLoad] = useState(false);
  const [hasError, setHasError] = useState(false);
  const dispatch = useAppDispatch();

  const refetch = () => {
    setIsLoad(false);
    dispatch(getBoardTasks(boardId)).then((request) => {
      if (request.meta.requestStatus !== "rejected") {
        setIsLoad(true);
      } else {
        setHasError(true);
      }
    });
  };

  useEffect(() => {
    if (boardId) refetch();
  }, [boardId]);

  return ({
    tasks,
    isLoad,
    hasError,
    refetch,
  })
};
