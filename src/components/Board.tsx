import styled, { css } from "styled-components";
import { BoardType, TaskType, ThemeProps } from "../types";
import { generateColors } from "../helpers";
import { key } from "../hooks/useModals";

type PropsType = {
  board: BoardType;
  dark: boolean;
  setActiveTask: React.Dispatch<React.SetStateAction<TaskType | null>>;
  updateModals: (property: key) => void;
};

const colors = generateColors();

const Board: React.FC<PropsType> = ({
  board,
  dark,
  setActiveTask,
  updateModals,
}) => {
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
            {column.tasks.map((task) => {
              const finishedAmount = task.subtasks
                .slice()
                .filter((item) => !item.active).length;
              return (
                <TaskItem
                  dark={dark}
                  key={task.id}
                  onClick={() => {
                    setActiveTask(task);
                    updateModals("Task");
                  }}
                >
                  <TaskTitle dark={dark}>{task.title}</TaskTitle>
                  <SubtasksAmount>
                    {finishedAmount} of {task.subtasks.length}
                  </SubtasksAmount>
                </TaskItem>
              );
            })}
          </TaskItems>
        </Col>
      ))}
      <NewColumn dark={dark}>
        <NewColumnText onClick={() => updateModals("EditBoard")}>
          + New Column
        </NewColumnText>
      </NewColumn>
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
    cursor: pointer;
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

const SubtasksAmount = styled.h4`
  margin-top: 8px;
  color: var(--grey);
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const NewColumn = styled.div(
  ({ dark }: ThemeProps) => css`
    width: 100%;
    min-height: 500px;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${dark
      ? "linear-gradient(180deg, rgba(43, 44, 55, 0.25) 0%, rgba(43, 44, 55, 0.13) 100%)"
      : "linear-gradient(180deg,#e9effa 0%,rgba(233, 239, 250, 0.5) 100%)"};
    @media (min-width: 768px) {
      min-height: 800px;
    }
  `
);

const NewColumnText = styled.h2`
  color: var(--grey);
  text-align: center;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
