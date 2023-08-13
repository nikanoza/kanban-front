import styled, { css } from "styled-components";
import { NewBoardType, ThemeProps } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  SubmitHandler,
  Controller,
  useFieldArray,
} from "react-hook-form";
import { newBoardSchema } from "../schemas";

type PropsType = {
  dark: boolean;
};

const NewBoard: React.FC<PropsType> = ({ dark }) => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<NewBoardType>({
    resolver: zodResolver(newBoardSchema),
    defaultValues: {
      columns: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "columns",
    control: control,
  });

  const onSubmit: SubmitHandler<NewBoardType> = async (data) => {
    console.log(data);
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
        />
        <Label dark={dark} htmlFor="">
          Board Columns
        </Label>
        <Controller
          name="columns"
          control={control}
          render={() => (
            <div>
              {fields.map((column, index) => (
                <div key={index}>
                  <Input
                    dark={dark}
                    placeholder={`e.g. Column ${index + 1}`}
                    {...column}
                  />
                  {index > 1 && (
                    <button type="button" onClick={() => remove(index)}>
                      Remove
                    </button>
                  )}
                  {errors.columns?.[index] && (
                    <p>{errors.columns[index]?.message}</p>
                  )}
                </div>
              ))}
              <button type="button" onClick={() => append("")}>
                Add Column
              </button>
            </div>
          )}
        />
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
    margin-bottom: 12px;
    border-radius: 4px;
    border: 1px solid rgba(130, 143, 163, 0.25);
    background: ${dark ? "var(--darkGray)" : "var(--white)"};
    color: ${dark ? "var(--light)" : "var(--dark) "};
    &::placeholder {
      opacity: 0.25;
    }
  `
);
