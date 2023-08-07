import styled, { css } from "styled-components";
import { ThemeProps } from "../types";
import { DownArrow, Plus, LogoMobile, Options } from "../svg";
type PropsType = {
  dark: boolean;
  toDark: () => void;
  toLight: () => void;
};

const Header: React.FC<PropsType> = ({ dark, toDark, toLight }) => {
  return (
    <HeaderElem dark={dark}>
      <LogoMobile />
      <BoardSelect dark={dark}>No Boards</BoardSelect>
      <DownArrow />
      <PlusBox>
        <Plus />
      </PlusBox>
      <Options />
    </HeaderElem>
  );
};

export default Header;

const HeaderElem = styled.header(
  ({ dark }: ThemeProps) => css`
    width: 100%;
    height: 64px;
    padding: 0 16px;
    background-color: ${dark ? "#2B2C37" : "var(--light)"};
    display: flex;
    align-items: center;
  `
);

const BoardSelect = styled.h2(
  ({ dark }: ThemeProps) => css`
    color: ${dark ? "var(--light)" : "var(--dark)"};
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-left: 16px;
    margin-right: 8px;
  `
);

const PlusBox = styled.div`
  background-color: rgba(99, 95, 199, 0.25);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 32px;
  margin-left: auto;
  margin-right: 16px;
`;
