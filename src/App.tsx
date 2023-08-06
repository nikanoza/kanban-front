import styled from "styled-components";
import { Header } from "./components";

function App() {
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
