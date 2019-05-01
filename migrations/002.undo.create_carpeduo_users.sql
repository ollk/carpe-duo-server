ALTER TABLE carpeduo_tasks
  DROP COLUMN IF EXISTS user_id;

DROP TABLE IF EXISTS carpeduo_users;