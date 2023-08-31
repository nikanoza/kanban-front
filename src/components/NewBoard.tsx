import styled, { css } from "styled-components";
import { BoardType, NewBoardType, ThemeProps } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  SubmitHandler,
  Controller,
  useFieldArray,
} from "react-hook-form";
import { newBoardSchema } from "../schemas";
import { Close } from "../svg";
import { createNewBoard } from "../services/boardServices";
import { ModalsInfoType } from "../hooks/useModals";

type PropsType = {
  dark: boolean;
  setBoards: React.Dispatch<React.SetStateAction<BoardType[]>>;
  updateModals: (property: keyof ModalsInfoType) => void;
  setActiveBoard: React.Dispatch<React.SetStateAction<BoardType | null>>;
};

const NewBoard: React.FC<PropsType> = ({
  dark,
  setBoards,
  updateModals,
  setActiveBoard,
}) => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<NewBoardType>({
    resolver: zodResolver(newBoardSchema),
    defaultValues: {
      columns: ["", ""],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "columns",
    control: control,
  });

  const onSubmit: SubmitHandler<NewBoardType> = async (data) => {
    try {
      const response = await createNewBoard(data);
      setBoards((boards) => [...boards, response.data]);
      setActiveBoard(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      updateModals("NewBoard");
    }
  };

  return (
    <Main dark={dark}>
      <Title dark={dark}>Add New Board</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label dark={dark} htmlFor="board-title">
          Board Name
        </Label>
        <Input
          dark={dark}
          placeholder="e.g. Web Design"
          {...register("title")}
          id="board-title"
          style={{
            borderColor: errors.title
              ? "var(--error)"
              : "rgba(130, 143, 163, 0.25)",
          }}
        />
        <Error>{errors.title && errors.title.message}</Error>
        <Label dark={dark} htmlFor="">
          Board Columns
        </Label>
        <Controller
          name="columns"
          control={control}
          render={() => (
            <div>
              {fields.map((column, index) => (
                <div key={column.id} style={{ width: "100%" }}>
                  <Wrapper>
                    <Input
                      dark={dark}
                      placeholder={`e.g. Column ${index + 1}`}
                      {...register(`columns.${index}`)}
                      style={{
                        marginBottom: 0,
                        borderColor: errors.columns?.[index]
                          ? "var(--error)"
                          : "rgba(130, 143, 163, 0.25)",
                      }}
                    />
                    <CloseButton
                      type="button"
                      onClick={() => {
                        remove(index);
                        console.log(fields);
                      }}
                    >
                      <Close />
                    </CloseButton>
                  </Wrapper>
                  <Error>
                    {errors.columns?.[index] && errors.columns[index]?.message}
                  </Error>
                </div>
              ))}
              <AddColumn
                type="button"
                dark={dark}
                onClick={() => {
                  append("");
                }}
              >
                + Add New Column
              </AddColumn>
            </div>
          )}
        />
        <SubmitButton type="submit">Create New Board</SubmitButton>
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
    margin-bottom: 24px;
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
    margin-bottom: 8px;
  `
);

const Input = styled.input(
  ({ dark }: ThemeProps) => css`
    width: 100%;
    height: 40px;
    padding: 0 16px;
    border-radius: 4px;
    border: 1px solid;
    background: ${dark ? "var(--darkGray)" : "var(--white)"};
    color: ${dark ? "var(--light)" : "var(--dark) "};
    &::placeholder {
      opacity: 0.25;
    }
  `
);

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.button`
  border: none;
  background: transparent;
  margin-left: 16px;
`;

const Error = styled.p`
  height: 12px;
  color: var(--error);
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 23px;
`;

const AddColumn = styled.button(
  ({ dark }: ThemeProps) => css`
    width: 100%;
    border: none;
    height: 40px;
    border-radius: 20px;
    background: ${dark ? "var(--light)" : "rgba(99, 95, 199, 0.1)"};
    margin-top: 12px;
    color: var(--violet);
    text-align: center;
    font-size: 13px;
    font-style: normal;
    font-weight: 700;
    line-height: 23px;
  `
);

const SubmitButton = styled.button`
  width: 100%;
  border: none;
  height: 40px;
  border-radius: 20px;
  color: var(--light);
  background: var(--violet);
  margin-top: 24px;
  text-align: center;
  font-size: 13px;
  font-style: normal;
  font-weight: 700;
  line-height: 23px;
  &:hover {
    background: var(--violetHover);
  }
`;
