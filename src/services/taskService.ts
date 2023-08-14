import { NewTaskAxios } from "../types";
import axios from "./index";

export const createNewTask = async (data: NewTaskAxios) => {
  return axios.post("/tasks", data);
};
