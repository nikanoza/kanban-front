import styled, { css } from "styled-components";
import { ThemeProps } from "../types";
import { useRef } from "react";

type PropsType = {
  dark: boolean;
  closeMenu: () => void;
};

const MobileMenu: React.FC<PropsType> = ({ dark, closeMenu }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const modalClickHandler: React.MouseEventHandler<HTMLDivElement> = (
    event
  ) => {
    if (event.target === modalRef.current) {
      closeMenu();
    }
  };

  return (
    <Main ref={modalRef} onClick={modalClickHandler}>
      <Card dark={dark}></Card>
    </Main>
  );
};

export default MobileMenu;

const Main = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  top: 64px;
  left: 0;
`;

const Card = styled.div(
  ({ dark }: ThemeProps) => css`
    background-color: ${dark ? "var(--darkGray)" : "var(--light)"};
    box-shadow: ${dark
      ? "box-shadow: 0px 10px 20px 0px var(--darkGray)"
      : "0px 10px 20px 0px rgba(54, 78, 126, 0.25)"};
    border-radius: 8px;
    padding: 16px 0;
  `
);
