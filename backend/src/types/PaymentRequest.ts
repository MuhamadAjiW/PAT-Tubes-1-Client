import { z } from 'zod';

export const PaymentRequest = z.object({
    url: z.string(),
    invoiceNumber: z.string(),
});
export type PaymentRequest = z.infer<typeof PaymentRequest>