import styled, { css } from "styled-components";
import { BoardType, ThemeProps } from "../types";
import { BoardIcon, LogoDark, LogoLight } from "../svg";
import { key } from "../hooks/useModals";

type PropsType = {
  dark: boolean;
  boards: BoardType[];
  updateModals: (property: key) => void;
  setActiveBoard: React.Dispatch<React.SetStateAction<BoardType | null>>;
};

const LargeMenu: React.FC<PropsType> = ({
  dark,
  boards,
  updateModals,
  setActiveBoard,
}) => {
  return (
    <Menu dark={dark}>
      <LogoBox>{dark ? <LogoLight /> : <LogoDark />}</LogoBox>
      <Title>ALL BOARDS ({boards.length})</Title>
      <BoardList>
        {boards.map((board) => (
          <BoardTitle key={board.id}>
            <BoardIcon />
            <Text onClick={() => setActiveBoard(board)}>{board.title}</Text>
          </BoardTitle>
        ))}
        <BoardTitle>
          <BoardIcon color="#635FC7" />
          <Text
            style={{ color: "#635FC7" }}
            onClick={() => updateModals("NewBoard")}
          >
            + Create New Board
          </Text>
        </BoardTitle>
      </BoardList>
    </Menu>
  );
};

export default LargeMenu;

const Menu = styled.menu(
  ({ dark }: ThemeProps) => css`
    width: 260px;
    height: 100vh;
    margin-top: -80px;
    display: none;
    flex-direction: column;
    padding: 32px 0 47px 0;
    background-color: ${dark ? "var(--darkGray)" : "var(--light)"};
    @media (min-width: 768px) {
      display: flex;
    }
  `
);

const LogoBox = styled.div`
  margin-left: 26px;
`;

const Title = styled.h2`
  color: var(--grey);
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 2.4px;
  margin-left: 24px;
  margin-top: 54px;
`;

const BoardList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  margin-top: 19px;
`;

const BoardTitle = styled.li`
  padding: 14px 0 14px 24px;
  min-width: 240px;
  border-radius: 0px 100px 100px 0px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Text = styled.h2`
  color: var(--grey);
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
`;
