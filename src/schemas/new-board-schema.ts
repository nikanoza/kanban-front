import { z } from "zod";

const newBoardSchema = z.object({
  title: z
    .string()
    .min(3)
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Title must contain only English letters",
    }),
  columns: z
    .array(
      z.string().regex(/^[a-zA-Z\s]+$/, {
        message: "Column must contain only English letters",
      })
    )
    .default([]),
});

export default newBoardSchema;
