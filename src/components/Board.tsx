import styled, { css } from "styled-components";
import { BoardType, ThemeProps } from "../types";
import { generateColors } from "../helpers";

type PropsType = {
  board: BoardType;
  dark: boolean;
};

const colors = generateColors();

const Board: React.FC<PropsType> = ({ board, dark }) => {
  return (
    <Main>
      {board.columns.map((column, index) => (
        <Col key={column.id}>
          <TitleWrapper>
            <Circle color={colors[index]} />
            <ColumnTitle>
              {column.title + " " + "(" + column.tasks.length + ")"}
            </ColumnTitle>
          </TitleWrapper>
          <TaskItems>
            {column.tasks.map((task) => (
              <TaskItem dark={dark}>
                <TaskTitle dark={dark}>{task.title}</TaskTitle>
              </TaskItem>
            ))}
          </TaskItems>
        </Col>
      ))}
    </Main>
  );
};

export default Board;

const Main = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 24px;
`;

const TaskItems = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 24px;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Circle = styled.div(
  ({ color }: { color: string }) => css`
    width: 15px;
    height: 15px;
    background: ${color};
    border-radius: 50%;
  `
);

const ColumnTitle = styled.h3`
  color: var(--grey);
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 2.4px;
`;

const Col = styled.div`
  width: 280px;
`;

const TaskItem = styled.div(
  ({ dark }: ThemeProps) => css`
    width: 100%;
    padding: 24px 16px;
    border-radius: 8px;
    background: ${dark ? "var(--darkGray)" : "var(--light)"};
    box-shadow: 0px 4px 6px 0px rgba(54, 78, 126, 0.1);
  `
);

const TaskTitle = styled.h3(
  ({ dark }: ThemeProps) => css`
    color: ${dark ? "var(--light)" : "var(--dark)"};
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  `
);
