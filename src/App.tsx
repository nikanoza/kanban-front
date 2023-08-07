import styled from "styled-components";
import { Header } from "./components";
import { useEffect, useState } from "react";
import { BoardType } from "./types";
import { getAllBoards } from "./services/boardServices";
import useTheme from "./hooks/useTheme";

function App() {
  const { dark, toDark, toLight } = useTheme();

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
      <Header dark={dark} toDark={toDark} toLight={toLight} />
    </Main>
  );
}

export default App;

const Main = styled.main`
  width: 100%;
  min-height: 100vh;
`;
