import { PostgresConnection } from "../utils/connection";
import { HistoryData } from "../types/HistoryData";

export class HistoryRepository{
    async createHistory(request: HistoryData, success: Boolean){
        const status = success? "SUCCESS" : "FAILED";
        const result = await PostgresConnection.query(
            'INSERT INTO histories (kursi_id, acara_id, email, booking_id, invoice_number, pdf_url, waktu, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [request.kursi_id, request.acara_id, request.email, request.booking_id, request.invoice_number, request.pdf_url, new Date(), status]
        );
        return result.rows[0];
    }
}