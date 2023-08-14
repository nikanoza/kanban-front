import { NewBoardType } from "../types";
import axios from "./index";

export const getAllBoards = async () => {
  return await axios.get("/boards");
};

export const createNewBoard = async (data: NewBoardType) => {
  return await axios.post("/boards", data);
};
