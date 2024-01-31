-- Command to run file as postgres user: psql -U postgres -a -f schema_creation.sql

-- Create the database
CREATE DATABASE blog;

-- Connect to the newly created database
\c blog;

-- Create a schema within the connected database
-- CREATE SCHEMA blog_schema;

-- Set search path to the created schema
-- SET search_path TO blog_schema;

-- Create a table within the schema
CREATE TABLE IF NOT EXISTS blog_data (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    image VARCHAR(1000) NOT NULL,
    published_at DATE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

--Blog Post 1
INSERT INTO blog_data (title, slug, content, image, published_at)
VALUES ('Sample Blog Post', 'sample-blog-post', 'This is the content of the blog post.', 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVubmlzfGVufDB8fDB8fHww', '2024-01-21');

-- Blog Post 2
INSERT INTO blog_data (title, slug, content, image, published_at)
VALUES ('Second Post', 'second-post', 'Content of the second blog post.', 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGVnb3xlbnwwfHwwfHx8MA%3D%3D', '2024-01-22');

-- Blog Post 3
INSERT INTO blog_data (title, slug, content, image, published_at)
VALUES ('Third Post', 'third-post', 'Content of the third blog post.', 'https://images.unsplash.com/photo-1612404730960-5c71577fca11?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFyaW98ZW58MHx8MHx8fDA%3Dg', '2024-01-23');

-- Blog Post 4
INSERT INTO blog_data (title, slug, content, image, published_at)
VALUES ('Fourth Post', 'fourth-post', 'Content of the fourth blog post.', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmluYW5jZXxlbnwwfHwwfHx8MA%3D%3Dg', '2024-01-24');

-- Blog Post 5
INSERT INTO blog_data (title, slug, content, image, published_at)
VALUES ('Fifth Post', 'fifth-post', 'Content of the fifth blog post.', 'https://images.unsplash.com/photo-1594768816441-1dd241ffaa67?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG9yc2UlMjByaWRpbmd8ZW58MHx8MHx8fDA%3D', '2024-01-25');

-- Blog Post 6
INSERT INTO blog_data (title, slug, content, image, published_at)
VALUES ('Sixth Post', 'sixth-post', 'Content of the sixth blog post.', 'https://images.unsplash.com/photo-1574602904329-56e2f95fb15e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YWxsJTIwYmxhY2tzJTIwcnVnYnl8ZW58MHx8MHx8fDA%3D', '2024-01-26');

-- Blog Post 7
INSERT INTO blog_data (title, slug, content, image, published_at)
VALUES ('Seventh Post', 'seventh-post', 'Content of the seventh blog post.', 'https://images.unsplash.com/photo-1528041119984-da3a9f8d04d1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGlzbmV5fGVufDB8fDB8fHww', '2024-01-27');

-- Blog Post 8
INSERT INTO blog_data (title, slug, content, image, published_at)
VALUES ('Eighth Post', 'eighth-post', 'Content of the eighth blog post.', 'https://plus.unsplash.com/premium_photo-1661313614926-e96981a05269?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3Rld3xlbnwwfHwwfHx8MA%3D%3D', '2024-01-28');

-- Blog Post 9
INSERT INTO blog_data (title, slug, content, image, published_at)
VALUES ('Ninth Post', 'ninth-post', 'Content of the ninth blog post.', 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGd5bXxlbnwwfHwwfHx8MA%3D%3D', '2024-01-29');

-- Blog Post 10
INSERT INTO blog_data (title, slug, content, image, published_at)
VALUES ('Tenth Post', 'tenth-post', 'Content of the tenth blog post.', 'https://images.unsplash.com/photo-1589226198562-41f998adf60b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dmljdG9yaWElMjBiY3xlbnwwfHwwfHx8MA%3D%3D', '2024-01-30');

