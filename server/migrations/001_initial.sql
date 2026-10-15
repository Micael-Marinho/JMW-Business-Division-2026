CREATE TABLE users (
  id UUID PRIMARY KEY,
  name VARCHAR(80) NOT NULL CHECK (char_length(name) BETWEEN 2 AND 80),
  email VARCHAR(254) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  consent_version VARCHAR(32) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL
);
CREATE TABLE sessions (
  token_hash VARCHAR(64) PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at TIMESTAMPTZ NOT NULL
);
CREATE INDEX sessions_user_id ON sessions(user_id);
CREATE TABLE checkins (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  mood INTEGER NOT NULL CHECK (mood BETWEEN 1 AND 5),
  stress INTEGER NOT NULL CHECK (stress BETWEEN 1 AND 5),
  sleep INTEGER NOT NULL CHECK (sleep BETWEEN 1 AND 5),
  energy INTEGER NOT NULL CHECK (energy BETWEEN 1 AND 5),
  activity INTEGER CHECK (activity BETWEEN 0 AND 1440),
  notes TEXT NOT NULL DEFAULT '',
  CONSTRAINT checkins_user_date UNIQUE(user_id, date)
);
CREATE TABLE diaries (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(100) NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL
);
CREATE INDEX diaries_user_id ON diaries(user_id);
