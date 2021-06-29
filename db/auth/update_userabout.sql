UPDATE users 
SET about = $1
WHERE user_id = $2
returning *;