CREATE DATABASE workspace;

create extension if not exists "uuid-ossp";

CREATE TABLE users(
    user_id uuid DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    completed BOOLEAN,
    PRIMARY KEY (user_id)
);

CREATE TABLE workspace_todo(
    todo_id SERIAL ,
    user_id UUID,
    description VARCHAR(255) NOT NULL,
    PRIMARY KEY (todo_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE notes(
    note_id SERIAL ,
    user_id UUID,
    description VARCHAR(300) NOT NULL,
    PRIMARY KEY (note_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
