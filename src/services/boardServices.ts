import axios from "./index";

export const getAllBoards = async () => {
  return await axios.get("/boards");
};
