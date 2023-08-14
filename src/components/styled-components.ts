import styled, { css } from "styled-components";
import { ThemeProps } from "../types";

export const Main = styled.div(
  ({ dark }: ThemeProps) => css`
    margin: 16px;
    width: 100%;
    max-width: 480px;
    padding: 24px;
    border-radius: 6px;
    background-color: ${dark ? "var(--darkGray)" : "var(--light)"};
  `
);

export const Title = styled.h2(
  ({ dark }: ThemeProps) => css`
    color: ${dark ? "var(--light)" : "var(--dark) "};
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-bottom: 24px;
  `
);

export const Form = styled.form`
  width: 100%;
`;

export const Label = styled.label(
  ({ dark }: ThemeProps) => css`
    color: ${dark ? "var(--light)" : "var(--grey)"};
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-bottom: 8px;
  `
);

export const Input = styled.input(
  ({ dark }: ThemeProps) => css`
    width: 100%;
    height: 40px;
    padding: 0 16px;
    border-radius: 4px;
    border: 1px solid;
    background: ${dark ? "var(--darkGray)" : "var(--white)"};
    color: ${dark ? "var(--light)" : "var(--dark) "};
    &::placeholder {
      opacity: 0.25;
    }
  `
);

export const Error = styled.p`
  height: 12px;
  color: var(--error);
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 23px;
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CloseButton = styled.button`
  border: none;
  background: transparent;
  margin-left: 16px;
`;

export const AddSubtask = styled.button(
  ({ dark }: ThemeProps) => css`
    width: 100%;
    border: none;
    height: 40px;
    border-radius: 20px;
    background: ${dark ? "var(--light)" : "rgba(99, 95, 199, 0.1)"};
    margin-top: 12px;
    color: var(--violet);
    text-align: center;
    font-size: 13px;
    font-style: normal;
    font-weight: 700;
    line-height: 23px;
  `
);

export const SubmitButton = styled.button`
  width: 100%;
  border: none;
  height: 40px;
  border-radius: 20px;
  color: var(--light);
  background: var(--violet);
  margin-top: 24px;
  text-align: center;
  font-size: 13px;
  font-style: normal;
  font-weight: 700;
  line-height: 23px;
`;