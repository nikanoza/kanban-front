import axios from "./index";

export const updateColumn = async (title: string, id: string) => {
  return axios.put("/columns/" + id, {
    title,
  });
};
