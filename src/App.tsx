import styled, { css } from "styled-components";
import { Empty, Header } from "./components";
import { useEffect, useState } from "react";
import { BoardType, ThemeProps } from "./types";
import { getAllBoards } from "./services/boardServices";
import { useModals, useTheme } from "./hooks";

function App() {
  const { dark, toDark, toLight } = useTheme();
  const { modalsInfo, updateModals } = useModals();

  const [boards, setBoards] = useState<BoardType[]>([]);

  useEffect(() => {
    const getBoardsData = async () => {
      try {
        const response = await getAllBoards();
        setBoards(response.data);
      } catch (error) {
        alert(error);
      }
    };

    getBoardsData();
  }, []);

  return (
    <Main>
      <Header dark={dark} toDark={toDark} toLight={toLight} boards={boards} />
      <Content
        dark={dark}
        style={{ alignItems: boards.length > 0 ? "flex-start" : "center" }}
      >
        {boards.length > 0 ? null : <Empty />}
      </Content>
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
    width: 100%;
    min-height: calc(100vh - 64px);
    display: flex;
    justify-content: center;
    background-color: ${dark ? "var(--darkBg)" : "var(--veryLightGray)"};
  `
);
