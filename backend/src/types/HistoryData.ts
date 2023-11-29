import { z } from 'zod';

export const HistoryData = z.object({
    kursi_id: z.number().int(),
    acara_id: z.number().int(),
    email: z.string().email(),
    booking_id: z.number().int(),
    invoice_number: z.string(),
    pdf_url: z.string()
});
export type HistoryData = z.infer<typeof HistoryData>