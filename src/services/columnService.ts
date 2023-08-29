import axios from "./index";

export const updateColumn = async (title: string, id: string) => {
  return axios.put("/columns/" + id, {
    title,
  });
};

export const deleteColumn = async (boardId: string, columnId: string) => {
  return axios.delete("/columns/" + columnId, {
    data: { boardId },
  });
};
