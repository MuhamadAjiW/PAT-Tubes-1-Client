import { z } from 'zod';

export const UserRequest = z.object({
    full_name: z.string(),
    email: z.string().email(),
    password: z.string(),
    username: z.string()
});
export type UserRequest = z.infer<typeof UserRequest>