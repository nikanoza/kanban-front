import styled, { css } from "styled-components";
import { BoardType, ThemeProps } from "../types";
import { DownArrow, Plus, LogoMobile, Options } from "../svg";
import { useState } from "react";
import { MobileMenu } from ".";
import { key } from "../hooks/useModals";
type PropsType = {
  dark: boolean;
  toDark: () => void;
  toLight: () => void;
  boards: BoardType[];
  updateModals: (property: key) => void;
  activeBoard: BoardType | null;
  setActiveBoard: React.Dispatch<React.SetStateAction<BoardType | null>>;
};

const Header: React.FC<PropsType> = ({
  dark,
  boards,
  toDark,
  toLight,
  updateModals,
  activeBoard,
  setActiveBoard,
}) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showPanel, setShowPanel] = useState<boolean>(false);

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <HeaderElem dark={dark}>
      <LogoMobile />
      <BoardSelect dark={dark}>
        {activeBoard ? activeBoard.title : "No Boards"}
      </BoardSelect>
      <DownArrow
        onClick={() => {
          setShowMenu(!showMenu);
          setShowPanel(false);
        }}
      />
      <PlusBox>
        <Plus
          onClick={() => {
            updateModals("NewTask");
          }}
        />
      </PlusBox>
      <Options
        onClick={() => {
          setShowPanel(!showPanel);
          setShowMenu(false);
        }}
      />
      {showMenu ? (
        <MobileMenu
          dark={dark}
          closeMenu={closeMenu}
          boards={boards}
          toDark={toDark}
          toLight={toLight}
          updateModals={updateModals}
          setActiveBoard={setActiveBoard}
        />
      ) : null}
      {showPanel ? (
        <Panel dark={dark}>
          <EditText
            onClick={() => {
              updateModals("EditBoard");
              setShowMenu(false);
              setShowPanel(false);
            }}
          >
            Edit Board
          </EditText>
          <DeleteText>Delete Board</DeleteText>
        </Panel>
      ) : null}
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

const Panel = styled.div(
  ({ dark }: ThemeProps) => css`
    width: 192px;
    height: 94px;
    border-radius: 8px;
    background: ${!dark ? "var(--light)" : "var(--darkBg)"};
    box-shadow: 0px 10px 20px 0px rgba(54, 78, 126, 0.25);
    padding: 16px;
    position: absolute;
    top: 68px;
    right: 15px;
  `
);

const EditText = styled.h3`
  color: var(--grey);
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 23px;
  width: fit-content;
`;

const DeleteText = styled.h3`
  color: var(--error);
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 23px;
  margin-top: 16px;
  width: fit-content;
`;
