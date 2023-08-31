import styled, { css } from "styled-components";
import { BoardType, ThemeProps } from "../types";
import { useRef } from "react";
import { BoardIcon, Moon, Sun } from "../svg";
import { key } from "../hooks/useModals";

type PropsType = {
  dark: boolean;
  boards: BoardType[];
  toDark: () => void;
  toLight: () => void;
  closeMenu: () => void;
  updateModals: (property: key) => void;
  setActiveBoard: React.Dispatch<React.SetStateAction<BoardType | null>>;
  activeBoard: BoardType | null;
};

const MobileMenu: React.FC<PropsType> = ({
  dark,
  closeMenu,
  boards,
  toDark,
  toLight,
  updateModals,
  setActiveBoard,
  activeBoard,
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const modalClickHandler: React.MouseEventHandler<HTMLDivElement> = (
    event
  ) => {
    if (event.target === modalRef.current) {
      closeMenu();
    }
  };

  return (
    <Main ref={modalRef} onClick={modalClickHandler}>
      <Card dark={dark}>
        <Title>ALL BOARDS ({boards.length})</Title>
        <BoardList>
          {boards.map((board) => (
            <BoardTitle
              key={board.id}
              active={board.title === activeBoard?.title}
            >
              <BoardIcon
                color={board.title === activeBoard?.title ? "#fff" : ""}
              />
              <Text
                onClick={() => setActiveBoard(board)}
                active={board.title === activeBoard?.title}
              >
                {board.title}
              </Text>
            </BoardTitle>
          ))}
          <BoardTitle active={false}>
            <BoardIcon color="#635FC7" />
            <Text
              active={false}
              style={{ color: "#635FC7" }}
              onClick={() => updateModals("NewBoard")}
            >
              + Create New Board
            </Text>
          </BoardTitle>
        </BoardList>
        <Panel dark={dark}>
          <Sun onClick={toLight} />
          <Switch>
            <Circle
              style={{
                marginLeft: dark ? "auto" : 0,
                marginRight: dark ? 0 : "auto",
              }}
            />
          </Switch>
          <Moon onClick={toDark} />
        </Panel>
      </Card>
    </Main>
  );
};

export default MobileMenu;

const Main = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  top: 64px;
  left: 0;
`;

const Card = styled.div(
  ({ dark }: ThemeProps) => css`
    background-color: ${dark ? "var(--darkGray)" : "var(--light)"};
    box-shadow: ${dark
      ? "box-shadow: 0px 10px 20px 0px var(--darkGray)"
      : "0px 10px 20px 0px rgba(54, 78, 126, 0.25)"};
    border-radius: 8px;
    padding: 16px 0;
    height: fit-content;
    margin-top: 16px;
  `
);

const Title = styled.h2`
  color: var(--grey);
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 2.4px;
  margin-left: 24px;
`;

const BoardList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  margin-top: 19px;
`;

type ActiveBoardProps = {
  active: boolean;
};

const BoardTitle = styled.li(
  ({ active }: ActiveBoardProps) => css`
    padding: 14px 0 14px 24px;
    max-width: 240px;
    border-radius: 0px 100px 100px 0px;
    display: flex;
    align-items: center;
    gap: 12px;
    background-color: ${active ? "var(--violet)" : "transparent"};
    &:hover {
      background-color: ${active ? "var(--violet)" : "rgba(99, 95, 199, 0.1)"};
    }
    &:hover {
      > h2 {
        color: ${active ? "var(--light)" : "var(--violet)"};
      }
    }
  `
);

const Text = styled.h2(
  ({ active }: ActiveBoardProps) => css`
    color: ${active ? "var(--light)" : "var(--grey)"};
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    cursor: pointer;
  `
);

const Panel = styled.div(
  ({ dark }: ThemeProps) => css`
    width: 235px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
    border-radius: 6px;
    background-color: ${dark ? "var(--darkBg)" : "var(--veryLightGray)"};
    margin: 16px 16px 0 16px;
  `
);

const Switch = styled.div`
  width: 40px;
  height: 20px;
  display: flex;
  align-items: center;
  padding: 0 4px;
  background-color: var(--violet);
  border-radius: 12px;
`;

const Circle = styled.div`
  width: 14px;
  height: 14px;
  background-color: var(--light);
  border-radius: 50%;
`;
