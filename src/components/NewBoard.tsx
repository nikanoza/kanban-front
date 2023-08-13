import styled, { css } from "styled-components";
import { NewBoardType, ThemeProps } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { newBoardSchema } from "../schemas";

type PropsType = {
  dark: boolean;
};

const NewBoard: React.FC<PropsType> = ({ dark }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<NewBoardType>({
    resolver: zodResolver(newBoardSchema),
  });

  return (
    <Main dark={dark}>
      <Title dark={dark}>Add New Board</Title>
      <Form>
        <Label dark={dark}>Board Name</Label>
        <Input dark={dark} placeholder="e.g. Web Design" />
      </Form>
    </Main>
  );
};

export default NewBoard;

const Main = styled.div(
  ({ dark }: ThemeProps) => css`
    margin: 16px;
    width: 100%;
    max-width: 480px;
    padding: 24px;
    border-radius: 6px;
    background-color: ${dark ? "var(--darkGray)" : "var(--light)"};
  `
);

const Title = styled.h2(
  ({ dark }: ThemeProps) => css`
    color: ${dark ? "var(--light)" : "var(--dark) "};
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  `
);

const Form = styled.form`
  width: 100%;
`;

const Label = styled.label(
  ({ dark }: ThemeProps) => css`
    color: ${dark ? "var(--light)" : "var(--grey)"};
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  `
);

const Input = styled.input(
  ({ dark }: ThemeProps) => css`
    width: 100%;
    height: 40px;
    padding: 0 16px;
    flex-shrink: 0;
    border-radius: 4px;
    border: 1px solid rgba(130, 143, 163, 0.25);
    background: ${dark ? "var(--darkGray)" : "var(--white)"};
    color: ${dark ? "var(--light)" : "var(--dark) "};
    &::placeholder {
      opacity: 0.25;
    }
  `
);
