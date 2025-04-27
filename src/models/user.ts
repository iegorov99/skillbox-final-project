import { z } from "zod";

export const UserSchema = z.object({
  name: z.string(),
  surname: z.string(),
  email: z.string(),
  favorites: z.array(z.string()),
});

export type User = z.infer<typeof UserSchema>;