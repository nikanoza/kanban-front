import { NewBoardType } from "../types";
import axios from "./index";

export const getAllBoards = async () => {
  return await axios.get("/boards");
};

export const createNewBoard = async (data: NewBoardType) => {
  return await axios.post("/boards", data);
};

export const updateBoard = async (title: string, id: string) => {
  return await axios.put("/boards/" + id, {
    title,
  });
};

export const deleteBoard = async (id: string) => {
  return await axios.delete("/boards/" + id);
};
