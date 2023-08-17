import { z } from "zod";

const newTaskSchema = z.object({
  title: z
    .string()
    .min(3)
    .refine((value) => value.trim().length > 0, {
      message: "Title can't be empty",
    }),
  description: z
    .string()
    .min(3)
    .refine((value) => value.trim().length > 0, {
      message: "description can't be empty",
    }),
  subtasks: z
    .array(
      z.string().refine((value) => value.trim().length > 0, {
        message: "subtask can't be empty",
      })
    )
    .default([]),
});

export default newTaskSchema;
