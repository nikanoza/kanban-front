import { zodResolver } from "@hookform/resolvers/zod";
import { formControllerSchema } from "../schemas";
import { Check, Close } from "../svg";
import { useForm, SubmitHandler } from "react-hook-form";
import { CloseButton, Error, Form, Input, Wrapper } from "./styled-components";

type PropsType = {
  dark: boolean;
  value: string;
  placeholder: string;
  updateFunc: () => void;
  deleteFunc: () => void;
};

const FormController: React.FC<PropsType> = ({
  dark,
  value,
  placeholder,
  updateFunc,
  deleteFunc,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<{ value: string }>({
    resolver: zodResolver(formControllerSchema),
    defaultValues: {
      value,
    },
  });

  const onSubmit: SubmitHandler<{
    value: string;
  }> = async (data) => {
    updateFunc(data);
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Wrapper>
        <Input
          dark={dark}
          placeholder={placeholder}
          {...register("value")}
          style={{
            marginBottom: 0,
            borderColor: errors.value
              ? "var(--error)"
              : "rgba(130, 143, 163, 0.25)",
          }}
        />
        <CloseButton
          type="submit"
          style={{
            width: "fit-content",
            height: "fit-content",
            transform: "scale(2)",
            marginTop: "-5px",
          }}
        >
          <Check color="#635FC7" />
        </CloseButton>
        <CloseButton type="button" onClick={deleteFunc}>
          <Close />
        </CloseButton>
      </Wrapper>
      <Error>{errors.value && errors.value.message}</Error>
    </Form>
  );
};

export default FormController;
