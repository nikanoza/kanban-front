import styled, { css } from "styled-components";
import { ThemeProps } from "../types";

type PropsType = {
  dark: boolean;
};

const NewTask: React.FC<PropsType> = ({ dark }) => {
  return (
    <Main dark={dark}>
      <Title dark={dark}>Add New Task</Title>
      <Form></Form>
    </Main>
  );
};

export default NewTask;

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
    margin-bottom: 24px;
  `
);

const Form = styled.form`
  width: 100%;
`;
