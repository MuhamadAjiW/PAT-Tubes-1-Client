CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    full_name VARCHAR(256) NOT NULL,
    email VARCHAR(256) NOT NULL UNIQUE,
    password VARCHAR(256) NOT NULL,
    username VARCHAR(256) NOT NULL UNIQUE
);

-- Dummy data for users table
INSERT INTO users (full_name, email, password, username) VALUES
  ('John Doe', 'john@example.com', '$2y$10$hashedPassword', 'john_doe'),
  ('Jane Doe', 'jane@example.com', '$2y$10$hashedPassword', 'jane_doe'),
  ('Jone Doe', 'jone@example.com', '$2y$10$hashedPassword', 'jone_doe');
