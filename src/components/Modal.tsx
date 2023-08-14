import { useRef } from "react";
import styled from "styled-components";

const Modal: React.FC<{ children: React.ReactNode; onClick: () => void }> = ({
  children,
  onClick,
}) => {
  const mainRef = useRef<HTMLDivElement>(null);

  const closeModal: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (event.target === mainRef.current) {
      onClick();
    }
  };

  return (
    <Main ref={mainRef} onClick={closeModal}>
      {children}
    </Main>
  );
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
