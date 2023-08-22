import { useState } from "react";
import { BoardType, TaskType } from "../types";
import FormController from "./FormController";
import FormTextarea from "./FormTextarea";
import { AddSubtask, Label, Main, Title } from "./styled-components";

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
  deleteSubtask: (
    boardId: string,
    columnId: string,
    taskId: string,
    subtaskId: string
  ) => Promise<void>;
  createSubtask: (
    value: string,
    boardId: string,
    columnId: string,
    taskId: string
  ) => Promise<void>;
};

const EditTask: React.FC<PropsType> = ({
  dark,
  task,
  board,
  editTask,
  editSubtaskTitle,
  deleteSubtask,
  createSubtask,
}) => {
  const [newSubtask, setNewSubtask] = useState<boolean>(false);

  const column = board.columns.find((elem) =>
    elem.tasks.find((item) => task.id === item.id)
  );

  const updateTitle = (value: string) => {
    editTask("title", value, board.id, column?.id || "", task.id);
  };

  const updateDescription = (value: string) => {
    editTask("description", value, board.id, column?.id || "", task.id);
  };

  const addSubtask = (value: string) => {
    createSubtask(value, board.id, column?.id || "", task.id);
    setNewSubtask(false);
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

        const removeSubtask = () => {
          deleteSubtask(board.id, column?.id || "", task.id, item.id);
        };

        return (
          <FormController
            key={item.id}
            dark={dark}
            value={item.title}
            placeholder="e.g. Take coffee break"
            updateFunc={updateSubtaskTitle}
            deleteFunc={removeSubtask}
          />
        );
      })}
      {newSubtask ? (
        <FormController
          dark={dark}
          value={""}
          placeholder="e.g. Take coffee break"
          updateFunc={addSubtask}
          deleteFunc={() => setNewSubtask(false)}
        />
      ) : null}
      <AddSubtask
        type="button"
        dark={dark}
        style={{ marginBottom: "24px" }}
        onClick={() => setNewSubtask(true)}
      >
        + Add New Subtask
      </AddSubtask>
    </Main>
  );
};

export default EditTask;
