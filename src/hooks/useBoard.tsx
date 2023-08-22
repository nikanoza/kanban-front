import { useState } from "react";
import { BoardType, SubtaskType, TaskType, UpdateTask } from "../types";
import { taskChangeStatus, updateTask } from "../services/taskService";
import {
  addSubtask,
  changeSubtaskStatus,
  deleteSubTask,
} from "../services/subtaskService";

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

  const deleteSubtask = async (
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
    const boardIndex = clone.findIndex((item) => item.id === boardId);
    const columnIndex = clone[boardIndex].columns.findIndex(
      (item) => item.id === columnId
    );
    const taskIndex = clone[boardIndex].columns[columnIndex].tasks.findIndex(
      (item) => item.id === taskId
    );

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
    const boardIndex = clone.findIndex((item) => item.id === boardId);
    const columnIndex = clone[boardIndex].columns.findIndex(
      (item) => item.id === columnId
    );

    const newColumnIndex = clone[boardIndex].columns.findIndex(
      (item) => item.id === newColumnId
    );

    const task = clone[boardIndex].columns[columnIndex].tasks.find(
      (item) => item.id === taskId
    );
    const taskIndex = clone[boardIndex].columns[columnIndex].tasks.findIndex(
      (item) => item.id === taskId
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
  };
};

export default useBoard;
