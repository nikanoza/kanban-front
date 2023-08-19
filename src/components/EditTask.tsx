import { BoardType, TaskType } from "../types";
import FormController from "./FormController";
import { Main, Title } from "./styled-components";

type PropsType = {
  dark: boolean;
  task: TaskType;
  board: BoardType;
};

const EditTask: React.FC<PropsType> = ({ dark, task, board }) => {
  return (
    <Main dark={dark}>
      <Title dark={dark}>Edit Task</Title>
      <FormController
        dark={dark}
        value={task.title}
        placeholder="e.g. Take coffee break"
        updateFunc={() => {}}
        deleteFunc={() => {}}
      />
    </Main>
  );
};

export default EditTask;
