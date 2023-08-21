import { BoardType, TaskType } from "../types";
import FormController from "./FormController";
import FormTextarea from "./FormTextarea";
import { Label, Main, Title } from "./styled-components";

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
  editSubtaskTitle: (
    value: string,
    boardId: string,
    columnId: string,
    taskId: string,
    subtaskId: string
  ) => Promise<void>;
};

const EditTask: React.FC<PropsType> = ({
  dark,
  task,
  board,
  editTask,
  editSubtaskTitle,
}) => {
  const column = board.columns.find((elem) =>
    elem.tasks.find((item) => task.id === item.id)
  );

  const updateTitle = (value: string) => {
    editTask("title", value, board.id, column?.id || "", task.id);
  };

  const updateDescription = (value: string) => {
    editTask("description", value, board.id, column?.id || "", task.id);
  };

  return (
    <Main dark={dark}>
      <Title dark={dark}>Edit Task</Title>
      <Label dark={dark}>Title</Label>
      <FormController
        dark={dark}
        value={task.title}
        placeholder="e.g. Take coffee break"
        updateFunc={updateTitle}
      />
      <Label dark={dark}>Description</Label>
      <FormTextarea
        dark={dark}
        value={task.description}
        placeholder="e.g. It’s always good to take a break. This 
        15 minute break will  recharge the batteries 
        a little."
        updateFunc={updateDescription}
      />
      <Label dark={dark}>Subtasks</Label>
      {task.subtasks.map((item) => {
        const updateSubtaskTitle = (value: string) => {
          editSubtaskTitle(value, board.id, column?.id || "", task.id, item.id);
        };

        return (
          <FormController
            key={item.id}
            dark={dark}
            value={item.title}
            placeholder="e.g. Take coffee break"
            updateFunc={updateSubtaskTitle}
          />
        );
      })}
    </Main>
  );
};

export default EditTask;
