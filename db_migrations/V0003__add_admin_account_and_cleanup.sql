-- Очистка старых тестовых видео и добавление админ аккаунта

-- Очистка старых данных
UPDATE videos SET views_count = 0;
UPDATE users SET subscriber_count = 0;

-- Добавление админ аккаунта RuVideo
INSERT INTO users (username, email, password_hash, display_name, subscriber_count) VALUES
('RuVideo', 'admin@ruvideo.com', 'hashed_RuVideo2024!Admin', 'RuVideo', 0)
ON CONFLICT (username) DO NOTHING;

-- Добавление поля для админских прав
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;

-- Назначение админских прав аккаунту RuVideo
UPDATE users SET is_admin = TRUE WHERE username = 'RuVideo';

-- Добавление поля для отслеживания статуса регистрации через Gmail
ALTER TABLE users ADD COLUMN IF NOT EXISTS registration_type VARCHAR(20) DEFAULT 'gmail';

-- Обновление существующих пользователей
UPDATE users SET registration_type = 'gmail' WHERE email LIKE '%@gmail.com';
UPDATE users SET registration_type = 'admin' WHERE username = 'RuVideo';