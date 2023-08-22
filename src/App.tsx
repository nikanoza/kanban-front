import styled, { css } from "styled-components";
import {
  Board,
  EditTask,
  Empty,
  Header,
  Modal,
  NewBoard,
  NewTask,
  TaskInfo,
} from "./components";
import { useEffect, useState } from "react";
import { BoardType, TaskType, ThemeProps } from "./types";
import { getAllBoards } from "./services/boardServices";
import { useBoard, useModals, useTheme } from "./hooks";

function App() {
  const { dark, toDark, toLight } = useTheme();
  const { modalsInfo, updateModals, openEditTask } = useModals();
  const {
    boards,
    setBoards,
    addTask,
    subtaskChangeStatus,
    editTask,
    editSubtaskTitle,
    deleteSubtask,
    createSubtask,
    updateTaskStatus,
  } = useBoard();
  const [activeBoard, setActiveBoard] = useState<BoardType | null>(null);
  const [activeTask, setActiveTask] = useState<TaskType | null>(null);

  useEffect(() => {
    const getBoardsData = async () => {
      try {
        const response = await getAllBoards();
        setBoards(response.data);
        setActiveBoard(response.data[0]);
      } catch (error) {
        alert(error);
      }
    };

    getBoardsData();
  }, [setBoards]);

  return (
    <Main>
      <Header
        dark={dark}
        toDark={toDark}
        toLight={toLight}
        boards={boards}
        updateModals={updateModals}
        activeBoard={activeBoard}
        setActiveBoard={setActiveBoard}
      />
      <Content
        dark={dark}
        style={{ alignItems: boards.length > 0 ? "flex-start" : "center" }}
      >
        {boards.length > 0 && activeBoard ? (
          <Board
            board={activeBoard}
            dark={dark}
            setActiveTask={setActiveTask}
            updateModals={updateModals}
          />
        ) : (
          <Empty updateModals={updateModals} />
        )}
      </Content>
      {modalsInfo.NewBoard ? (
        <Modal onClick={() => updateModals("NewBoard")}>
          <NewBoard dark={dark} setBoards={setBoards} />
        </Modal>
      ) : null}
      {modalsInfo.NewTask && activeBoard ? (
        <Modal onClick={() => updateModals("NewTask")}>
          <NewTask
            dark={dark}
            board={activeBoard}
            addTask={addTask}
            updateModals={updateModals}
          />
        </Modal>
      ) : null}
      {modalsInfo.Task && activeBoard && activeTask ? (
        <Modal onClick={() => updateModals("Task")}>
          <TaskInfo
            dark={dark}
            task={activeTask}
            board={activeBoard}
            subtaskChangeStatus={subtaskChangeStatus}
            openEditTask={openEditTask}
          />
        </Modal>
      ) : null}
      {modalsInfo.EditTask && activeBoard && activeTask ? (
        <Modal onClick={() => updateModals("EditTask")}>
          <EditTask
            dark={dark}
            task={activeTask}
            board={activeBoard}
            editTask={editTask}
            editSubtaskTitle={editSubtaskTitle}
            deleteSubtask={deleteSubtask}
            createSubtask={createSubtask}
            updateTaskStatus={updateTaskStatus}
          />
        </Modal>
      ) : null}
    </Main>
  );
}

export default App;

const Main = styled.main`
  width: 100%;
  min-height: 100vh;
`;

const Content = styled.section(
  ({ dark }: ThemeProps) => css`
    min-width: 100vw;
    min-height: calc(100vh - 64px);
    display: flex;
    padding: 24px 16px;
    overflow: auto;
    background-color: ${dark ? "var(--darkBg)" : "var(--veryLightGray)"};
  `
);
