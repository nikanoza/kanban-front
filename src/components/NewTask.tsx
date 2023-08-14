import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  SubmitHandler,
  Controller,
  useFieldArray,
} from "react-hook-form";
import { ColumnType, NewTaskType } from "../types";
import { NewTaskSchema } from "../schemas";
import { Close, DownArrow } from "../svg";
import {
  AddSubtask,
  CloseButton,
  ColumnSelect,
  Error,
  Form,
  Input,
  Label,
  Main,
  PanelText,
  SelectPanel,
  SelectText,
  SubmitButton,
  TextArea,
  Title,
  Wrapper,
} from "./styled-components";
import { useState } from "react";

type PropsType = {
  dark: boolean;
  columns: ColumnType[];
};

const NewTask: React.FC<PropsType> = ({ dark, columns }) => {
  const [activeColumn, setActiveColumn] = useState<ColumnType>(columns[0]);
  const [showColumns, setShowColumns] = useState<boolean>(false);

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
        <Label dark={dark} htmlFor="task-description">
          Description
        </Label>
        <TextArea
          dark={dark}
          placeholder="e.g. It’s always good to take a break. This 15 minute break will  recharge the batteries a little."
          {...register("description")}
          id="task-description"
          style={{
            borderColor: errors.description
              ? "var(--error)"
              : "rgba(130, 143, 163, 0.25)",
          }}
        ></TextArea>
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
                style={{ marginBottom: "24px" }}
                onClick={() => {
                  append("");
                }}
              >
                + Add New Subtask
              </AddSubtask>
            </div>
          )}
        />
        <Label dark={dark} htmlFor="column-select">
          Status
        </Label>
        <ColumnSelect dark={dark}>
          <SelectText>{activeColumn.title}</SelectText>
          <div style={{ rotate: showColumns ? "180deg" : "0deg" }}>
            <DownArrow onClick={() => setShowColumns(!showColumns)} />
          </div>
          {showColumns ? (
            <SelectPanel dark={dark}>
              {columns.map((col) => (
                <PanelText
                  key={col.id}
                  onClick={() => {
                    setShowColumns(false);
                    setActiveColumn(col);
                  }}
                  type="button"
                >
                  {col.title}
                </PanelText>
              ))}
            </SelectPanel>
          ) : null}
        </ColumnSelect>
        <SubmitButton type="submit">Create Task</SubmitButton>
      </Form>
    </Main>
  );
};

export default NewTask;
