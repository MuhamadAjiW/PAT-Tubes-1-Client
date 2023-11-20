CREATE TYPE history_status AS ENUM('PENDING', 'ACCEPTED', 'REJECTED');

CREATE TABLE IF NOT EXISTS histories (
    booking_id INT NOT NULL,
    user_id SERIAL NOT NULL,
    waktu TIMESTAMP NOT NULL,
    status history_status NOT NULL DEFAULT 'PENDING',
    PRIMARY KEY(booking_id, user_id),
    FOREIGN KEY(user_id) REFERENCES users(user_id)
);
