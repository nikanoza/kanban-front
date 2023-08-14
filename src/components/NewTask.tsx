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
import {
  AddSubtask,
  CloseButton,
  Error,
  Form,
  Input,
  Label,
  Main,
  SubmitButton,
  Title,
  Wrapper,
} from "./styled-components";

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
