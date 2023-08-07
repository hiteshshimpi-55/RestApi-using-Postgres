CREATE DATABASE todo_database;

--\c into todo_database

CREATE TABLE todo(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description VARCHAR(255)
);