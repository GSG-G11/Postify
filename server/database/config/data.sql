BEGIN;

DROP TABLE IF EXISTS users, posts, comments CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  likes INTEGER NOT NULL,
  comments INTEGER NOT NULL,
  image_url TEXT,
  user_id INTEGER REFERENCES users(id)
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE
);

INSERT INTO users (username, email, password) VALUES 
  ('Zaher', 'zaherabuamro@gmail.com', '12345'),
  ('John', 'john@gmail.com', 'johnpassword'),
  ('Jill', 'jill@gmail.com', 'Jillpassword'),
  ('John', 'john@gmail.com', 'Jaredpassword'),
  ('Ali', 'Ali@gmail.com', 'Alipassword');

INSERT INTO posts(title, content, likes, comments, image_url, user_id) VALUES 
  ('Post 1', 'This is the first post', 10, 5, 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 1),
  ('Post 2', 'This is the second post', 100, 5, 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 2),
  ('Post 3', 'This is the third post', 0, 5, 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 3),
  ('Post 4', 'This is the fourth post', 34, 5, 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 4),
  ('Post 5', 'This is the fifth post', 646, 5, 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 5);

INSERT INTO comments (content, user_id, post_id) VALUES
  ('This is the first comment', 1, 1),
  ('This is the second comment', 2, 1),
  ('This is the third comment', 3, 1),
  ('This is the fourth comment', 4, 1),
  ('This is the fifth comment', 5, 1),
  ('This is the sixth comment', 1, 2),
  ('This is the seventh comment', 2, 2),
  ('This is the eighth comment', 3, 2),
  ('This is the ninth comment', 4, 2),
  ('This is the tenth comment', 5, 2),
  ('This is the eleventh comment', 1, 3),


COMMIT;