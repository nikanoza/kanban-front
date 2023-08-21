import { BoardType, TaskType } from "../types";
import FormController from "./FormController";
import { Main, Title } from "./styled-components";

type PropsType = {
  dark: boolean;
  task: TaskType;
  board: BoardType;
  editTask: (
    property: "title" | "description",
    value: string,
    boardId: string,
    columnId: string,
    taskId: string
  ) => Promise<void>;
};

const EditTask: React.FC<PropsType> = ({ dark, task, board, editTask }) => {
  const column = board.columns.find((elem) =>
    elem.tasks.find((item) => task.id === item.id)
  );

  const updateTitle = (value: string) => {
    editTask("title", value, board.id, column?.id || "", task.id);
  };

  return (
    <Main dark={dark}>
      <Title dark={dark}>Edit Task</Title>
      <FormController
        dark={dark}
        value={task.title}
        placeholder="e.g. Take coffee break"
        updateFunc={updateTitle}
        deleteFunc={() => {}}
      />
    </Main>
  );
};

export default EditTask;
