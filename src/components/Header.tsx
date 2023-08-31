import styled, { css } from "styled-components";
import { BoardType, ThemeProps } from "../types";
import {
  DownArrow,
  Plus,
  LogoMobile,
  Options,
  LogoLight,
  LogoDark,
} from "../svg";
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
  activeMenu: boolean;
};

const Header: React.FC<PropsType> = ({
  dark,
  boards,
  toDark,
  toLight,
  updateModals,
  activeBoard,
  setActiveBoard,
  activeMenu,
}) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showPanel, setShowPanel] = useState<boolean>(false);

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <div style={{ display: "flex" }}>
      {activeMenu ? null : (
        <Menu dark={dark}>
          <LogoBox>{dark ? <LogoLight /> : <LogoDark />}</LogoBox>
        </Menu>
      )}
      <HeaderElem dark={dark}>
        <MobileElement>
          <LogoMobile />
        </MobileElement>
        <BoardSelect dark={dark}>
          {activeBoard ? activeBoard.title : "No Boards"}
        </BoardSelect>
        <MobileElement
          style={{ transform: showMenu ? "rotate(180deg)" : "none" }}
        >
          <DownArrow
            onClick={() => {
              setShowMenu(!showMenu);
              setShowPanel(false);
            }}
          />
        </MobileElement>
        <LargeTitle dark={dark}>{activeBoard?.title}</LargeTitle>
        <PlusBox
          active={activeBoard ? true : false}
          onClick={() => {
            updateModals("NewTask");
          }}
        >
          <LargeElement>+ Add New Task</LargeElement>
          <MobileElement>
            <Plus />
          </MobileElement>
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
            <DeleteText
              onClick={() => {
                updateModals("DeleteBoard");
                setShowMenu(false);
                setShowPanel(false);
              }}
            >
              Delete Board
            </DeleteText>
          </Panel>
        ) : null}
      </HeaderElem>
    </div>
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
    @media (min-width: 768px) {
      padding: 0 20px;
      width: calc(100% - 261px);
      margin-left: auto;
      height: 80px;
    }
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
    @media (min-width: 768px) {
      display: none;
    }
  `
);

const PlusBox = styled.div(
  ({ active }: { active: boolean }) => css`
    background-color: var(--violet);
    opacity: ${active ? "1" : "0.25"};
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 32px;
    margin-left: auto;
    margin-right: 16px;
    cursor: pointer;
    @media (min-width: 768px) {
      width: fit-content;
      padding: 14px 24px;
      height: 48px;
      border-radius: 24px;
      font-size: 15px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      color: var(--light);
    }
  `
);

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

const MobileElement = styled.div`
  @media (min-width: 768px) {
    display: none;
  }
`;

const LargeElement = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: flex;
  }
`;

const LargeTitle = styled.h2(
  ({ dark }: ThemeProps) => css`
    color: ${dark ? "var(--light)" : "var(--dark)"};
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    display: none;
    @media (min-width: 768px) {
      display: block;
    }
  `
);

const Menu = styled.menu(
  ({ dark }: ThemeProps) => css`
    width: 260px;
    height: 80px;
    display: none;
    padding: 32px 0 28px 0;
    background-color: ${dark ? "var(--darkGray)" : "var(--light)"};
    @media (min-width: 768px) {
      display: flex;
    }
  `
);

const LogoBox = styled.div`
  margin-left: 26px;
`;
