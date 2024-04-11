--This file contains the SQL schema for the database so you can create the tables in your local database.


--Create the users table in local sql server:
CREATE TABLE IF NOT EXISTS user (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  account_type VARCHAR(20) NOT NULL CHECK (account_type IN ('User', 'Business')),

);  


-- Create the articles table
CREATE TABLE IF NOT EXISTS article (
    id SERIAL PRIMARY KEY,
    source VARCHAR(255) NOT NULL,
    publisher VARCHAR(50) CHECK (publisher IN ('Oakdale Leader', 'The Riverbank News', 'The Modesto Bee', 'The Tracy Press', 'Ripon Journal', 'Turlock Journal')) NOT NULL,
    headline TEXT NOT NULL,
    subheading TEXT,
    category VARCHAR(50) CHECK (category IN ('SPORTS', 'NEWS')),
    subcategory VARCHAR(50) CHECK (
        subcategory IN ('CRIME', 'GOVERNMENT', 'EDUCATION', 'LOCAL SPORTS', 'LOCAL NEWS', 'HIGH SCHOOL SPORTS')
    ),
    author VARCHAR(255),
    date_published DATE,
    date_time_published TIMESTAMP,
    image_url VARCHAR(255),
    image_alt_description TEXT,
    thumbnail_url VARCHAR(255),
    thumbnail_alt_description TEXT,
    paragraphs TEXT[]
);

-- Create the verification_token table
CREATE TABLE IF NOT EXISTS verification_tokens (
  id SERIAL PRIMARY KEY,
  token VARCHAR(128) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Comment Table 
CREATE TABLE IF NOT EXISTS comment (
    id SERIAL PRIMARY KEY,
    user_id INT,
    article_id INT,
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES public."user"(id),
    FOREIGN KEY (article_id) REFERENCES article(id)
);

-- Create Subsription Table
CREATE TABLE IF NOT EXISTS subscription (
  id SERIAL PRIMARY KEY,
  user_id INT,
  category VARCHAR(100) CHECK (category IN ('SPORTS', 'CRIME', 'NEWS')),
  frequency VARCHAR(100) CHECK (frequency IN ('Hourly', 'Daily', 'Weekly', 'Biweekly', 'Monthly')),
  delivery_method VARCHAR(100) CHECK (delivery_method IN ('Email', 'SMS')),
  FOREIGN KEY (user_id) REFERENCES public."user"(id)
);

-- Create Business Table
CREATE TABLE IF NOT EXISTS Business (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    admin_id INTEGER NOT NULL,
    phone_number VARCHAR(20),
    website VARCHAR(255),
    user_ids INTEGER[],
    article_ids INTEGER[]
);

