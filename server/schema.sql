--This file contains the SQL schema for the database so you can create the tables in your local database.


--Create the users table in local sql server:
CREATE TABLE IF NOT EXISTS users (
  id INT IDENTITY(1,1) PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  account_type ENUM('User', 'Business') NOT NULL,
  mobile_phone_number VARCHAR(20),
  business_name VARCHAR(255),
  business_website VARCHAR(255)
);  

-- Create the articles table
CREATE TABLE IF NOT EXISTS 'articles' (
    article_id INT AUTO_INCREMENT PRIMARY KEY,
    source_url VARCHAR(255),
    publisher ENUM('Oakdale Leader', 'Riverbank News', 'Modesto Bee', 'Tracy Press', 'Ripon News', 'Turlock Journal'),
    headline VARCHAR(255),
    subheading VARCHAR(255),
    author VARCHAR(255),
    publish_date DATETIME,
    content TEXT
);

-- Create the images table
CREATE TABLE images (
    image_id INT AUTO_INCREMENT PRIMARY KEY,
    article_id INT,
    FOREIGN KEY (article_id) REFERENCES articles(article_id),
    url VARCHAR(255),
    alt_description VARCHAR(255)
);

-- Create the categories table
CREATE TABLE IF NOT EXISTS categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE
);

-- Insert categories
INSERT INTO categories (name) VALUES ('Breaking News'), ('Local News'), ('Crime'), ('Government'), ('Education');

-- Create the article_categories table to manage the many-to-many relationship
CREATE TABLE IF NOT EXISTS article_categories (
    article_id INT,
    category_id INT,
    FOREIGN KEY (article_id) REFERENCES articles(article_id),
    FOREIGN KEY (category_id) REFERENCES categories(category_id),
    PRIMARY KEY (article_id, category_id)
);


-- dummy data

-- Insert regular users
INSERT INTO users (email, password, account_type)
VALUES
  ('user1@example.com', 'password1', 'User'),
  ('user2@example.com', 'password2', 'User'),
  ('user3@example.com', 'password3', 'User');

-- Insert business users
INSERT INTO users (email, password, account_type, mobile_phone_number, business_name, business_website)
VALUES
  ('business1@example.com', 'password1', 'Business', '+1234567890', 'Business 1', 'https://www.business1.com'),
  ('business2@example.com', 'password2', 'Business', '+9876543210', 'Business 2', 'https://www.business2.com');

