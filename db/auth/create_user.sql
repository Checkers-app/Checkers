INSERT INTO users (username, email, hash, wins, losses)
VALUES ($1, $2, $3, 0, 0)
returning *;