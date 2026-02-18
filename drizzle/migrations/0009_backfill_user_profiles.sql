INSERT INTO user_profiles (user_id, created_at, updated_at)
SELECT u.id, NOW(), NOW()
FROM users u
LEFT JOIN user_profiles p ON p.user_id = u.id
WHERE p.user_id IS NULL;
