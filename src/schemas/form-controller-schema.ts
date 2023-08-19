import { z } from "zod";

const formControllerSchema = z.object({
  value: z
    .string()
    .min(3)
    .refine((value) => value.trim().length > 0, {
      message: "Title can't be empty",
    }),
});

export default formControllerSchema;
