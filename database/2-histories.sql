CREATE TYPE history_status AS ENUM('SUCCESS', 'FAILED');

CREATE TABLE IF NOT EXISTS histories (
    history_id SERIAL PRIMARY KEY,
    kursi_id INT NOT NULL,
    acara_id INT NOT NULL,
    email VARCHAR(256) NOT NULL,
    booking_id INT NOT NULL,
    invoice_number VARCHAR(256) NOT NULL,
    pdf_url VARCHAR(256) NOT NULL,
    waktu TIMESTAMP NOT NULL,
    status history_status NOT NULL
);
