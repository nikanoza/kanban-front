import styled, { css } from "styled-components";
import { Board, Empty, Header, Modal, NewBoard, NewTask } from "./components";
import { useEffect, useState } from "react";
import { BoardType, ThemeProps } from "./types";
import { getAllBoards } from "./services/boardServices";
import { useBoard, useModals, useTheme } from "./hooks";

function App() {
  const { dark, toDark, toLight } = useTheme();
  const { modalsInfo, updateModals } = useModals();
  const { boards, setBoards, addTask } = useBoard();
  const [activeBoard, setActiveBoard] = useState<BoardType | null>(null);

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
          <Board board={activeBoard} dark={dark} />
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
