import { z } from 'zod';

export const BookingRequest = z.object({
    email: z.string().email(),
    acaraId: z.number().int(),
    kursiId: z.number().int()
});
export type BookingRequest = z.infer<typeof BookingRequest>