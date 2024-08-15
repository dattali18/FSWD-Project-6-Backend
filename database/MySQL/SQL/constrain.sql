-- add a constrain to the like table that the combination of user_id and article should be unique
ALTER TABLE Likes ADD UNIQUE `unique_user_article`(`user_id`, `article_id`);