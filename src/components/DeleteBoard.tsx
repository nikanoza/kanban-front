import styled, { css } from "styled-components";
import { ModalsInfoType } from "../hooks/useModals";
import { BoardType, ThemeProps } from "../types";
import { Main, SubmitButton } from "./styled-components";

type PropsType = {
  dark: boolean;
  board: BoardType;
  updateModals: (property: keyof ModalsInfoType) => void;
};

const DeleteBoard: React.FC<PropsType> = ({ dark, board, updateModals }) => {
  return (
    <Main dark={dark}>
      <DeleteText>Delete this board?</DeleteText>
      <Description>
        Are you sure you want to delete the ‘{board.title}’ board? This action
        will remove all columns and tasks and cannot be reversed.
      </Description>
      <Confirm onClick={() => {}}>Delete</Confirm>
      <Cancel dark={dark} onClick={() => updateModals("DeleteBoard")}>
        Cancel
      </Cancel>
    </Main>
  );
};

export default DeleteBoard;

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
