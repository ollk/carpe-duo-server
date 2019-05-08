CREATE TABLE carpeduo_tasks (
  id SERIAL PRIMARY KEY,
  task_name TEXT NOT NULL,
  duration INTEGER NOT NULL,
  scheduled BOOLEAN DEFAULT false,
  position INTEGER DEFAULT 0
);

CREATE TYPE priority AS ENUM ('low', 'medium', 'high');

ALTER TABLE carpeduo_tasks 
  ADD COLUMN
  priority priority not null;