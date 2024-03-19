--This file contains the SQL schema for the database so you can create the tables in your local database.


--Create the users table in local sql server:
CREATE TABLE IF NOT EXISTS user (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  account_type VARCHAR(20) NOT NULL CHECK (account_type IN ('User', 'Business')),
  mobile_phone_number VARCHAR(20),
  business_name VARCHAR(255),
  business_website VARCHAR(255)
);  


-- Create the articles table
CREATE TABLE IF NOT EXISTS article (
    id SERIAL PRIMARY KEY,
    source VARCHAR(255) NOT NULL,
    publisher VARCHAR(50) CHECK (publisher IN ('Oakdale Leader', 'The Riverbank News', 'The Modesto Bee', 'The Tracy Press', 'Ripon Journal', 'Turlock Journal')) NOT NULL,
    headline TEXT NOT NULL,
    subheading TEXT,
    category VARCHAR(50) CHECK (category IN ('SPORTS', 'NEWS')),
    subcategory VARCHAR(50),
    author VARCHAR(100),
    date_published DATE,
    image_url VARCHAR(255),
    image_alt_description TEXT,
    thumbnail_url VARCHAR(255),
    thumbnail_alt_description TEXT,
    paragraphs TEXT[]
);
