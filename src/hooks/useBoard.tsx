import { useState } from "react";
import {
  BoardType,
  ColumnType,
  SubtaskType,
  TaskType,
  UpdateTask,
} from "../types";
import { taskChangeStatus, updateTask } from "../services/taskService";
import {
  addSubtask,
  changeSubtaskStatus,
  deleteSubTask,
} from "../services/subtaskService";
import { updateBoard } from "../services/boardServices";
import { deleteColumn, updateColumn } from "../services/columnService";

const useBoard = () => {
  const [boards, setBoards] = useState<BoardType[]>([]);

  const getItemAndItemIndex = (
    boardId: string,
    columnId?: string,
    taskId?: string,
    subtask?: SubtaskType
  ):
    | [number, BoardType]
    | [number, number, ColumnType]
    | [number, number, number, TaskType]
    | [number, number, number, number, SubtaskType] => {
    const boardIndex = boards.findIndex((elem) => elem.id === boardId);

    if (!columnId) {
      return [boardIndex, boards[boardIndex]];
    }

    const columnIndex = boards[boardIndex].columns.findIndex(
      (item) => item.id === columnId
    );

    if (!taskId) {
      return [boardIndex, columnIndex, boards[boardIndex].columns[columnIndex]];
    }

    const taskIndex = boards[boardIndex].columns[columnIndex].tasks.findIndex(
      (item) => item.id === taskId
    );

    if (!subtask) {
      return [
        boardIndex,
        columnIndex,
        taskIndex,
        boards[boardIndex].columns[columnIndex].tasks[taskIndex],
      ];
    }
    const subtaskIndex = boards[boardIndex].columns[columnIndex].tasks[
      taskIndex
    ].subtasks.findIndex((item) => item.id === subtask.id);

    return [
      boardIndex,
      columnIndex,
      taskIndex,
      subtaskIndex,
      boards[boardIndex].columns[columnIndex].tasks[taskIndex].subtasks[
        subtaskIndex
      ],
    ];
  };

  const addTask = (data: TaskType, boardId: string, columnId: string) => {
    const clone = [...boards];

    const [boardIndex, columnIndex] = getItemAndItemIndex(boardId, columnId);

    if (typeof columnIndex !== "number") {
      return;
    }
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
    const [boardIndex, columnIndex, taskIndex, subtaskIndex] =
      getItemAndItemIndex(boardId, columnId, taskId, subtask);
    if (
      typeof columnIndex !== "number" ||
      typeof taskIndex !== "number" ||
      typeof subtaskIndex !== "number"
    ) {
      return;
    }

    clone[boardIndex].columns[columnIndex].tasks[taskIndex].subtasks[
      subtaskIndex
    ].active = !subtask.active;

    setBoards(clone);
  };

  const editTask = async (
    property: "title" | "description",
    value: string,
    boardId: string,
    columnId: string,
    taskId: string
  ) => {
    const clone = [...boards];
    const [boardIndex, columnIndex, taskIndex, task] = getItemAndItemIndex(
      boardId,
      columnId,
      taskId
    );

    if (
      typeof columnIndex !== "number" ||
      typeof taskIndex !== "number" ||
      typeof task !== "object"
    ) {
      return;
    }
    clone[boardIndex].columns[columnIndex].tasks[taskIndex][property] = value;
    try {
      const newTask: UpdateTask = {
        title: task.title,
        description: task.description,
      };
      newTask[property] = value;
      await updateTask(newTask, task.id);
    } catch (error) {
      console.log(error);
    } finally {
      setBoards(clone);
    }
  };

  const editSubtaskTitle = async (
    value: string,
    boardId: string,
    columnId: string,
    taskId: string,
    subtaskId: string
  ) => {
    const clone = [...boards];
    const [boardIndex, columnIndex, taskIndex] = getItemAndItemIndex(
      boardId,
      columnId,
      taskId
    );
    if (typeof columnIndex !== "number" || typeof taskIndex !== "number") {
      return;
    }
    const subtaskIndex = clone[boardIndex].columns[columnIndex].tasks[
      taskIndex
    ].subtasks.findIndex((item) => item.id === subtaskId);

    const subtask =
      clone[boardIndex].columns[columnIndex].tasks[taskIndex].subtasks[
        subtaskIndex
      ];
    clone[boardIndex].columns[columnIndex].tasks[taskIndex].subtasks[
      subtaskIndex
    ].title = value;

    try {
      await changeSubtaskStatus(
        { title: value, active: subtask.active },
        subtask.id
      );
    } catch (error) {
      console.log(error);
    } finally {
      setBoards(clone);
    }
  };

  const deleteSubtask = async (
    boardId: string,
    columnId: string,
    taskId: string,
    subtaskId: string
  ) => {
    const clone = [...boards];
    const [boardIndex, columnIndex, taskIndex] = getItemAndItemIndex(
      boardId,
      columnId,
      taskId
    );
    if (typeof columnIndex !== "number" || typeof taskIndex !== "number") {
      return;
    }
    const subtaskIndex = clone[boardIndex].columns[columnIndex].tasks[
      taskIndex
    ].subtasks.findIndex((item) => item.id === subtaskId);

    clone[boardIndex].columns[columnIndex].tasks[taskIndex].subtasks.splice(
      subtaskIndex,
      1
    );

    try {
      await deleteSubTask(taskId, subtaskId);
    } catch (error) {
      console.log(error);
    } finally {
      setBoards(clone);
    }
  };

  const createSubtask = async (
    value: string,
    boardId: string,
    columnId: string,
    taskId: string
  ) => {
    const clone = [...boards];
    const [boardIndex, columnIndex, taskIndex] = getItemAndItemIndex(
      boardId,
      columnId,
      taskId
    );
    if (typeof columnIndex !== "number" || typeof taskIndex !== "number") {
      return;
    }
    try {
      const response = await addSubtask(value, taskId);

      const newSubtask: SubtaskType = {
        title: value,
        active: true,
        id: response.data,
      };

      clone[boardIndex].columns[columnIndex].tasks[taskIndex].subtasks.push(
        newSubtask
      );

      setBoards(clone);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTaskStatus = async (
    boardId: string,
    columnId: string,
    newColumnId: string,
    taskId: string
  ) => {
    const clone = [...boards];
    const [boardIndex, columnIndex, taskIndex, task] = getItemAndItemIndex(
      boardId,
      columnId,
      taskId
    );
    if (
      typeof columnIndex !== "number" ||
      typeof taskIndex !== "number" ||
      typeof task !== "object"
    ) {
      return;
    }

    const newColumnIndex = clone[boardIndex].columns.findIndex(
      (item) => item.id === newColumnId
    );

    try {
      await taskChangeStatus(taskId, columnId, newColumnId);
      clone[boardIndex].columns[columnIndex].tasks.splice(taskIndex, 1);
      if (task) {
        clone[boardIndex].columns[newColumnIndex].tasks.push(task);
      }
      setBoards(clone);
    } catch (error) {
      console.log(error);
    }
  };

  const removeTask = (boardId: string, columnId: string, taskId: string) => {
    const clone = [...boards];
    const [boardIndex, columnIndex, taskIndex] = getItemAndItemIndex(
      boardId,
      columnId,
      taskId
    );
    if (typeof columnIndex !== "number" || typeof taskIndex !== "number") {
      return;
    }
    clone[boardIndex].columns[columnIndex].tasks.splice(taskIndex, 1);

    setBoards(clone);
  };

  const updateBoardTitle = async (value: string, boardId: string) => {
    const [boardIndex] = getItemAndItemIndex(boardId);
    const clone = [...boards];
    try {
      await updateBoard(value, boardId);
    } catch (error) {
      console.log(error);
    } finally {
      clone[boardIndex].title = value;
      setBoards(clone);
      alert("Board Title Updated Successfully");
    }
  };

  const updateColumnTitle = async (
    value: string,
    boardId: string,
    columnId: string
  ) => {
    const clone = [...boards];
    const [boardIndex, columnIndex] = getItemAndItemIndex(boardId, columnId);
    if (typeof columnIndex !== "number") {
      return;
    }

    try {
      await updateColumn(value, columnId);
    } catch (error) {
      console.log(error);
    } finally {
      clone[boardIndex].columns[columnIndex].title = value;
      setBoards(clone);
      alert("Column Title Updated Successfully");
    }
  };

  const removeColumn = async (boardId: string, columnId: string) => {
    const clone = [...boards];
    const [boardIndex, columnIndex] = getItemAndItemIndex(boardId, columnId);
    if (typeof columnIndex !== "number") {
      return;
    }

    try {
      await deleteColumn(boardId, columnId);
    } catch (error) {
      console.log(error);
    } finally {
      clone[boardIndex].columns.splice(columnIndex, 1);
      setBoards(clone);
    }
  };

  return {
    boards,
    setBoards,
    addTask,
    subtaskChangeStatus,
    editTask,
    editSubtaskTitle,
    deleteSubtask,
    createSubtask,
    updateTaskStatus,
    removeTask,
    updateBoardTitle,
    updateColumnTitle,
    removeColumn,
  };
};

export default useBoard;
