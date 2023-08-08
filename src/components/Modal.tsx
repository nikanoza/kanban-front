import styled from "styled-components";

const Modal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Main>{children}</Main>;
};

export default Modal;

const Main = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
`;
