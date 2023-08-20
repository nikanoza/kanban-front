import { NewTaskAxios, UpdateTask } from "../types";
import axios from "./index";

export const createNewTask = async (data: NewTaskAxios) => {
  return axios.post("/tasks", data);
};

export const updateTask = async (data: UpdateTask, id: string) => {
  return axios.put("/tasks/" + id, data);
};
