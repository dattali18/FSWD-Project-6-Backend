-- inserting the basic writer user
INSERT INTO Users (username, password, email, role)
VALUES ('writer', '$2b$10$jLiY88ee2fbXdQi0FRMehOzIVqFwIhmKtuVsSWuP3LyxiiwMV5NQu', 'writer@gmail.com', 'writer');

INSERT INTO Writers (user_id, bio) VALUES (LAST_INSERT_ID(), 'I am a writer');