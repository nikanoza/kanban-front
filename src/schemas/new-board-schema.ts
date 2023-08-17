import { z } from "zod";

const newBoardSchema = z.object({
  title: z
    .string()
    .min(3)
    .refine((value) => value.trim().length > 0, {
      message: "Title can't be empty",
    }),
  columns: z
    .array(
      z.string().refine((value) => value.trim().length > 0, {
        message: "Column can't be empty",
      })
    )
    .default([]),
});

export default newBoardSchema;
