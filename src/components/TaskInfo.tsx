import { TaskType } from "../types";
import { Main } from "./styled-components";

type PropsType = {
  dark: boolean;
  task: TaskType;
  boardId: string;
};

const TaskInfo: React.FC<PropsType> = ({ dark, task, boardId }) => {
  return <Main dark={dark}></Main>;
};

export default TaskInfo;
