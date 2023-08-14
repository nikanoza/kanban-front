import styled, { css } from "styled-components";
import { BoardType } from "../types";
import { generateColors } from "../helpers";

type PropsType = {
  board: BoardType;
};

const colors = generateColors();

const Board: React.FC<PropsType> = ({ board }) => {
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
  display: flex;
  flex-direction: column;
  gap: 20px;
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
