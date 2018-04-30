DROP DATABASE IF EXISTS baby_db;

CREATE DATABASE baby_db;

USE baby_db;

CREATE TABLE babyThings (
  id INT(5) AUTO_INCREMENT PRIMARY KEY,
  diaperChange VARCHAR(255) NOT NULL,
  feeding VARCHAR(255) NOT NULL,
  sleeping Decimal(10,3) NOT NULL
);