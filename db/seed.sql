DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
    user_id  SERIAL PRIMARY KEY,
    username VARCHAR NOT NULL,
    email    VARCHAR NOT NULL,
    hash     VARCHAR NOT NULL,
    wins     INT,
    losses   INT
);