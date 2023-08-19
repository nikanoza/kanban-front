import axios from "./index";
import { UpdateSubtask } from "../types";

export const changeSubtaskStatus = async (data: UpdateSubtask, id: string) => {
  return axios.put("/subtasks/" + id, data);
};
