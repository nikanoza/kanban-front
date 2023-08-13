import styled, { css } from "styled-components";
import { ThemeProps } from "../types";

type PropsType = {
  dark: boolean;
};

const NewBoard: React.FC<PropsType> = ({ dark }) => {
  return (
    <Main dark={dark}>
      <Title dark={dark}>Add New Board</Title>
    </Main>
  );
};

export default NewBoard;

const Main = styled.div(
  ({ dark }: ThemeProps) => css`
    margin: 16px;
    width: 100%;
    max-width: 480px;
    padding: 24px;
    border-radius: 6px;
    background-color: ${dark ? "var(--darkGray)" : "var(--light)"};
  `
);

const Title = styled.h2(
  ({ dark }: ThemeProps) => css`
    color: ${dark ? "var(--light)" : "var(--dark) "};
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  `
);
