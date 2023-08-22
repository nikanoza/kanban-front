import styled, { css } from "styled-components";
import { BoardType, TaskType, ThemeProps } from "../types";
import { Main, SubmitButton } from "./styled-components";

type PropsType = {
  dark: boolean;
  task: TaskType;
  board: BoardType;
};

const DeleteTask: React.FC<PropsType> = ({ dark, task, board }) => {
  const column = board.columns.find((elem) =>
    elem.tasks.find((item) => task.id === item.id)
  );
  return (
    <Main dark={dark}>
      <DeleteText>Delete this task?</DeleteText>
      <Description>
        Are you sure you want to delete the ‘{task.title}’ task and its
        subtasks? This action cannot be reversed.
      </Description>
      <Confirm>Delete</Confirm>
      <Cancel dark={dark}>Cancel</Cancel>
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
`;

const Cancel = styled(SubmitButton)(
  ({ dark }: ThemeProps) => css`
    background: ${dark ? "#fff" : "rgba(99, 95, 199, 0.10)"};
    color: var(--violet);
    margin-top: 16px;
  `
);
