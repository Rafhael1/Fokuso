CREATE DATABASE workspace;

CREATE TABLE workspace_todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);