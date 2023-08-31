import styled, { css } from "styled-components";
import { ThemeProps } from "../types";

export const Main = styled.div(
  ({ dark }: ThemeProps) => css`
    margin: 16px;
    width: 100%;
    max-width: 480px;
    padding: 24px;
    border-radius: 6px;
    position: relative;
    max-height: 500px;
    overflow-y: auto;
    background-color: ${dark ? "var(--darkGray)" : "var(--light)"};
    @media (min-width: 768px) {
      padding: 32px;
      max-height: 800px;
    }
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

export const TextArea = styled.textarea(
  ({ dark }: ThemeProps) => css`
    width: 100%;
    height: 112px;
    padding: 8px 16px;
    border-radius: 4px;
    border: 1px solid;
    resize: none;
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

export const ColumnSelect = styled.div(
  ({ dark }: ThemeProps) => css`
    width: 100%;
    height: 40px;
    padding: 8px 16px;
    border-radius: 4px;
    border: 1px solid rgba(130, 143, 163, 0.25);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: ${dark ? "var(--darkGray)" : "var(--white)"};
    color: ${dark ? "var(--light)" : "var(--dark) "};
    position: relative;
  `
);

export const SelectText = styled.h3`
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 23px;
`;

export const SelectPanel = styled.div(
  ({ dark }: ThemeProps) => css`
    width: 100%;
    position: absolute;
    top: 50px;
    left: 0;
    border-radius: 8px;
    background: ${dark ? "var(--darkBg)" : "var(--light)"};
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    box-shadow: 0px 10px 20px 0px rgba(54, 78, 126, 0.25);
  `
);

export const PanelText = styled.button`
  border: none;
  text-align: left;
  background: transparent;
  color: var(--grey);
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 23px;
  cursor: pointer;
`;
