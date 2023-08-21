import { useState } from "react";
import { BoardType, SubtaskType, TaskType, UpdateTask } from "../types";
import { updateTask } from "../services/taskService";
import { changeSubtaskStatus } from "../services/subtaskService";

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

  const editTask = async (
    property: "title" | "description",
    value: string,
    boardId: string,
    columnId: string,
    taskId: string
  ) => {
    const clone = [...boards];
    const boardIndex = clone.findIndex((item) => item.id === boardId);
    const columnIndex = clone[boardIndex].columns.findIndex(
      (item) => item.id === columnId
    );
    const taskIndex = clone[boardIndex].columns[columnIndex].tasks.findIndex(
      (item) => item.id === taskId
    );
    const task = clone[boardIndex].columns[columnIndex].tasks[taskIndex];
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
    const boardIndex = clone.findIndex((item) => item.id === boardId);
    const columnIndex = clone[boardIndex].columns.findIndex(
      (item) => item.id === columnId
    );
    const taskIndex = clone[boardIndex].columns[columnIndex].tasks.findIndex(
      (item) => item.id === taskId
    );
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
  return {
    boards,
    setBoards,
    addTask,
    subtaskChangeStatus,
    editTask,
    editSubtaskTitle,
  };
};

export default useBoard;
