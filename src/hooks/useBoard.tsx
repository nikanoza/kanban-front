import { useState } from "react";
import { BoardType, SubtaskType, TaskType } from "../types";

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

  const subtaskChangeStatus = (
    boardId: string,
    columnId: string,
    taskId: string,
    subtask: SubtaskType
  ) => {
    const clone = [...boards];
    const boardIndex = clone.findIndex((item) => item.id === boardId);
    const columnIndex = clone[boardIndex].columns.findIndex(
      (item) => item.id === columnId
    );
    const taskIndex = clone[boardIndex].columns[columnIndex].tasks.findIndex(
      (item) => item.id === taskId
    );
    const subtaskIndex = clone[boardIndex].columns[columnIndex].tasks[
      taskIndex
    ].subtasks.findIndex((item) => item.id === subtask.id);

    clone[boardIndex].columns[columnIndex].tasks[taskIndex].subtasks[
      subtaskIndex
    ].active = !subtask.active;

    setBoards(clone);
  };

  return { boards, setBoards, addTask, subtaskChangeStatus };
};

export default useBoard;
