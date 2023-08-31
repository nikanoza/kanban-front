import styled, { css } from "styled-components";
import { BoardType, TaskType, ThemeProps } from "../types";
import { Main, SubmitButton } from "./styled-components";
import { ModalsInfoType } from "../hooks/useModals";
import { deleteTask } from "../services/taskService";

type PropsType = {
  dark: boolean;
  task: TaskType;
  board: BoardType;
  updateModals: (property: keyof ModalsInfoType) => void;
  removeTask: (boardId: string, columnId: string, taskId: string) => void;
};

const DeleteTask: React.FC<PropsType> = ({
  dark,
  task,
  board,
  updateModals,
  removeTask,
}) => {
  const column = board.columns.find((elem) =>
    elem.tasks.find((item) => task.id === item.id)
  );

  const deleteValue = async () => {
    try {
      await deleteTask(task.id, column?.id || "");
    } catch (error) {
      console.log(error);
    } finally {
      removeTask(board.id, column?.id || "", task.id);
      updateModals("DeleteTask");
    }
  };
  return (
    <Main dark={dark}>
      <DeleteText>Delete this task?</DeleteText>
      <Description>
        Are you sure you want to delete the ‘{task.title}’ task and its
        subtasks? This action cannot be reversed.
      </Description>
      <Confirm onClick={deleteValue}>Delete</Confirm>
      <Cancel dark={dark} onClick={() => updateModals("DeleteTask")}>
        Cancel
      </Cancel>
    </Main>
  );
};

export default DeleteTask;

const DeleteText = styled.h2`
  color: var(--error);
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Description = styled.h3`
  color: var(--grey);
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 23px;
  margin-top: 24px;
`;

const Confirm = styled(SubmitButton)`
  background: var(--error);
  &:hover {
    background: var(--errorHover);
  }
`;

const Cancel = styled(SubmitButton)(
  ({ dark }: ThemeProps) => css`
    background: ${dark ? "#fff" : "rgba(99, 95, 199, 0.10)"};
    color: var(--violet);
    margin-top: 16px;
  `
);
