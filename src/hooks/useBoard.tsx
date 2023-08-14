import { useState } from "react";
import { BoardType, TaskType } from "../types";

const useBoard = () => {
  const [boards, setBoards] = useState<BoardType[]>([]);

  const addTask = (data: TaskType, boardId: string, columnId: string) => {
    const clone = [...boards];

    const boardIndex = clone.findIndex((elem) => elem.id === boardId);
    const columnIndex = clone[boardIndex].columns.findIndex(
      (elem) => elem.id === columnId
    );

    clone[boardIndex].columns[columnIndex].tasks.push(data);

    setBoards(clone);
  };

  return { boards, setBoards, addTask };
};

export default useBoard;
