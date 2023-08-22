import { NewTaskAxios, UpdateTask } from "../types";
import axios from "./index";

export const createNewTask = async (data: NewTaskAxios) => {
  return axios.post("/tasks", data);
};

export const updateTask = async (data: UpdateTask, id: string) => {
  return axios.put("/tasks/" + id, data);
};

export const taskChangeStatus = async (
  taskId: string,
  oldColumnId: string,
  newColumnId: string
) => {
  return axios.put("/tasks/status/" + taskId, {
    columnId: oldColumnId,
    newColumnId,
  });
};

export const deleteTask = async (taskId: string, columnId: string) => {
  return axios.delete("/tasks/" + taskId, { data: { columnId } });
};
