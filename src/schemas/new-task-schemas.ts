import { z } from "zod";

const newTaskSchema = z.object({
  title: z
    .string()
    .min(3)
    .refine((value) => value.trim().length > 0, {
      message: "Title can't be empty",
    })
    .refine((value) => /^[a-zA-Z\s]+$/.test(value), {
      message: "Title must contain only English letters",
    }),
  description: z
    .string()
    .min(3)
    .refine((value) => value.trim().length > 0, {
      message: "description can't be empty",
    })
    .refine((value) => /^[a-zA-Z\s]+$/.test(value), {
      message: "description must contain only English letters",
    }),
  subtasks: z
    .array(
      z
        .string()
        .refine((value) => value.trim().length > 0, {
          message: "subtask can't be empty",
        })
        .refine((value) => /^[a-zA-Z\s]+$/.test(value), {
          message: "subtask must contain only English letters",
        })
    )
    .default([]),
});

export default newTaskSchema;
