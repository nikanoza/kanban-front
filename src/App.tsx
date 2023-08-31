import styled, { css } from "styled-components";
import {
  Board,
  DeleteBoard,
  DeleteTask,
  EditBoard,
  EditTask,
  Empty,
  Header,
  LargeMenu,
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
  const { modalsInfo, updateModals, openEditTask, openDeleteTask } =
    useModals();
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
    removeTask,
    updateColumnTitle,
    updateBoardTitle,
    removeColumn,
    createColumn,
  } = useBoard();
  const [activeBoard, setActiveBoard] = useState<BoardType | null>(null);
  const [activeTask, setActiveTask] = useState<TaskType | null>(null);
  const [activeMenu, setActiveMenu] = useState<boolean>(true);

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
    <Main dark={dark}>
      <Header
        dark={dark}
        toDark={toDark}
        toLight={toLight}
        boards={boards}
        updateModals={updateModals}
        activeBoard={activeBoard}
        setActiveBoard={setActiveBoard}
      />
      <Wrapper>
        {activeMenu ? (
          <LargeMenu
            dark={dark}
            boards={boards}
            setActiveBoard={setActiveBoard}
            updateModals={updateModals}
          />
        ) : null}
        <Content
          activeMenu={activeMenu}
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
      </Wrapper>
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
            openDeleteTask={openDeleteTask}
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
      {modalsInfo.DeleteTask && activeBoard && activeTask ? (
        <Modal onClick={() => updateModals("DeleteTask")}>
          <DeleteTask
            dark={dark}
            task={activeTask}
            board={activeBoard}
            updateModals={updateModals}
            removeTask={removeTask}
          />
        </Modal>
      ) : null}
      {modalsInfo.EditBoard && activeBoard ? (
        <Modal onClick={() => updateModals("EditBoard")}>
          <EditBoard
            dark={dark}
            board={activeBoard}
            updateBoardTitle={updateBoardTitle}
            updateColumnTitle={updateColumnTitle}
            removeColumn={removeColumn}
            createColumn={createColumn}
          />
        </Modal>
      ) : null}
      {modalsInfo.DeleteBoard && activeBoard ? (
        <Modal onClick={() => updateModals("DeleteBoard")}>
          <DeleteBoard
            dark={dark}
            board={activeBoard}
            updateModals={updateModals}
          />
        </Modal>
      ) : null}
    </Main>
  );
}

export default App;

const Main = styled.main(
  ({ dark }: ThemeProps) => css`
    width: 100%;
    background-color: ${dark ? "var(--darkBg)" : "var(--veryLightGray)"};
    min-height: 100vh;
  `
);

type ContentType = {
  activeMenu: boolean;
};

const Content = styled.section(
  ({ activeMenu }: ContentType) => css`
    min-width: 100vw;
    min-height: calc(100vh - 64px);
    display: flex;
    padding: 24px 16px;
    overflow: auto;
    @media (min-width: 768px) {
      min-height: calc(100vh - 80px);
      min-width: ${activeMenu ? "calc(100vw - 260px)" : "100vw"};
    }
  `
);

const Wrapper = styled.div`
  display: flex;
`;
