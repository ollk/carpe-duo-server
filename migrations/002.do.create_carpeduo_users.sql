CREATE TABLE carpeduo_users (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  user_name TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  sat_wake integer NOT NULL DEFAULT 14,
  sat_bed integer NOT NULL DEFAULT 44,
  sun_wake integer NOT NULL DEFAULT 62,
  sun_bed integer NOT NULL DEFAULT 92
);

ALTER TABLE carpeduo_tasks
  ADD COLUMN 
    user_id INTEGER REFERENCES carpeduo_users(id)
    ON DELETE CASCADE;