-- Добавление тестовых данных для демонстрации видеохостинга

-- Тестовые пользователи
INSERT INTO users (username, email, password_hash, display_name, subscriber_count) VALUES
('business_academy', 'academy@example.com', 'hashed_password_1', 'Бизнес Академия', 1250000),
('lifehacks_pro', 'lifehacks@example.com', 'hashed_password_2', 'Лайфхаки Pro', 985000),
('tech_tomorrow', 'tech@example.com', 'hashed_password_3', 'Технологии Завтра', 2100000),
('polyglot_school', 'polyglot@example.com', 'hashed_password_4', 'Полиглот Школа', 654000),
('culinary_world', 'culinary@example.com', 'hashed_password_5', 'Кулинарный Мир', 1100000),
('photo_workshop', 'photo@example.com', 'hashed_password_6', 'Фото Мастерская', 456000);

-- Тестовые видео
INSERT INTO videos (title, description, url, thumbnail_url, duration, views_count, likes_count, user_id) VALUES
('Как создать успешный стартап: 10 ключевых принципов', 'Подробный разбор принципов создания успешного стартапа', 'https://example.com/video1.mp4', 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=225&fit=crop', '15:24', 2300000, 89500, 1),
('Секреты продуктивности: как успевать больше за меньшее время', 'Эффективные методы повышения продуктивности', 'https://example.com/video2.mp4', 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=225&fit=crop', '12:45', 1800000, 76200, 2),
('Искусственный интеллект: будущее уже здесь', 'Обзор современных технологий ИИ и их применения', 'https://example.com/video3.mp4', 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=225&fit=crop', '23:17', 5100000, 234000, 3),
('Изучение языков: эффективные методики для быстрого результата', 'Проверенные методы изучения иностранных языков', 'https://example.com/video4.mp4', 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=225&fit=crop', '18:33', 892000, 42300, 4),
('Здоровое питание: простые рецепты на каждый день', 'Коллекция полезных и вкусных рецептов', 'https://example.com/video5.mp4', 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=225&fit=crop', '14:56', 1200000, 58900, 5),
('Фотография для начинающих: основы композиции', 'Изучаем основы композиции в фотографии', 'https://example.com/video6.mp4', 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=225&fit=crop', '21:08', 654000, 31200, 6);

-- Тестовые комментарии
INSERT INTO comments (content, likes_count, user_id, video_id) VALUES
('Отличное видео! Очень познавательно и интересно подано.', 24, 2, 1),
('Можете сделать больше видео на эту тему?', 15, 3, 1),
('Спасибо за полезные советы! Обязательно попробую применить.', 32, 4, 2),
('Очень актуальная тема, особенно в наше время.', 18, 1, 3),
('Качество контента на высоте! Подписался на канал.', 27, 5, 4);

-- Ответы на комментарии
INSERT INTO comments (content, likes_count, user_id, video_id, parent_comment_id) VALUES
('Полностью согласен, качество контента на высоте!', 8, 4, 1, 1),
('Планируем серию видео на эту тему, следите за обновлениями!', 12, 1, 1, 2),
('Рад, что видео оказалось полезным!', 6, 2, 2, 3);

-- Тестовые подписки
INSERT INTO subscriptions (subscriber_id, channel_id) VALUES
(2, 1), (3, 1), (4, 1), (5, 1),
(1, 2), (3, 2), (6, 2),
(1, 3), (2, 3), (4, 3), (5, 3), (6, 3),
(1, 4), (2, 4),
(3, 5), (6, 5),
(2, 6), (4, 6);

-- Тестовые лайки видео
INSERT INTO video_likes (user_id, video_id, is_like) VALUES
(2, 1, true), (3, 1, true), (4, 1, true),
(1, 2, true), (3, 2, true),
(1, 3, true), (2, 3, true), (4, 3, true), (5, 3, true),
(1, 4, true), (2, 4, true),
(3, 5, true), (6, 5, true),
(2, 6, true), (4, 6, true);

-- Тестовые лайки комментариев
INSERT INTO comment_likes (user_id, comment_id) VALUES
(1, 1), (3, 1), (4, 1),
(2, 2), (4, 2),
(1, 3), (5, 3),
(2, 4), (6, 4),
(1, 5), (3, 5);

-- Тестовая история просмотров
INSERT INTO view_history (user_id, video_id, watch_duration) VALUES
(2, 1, 924), (3, 1, 1524), (4, 1, 845),
(1, 2, 765), (3, 2, 765), (6, 2, 432),
(1, 3, 1397), (2, 3, 1397), (4, 3, 987),
(1, 4, 1113), (2, 4, 856),
(3, 5, 896), (6, 5, 745),
(2, 6, 1268), (4, 6, 934);