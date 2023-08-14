import styled, { css } from "styled-components";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  SubmitHandler,
  Controller,
  useFieldArray,
} from "react-hook-form";
import { NewTaskType, ThemeProps } from "../types";
import { NewTaskSchema } from "../schemas";
import { Close } from "../svg";

type PropsType = {
  dark: boolean;
};

const NewTask: React.FC<PropsType> = ({ dark }) => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<NewTaskType>({
    resolver: zodResolver(NewTaskSchema),
    defaultValues: {
      subtasks: ["", ""],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "subtasks",
    control: control,
  });

  const onSubmit: SubmitHandler<NewTaskType> = async (data) => {
    console.log(data);
  };

  return (
    <Main dark={dark}>
      <Title dark={dark}>Add New Task</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label dark={dark} htmlFor="task-title">
          Title
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
        <Label dark={dark} htmlFor="task-title">
          Description
        </Label>
        <Input
          dark={dark}
          placeholder="e.g. Web Design description"
          {...register("description")}
          id="task-description"
          style={{
            borderColor: errors.description
              ? "var(--error)"
              : "rgba(130, 143, 163, 0.25)",
          }}
        />
        <Error>{errors.description && errors.description.message}</Error>
        <Controller
          name="subtasks"
          control={control}
          render={() => (
            <div>
              {fields.map((subtask, index) => (
                <div key={subtask.id} style={{ width: "100%" }}>
                  <Wrapper>
                    <Input
                      dark={dark}
                      placeholder={`e.g. subtask ${index + 1}`}
                      {...register(`subtasks.${index}`)}
                      style={{
                        marginBottom: 0,
                        borderColor: errors.subtasks?.[index]
                          ? "var(--error)"
                          : "rgba(130, 143, 163, 0.25)",
                      }}
                    />
                    <CloseButton
                      type="button"
                      onClick={() => {
                        remove(index);
                      }}
                    >
                      <Close />
                    </CloseButton>
                  </Wrapper>
                  <Error>
                    {errors.subtasks?.[index] &&
                      errors.subtasks[index]?.message}
                  </Error>
                </div>
              ))}
              <AddSubtask
                type="button"
                dark={dark}
                onClick={() => {
                  append("");
                }}
              >
                + Add New Subtask
              </AddSubtask>
            </div>
          )}
        />
        <SubmitButton type="submit">Create Task</SubmitButton>
      </Form>
    </Main>
  );
};

export default NewTask;

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

const Error = styled.p`
  height: 12px;
  color: var(--error);
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 23px;
`;

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

const AddSubtask = styled.button(
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
`;
