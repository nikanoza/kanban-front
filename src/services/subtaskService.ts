import axios from "./index";
import { UpdateSubtask } from "../types";

export const changeSubtaskStatus = async (data: UpdateSubtask, id: string) => {
  return axios.put("/subtasks/" + id, data);
};

export const deleteSubTask = async (taskId: string, subtaskId: string) => {
  return axios.delete("/subtasks/" + subtaskId, { data: { taskId } });
};
