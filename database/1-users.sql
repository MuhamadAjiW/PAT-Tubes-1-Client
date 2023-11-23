CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    full_name VARCHAR(256) NOT NULL,
    email VARCHAR(256) NOT NULL UNIQUE,
    password VARCHAR(256) NOT NULL,
    username VARCHAR(256) NOT NULL UNIQUE,
    isAdmin BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO users(full_name, email, password, username, isAdmin)
VALUES ('admin', 'admin@gmail.com', '$2y$10$ZGauU0DZ8MpWUzk6J22/RuOugCYX06TC.QYY9x.f.ufz9M0BsLMKW', 'admin', true);

-- Dummy data for users table
INSERT INTO users (full_name, email, password, username, isAdmin) VALUES
  ('John Doe', 'john@example.com', '$2y$10$hashedPassword', 'john_doe', false),
  ('Jane Doe', 'jane@example.com', '$2y$10$hashedPassword', 'jane_doe', false),
  ('Admin User', 'admin@example.com', '$2y$10$hashedPassword', 'admin_user', true);
