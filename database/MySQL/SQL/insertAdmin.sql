-- Adding the admin user to the db
INSERT INTO Users (username, password, email, role)
VALUES ('admin', '$2b$10$jLiY88ee2fbXdQi0FRMehOzIVqFwIhmKtuVsSWuP3LyxiiwMV5NQu', 'admin@gmail.com', 'admin');

INSERT INTO Admins (user_id) VALUES (last_insert_id());