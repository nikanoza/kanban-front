import { useState } from "react";
import { BoardType } from "../types";
import FormController from "./FormController";
import { AddSubtask, Label, Main, Title } from "./styled-components";

type PropsType = {
  dark: boolean;
  board: BoardType;
  updateBoardTitle: (value: string, boardId: string) => Promise<void>;
  updateColumnTitle: (
    value: string,
    boardId: string,
    columnId: string
  ) => Promise<void>;
  removeColumn: (boardId: string, columnId: string) => Promise<void>;
};

const EditBoard: React.FC<PropsType> = ({
  dark,
  board,
  updateBoardTitle,
  updateColumnTitle,
  removeColumn,
}) => {
  const [newColumn, setNewColumn] = useState<boolean>(false);

  const updateBoard = (value: string) => {
    updateBoardTitle(value, board.id);
  };
  return (
    <Main dark={dark}>
      <Title dark={dark}>Edit Board</Title>
      <Label dark={dark}>Board Columns</Label>
      <FormController
        dark={dark}
        value={board.title}
        placeholder="e.g. Take coffee break"
        updateFunc={updateBoard}
      />
      <Label dark={dark}>Board Columns</Label>
      {board.columns.map((item) => {
        const updateColumn = (value: string) => {
          updateColumnTitle(value, board.id, item.id);
        };

        const deleteColumn = () => {
          removeColumn(board.id, item.id);
        };
        return (
          <FormController
            key={item.id}
            dark={dark}
            value={item.title}
            placeholder="e.g. Take coffee break"
            updateFunc={updateColumn}
            deleteFunc={deleteColumn}
          />
        );
      })}
      {newColumn ? (
        <FormController
          dark={dark}
          value={""}
          placeholder="e.g. Take coffee break"
          updateFunc={() => {}}
          deleteFunc={() => setNewColumn(false)}
        />
      ) : null}
      <AddSubtask
        type="button"
        dark={dark}
        style={{ marginBottom: "24px" }}
        onClick={() => setNewColumn(true)}
      >
        + Add New Column
      </AddSubtask>
    </Main>
  );
};

export default EditBoard;
