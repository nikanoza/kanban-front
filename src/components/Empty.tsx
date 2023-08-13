import styled from "styled-components";
import { key } from "../hooks/useModals";

type PropsType = {
  updateModals: (property: key) => void;
};

const Empty: React.FC<PropsType> = ({ updateModals }) => {
  return (
    <Main>
      <Text>This board is empty. Create a new column to get started.</Text>
      <NewBoardButton onClick={() => updateModals("NewBoard")}>
        + Add New Column
      </NewBoardButton>
    </Main>
  );
};

export default Empty;

const Main = styled.div`
  width: 100%;
  display: flex;
  padding: 0 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;
`;

const Text = styled.h2`
  color: var(--grey);
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const NewBoardButton = styled.button`
  width: 174px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 24px;
  background: var(--violet);
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--light);
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  border: none;
`;
