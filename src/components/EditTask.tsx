import { useState } from "react";
import { BoardType, ColumnType, TaskType } from "../types";
import FormController from "./FormController";
import FormTextarea from "./FormTextarea";
import {
  AddSubtask,
  CloseButton,
  ColumnSelect,
  Label,
  Main,
  PanelText,
  SelectPanel,
  SelectText,
  Title,
  Wrapper,
} from "./styled-components";
import { Check, DownArrow } from "../svg";

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
  updateTaskStatus: (
    boardId: string,
    columnId: string,
    newColumnId: string,
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
  updateTaskStatus,
}) => {
  const [newSubtask, setNewSubtask] = useState<boolean>(false);
  const [showColumns, setShowColumns] = useState<boolean>(false);
  const column = board.columns.find((elem) =>
    elem.tasks.find((item) => task.id === item.id)
  );

  const [activeColumn, setActiveColumn] = useState<ColumnType | undefined>(
    column
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

  const changeTaskStatus = () => {
    updateTaskStatus(
      board.id,
      column?.id || "",
      activeColumn?.id || "",
      task.id
    );
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
      <Label dark={dark} htmlFor="column-select">
        Status
      </Label>
      <Wrapper>
        <ColumnSelect dark={dark}>
          <SelectText>{activeColumn?.title}</SelectText>
          <div style={{ rotate: showColumns ? "180deg" : "0deg" }}>
            <DownArrow onClick={() => setShowColumns(!showColumns)} />
          </div>
          {showColumns ? (
            <SelectPanel dark={dark}>
              {board.columns.map((col) => (
                <PanelText
                  key={col.id}
                  onClick={() => {
                    setShowColumns(false);
                    setActiveColumn(col);
                  }}
                  type="button"
                >
                  {col.title}
                </PanelText>
              ))}
            </SelectPanel>
          ) : null}
        </ColumnSelect>
        <CloseButton
          style={{
            width: "fit-content",
            height: "fit-content",
            transform: "scale(2)",
            marginTop: "-5px",
          }}
          onClick={changeTaskStatus}
        >
          <Check color="#635FC7" />
        </CloseButton>
      </Wrapper>
    </Main>
  );
};

export default EditTask;
