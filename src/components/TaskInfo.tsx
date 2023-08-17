import styled, { css } from "styled-components";
import { BoardType, TaskType, ThemeProps } from "../types";
import { ColumnSelect, Main, SelectText } from "./styled-components";
import { Check, Options } from "../svg";

type PropsType = {
  dark: boolean;
  task: TaskType;
  boardId: string;
  boards: BoardType[];
};

const TaskInfo: React.FC<PropsType> = ({ dark, task, boards, boardId }) => {
  const finishedAmount = task.subtasks
    .slice()
    .filter((item) => !item.active).length;
  return (
    <Main dark={dark}>
      <Header>
        <TaskTitle dark={dark}>{task.title}</TaskTitle>
        <Options />
      </Header>
      <Description>{task.description}</Description>
      <ActiveAmount dark={dark}>
        Subtasks ({finishedAmount} of {task.subtasks.length})
      </ActiveAmount>
      <TaskList>
        {task.subtasks.map((item) => (
          <TaskItem dark={dark} key={item.id}>
            <Checkbox active={item.active}>
              {!item.active ? <Check /> : null}
            </Checkbox>
            <SubtaskTitle dark={dark} active={item.active}>
              {item.title}
            </SubtaskTitle>
          </TaskItem>
        ))}
      </TaskList>
      <Status dark={dark}>Current Status</Status>
      <ColumnSelect dark={dark}>
        <SelectText>{task.title}</SelectText>
      </ColumnSelect>
    </Main>
  );
};

export default TaskInfo;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TaskTitle = styled.h2(
  ({ dark }: ThemeProps) => css`
    color: ${dark ? "var(--light)" : "var(--dark)"};
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  `
);

const Description = styled.p`
  margin-top: 24px;
  width: 100%;
  color: var(--grey);
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 23px; /* 176.923% */
`;

const ActiveAmount = styled.h3(
  ({ dark }: ThemeProps) => css`
    color: ${dark ? "var(--light)" : "var(--grey)"};
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-top: 24px;
  `
);

const TaskList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
`;

const TaskItem = styled.div(
  ({ dark }: ThemeProps) => css`
    width: 100%;
    height: 60px;
    border-radius: 4px;
    background: ${dark ? "var(--darkBg)" : "var(--veryLightGray)"};
    display: flex;
    align-items: center;
    padding: 0 8px 0 12px;
  `
);

type CheckboxType = {
  active: boolean;
};

const Checkbox = styled.div(
  ({ active }: CheckboxType) => css`
    width: 16px;
    height: 16px;
    border-radius: 2px;
    border: 1px solid rgba(130, 143, 163, 0.25);
    background: ${active ? "var(--light)" : "var(--violet)"};
    display: flex;
    justify-content: center;
    align-items: center;
  `
);

interface SubtasksTitleProps extends ThemeProps {
  active: boolean;
}

const SubtaskTitle = styled.p(
  ({ dark, active }: SubtasksTitleProps) => css`
    color: ${dark ? "var(--light)" : "var(--dark)"};
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-decoration-line: ${active ? "none" : "strikethrough"};
    opacity: ${active ? "1" : "0.5"};
    margin-left: 16px;
  `
);

export const Status = styled.h3(
  ({ dark }: ThemeProps) => css`
    color: ${dark ? "var(--light)" : "var(--grey)"};
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-bottom: 8px;
    margin-top: 24px;
  `
);
