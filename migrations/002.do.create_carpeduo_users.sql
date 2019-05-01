CREATE TABLE carpeduo_users (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  user_name TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

ALTER TABLE carpeduo_tasks
  ADD COLUMN 
    user_id INTEGER REFERENCES carpeduo_users(id)
    ON DELETE CASCADE;