CREATE DATABASE employees;

USE employees;

CREATE TABLE department (
id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
name VARCHAR(30)
);

CREATE TABLE role (
id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
title VARCHAR(30),
salary DECIMAL,
department_id INTEGER
);

CREATE TABLE employee (
id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INTEGER,
manager_id INTEGER
);


