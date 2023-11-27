CREATE TYPE history_status AS ENUM('PENDING', 'ACCEPTED', 'REJECTED');

CREATE TABLE IF NOT EXISTS histories (
    kursi_id INT NOT NULL,
    acara_id INT NOT NULL,
    email VARCHAR(256) NOT NULL,
    waktu TIMESTAMP NOT NULL,
    status history_status NOT NULL DEFAULT 'PENDING',
    PRIMARY KEY(kursi_id, acara_id, email)
);
