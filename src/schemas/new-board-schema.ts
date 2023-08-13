import { z } from "zod";

const newBoardSchema = z.object({
  title: z
    .string()
    .min(3)
    .refine((value) => value.trim().length > 0, {
      message: "Title can't be empty",
    })
    .refine((value) => /^[a-zA-Z\s]+$/.test(value), {
      message: "Title must contain only English letters",
    }),
  columns: z
    .array(
      z
        .string()
        .refine((value) => value.trim().length > 0, {
          message: "Column can't be empty",
        })
        .refine((value) => /^[a-zA-Z\s]+$/.test(value), {
          message: "Column must contain only English letters",
        })
    )
    .default([]),
});

export default newBoardSchema;
