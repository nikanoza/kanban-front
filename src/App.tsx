import styled from "styled-components";
import { Header } from "./components";
import { useEffect, useState } from "react";
import { BoardType } from "./types";
import { getAllBoards } from "./services/boardServices";

function App() {
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
      <Header />
    </Main>
  );
}

export default App;

const Main = styled.main`
  width: 100%;
  min-height: 100vh;
`;
