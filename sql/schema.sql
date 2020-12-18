DROP DATABASE IF EXISTS employees;

CREATE DATABASE employees;

USE employees;

CREATE TABLE department (
  id INT AUTO_INCREMENT NOT NULL,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY(id)
);

INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO department (name)
VALUES ("Engineering");

INSERT INTO department (name)
VALUES ("Finance");

INSERT INTO department (name)
VALUES ("Legal");

CREATE TABLE role (
  id INT AUTO_INCREMENT NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY(id)
);

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 1100000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 880000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 1550000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 1220000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Account Manager", 1660000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 1255000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Legal Team Lead", 2550000, 4);

INSERT INTO role (title, salary, department_id)
VALUES ("Lawyer", 1990000, 4);

CREATE TABLE employee (
  id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id iNT NOT NULL,
  manager_id VARCHAR(30),
  PRIMARY KEY(id)
);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Clark", 1, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mike", "Chan", 2, "John Doe");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ashley", "Clark", 3, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kevin", "Tupik", 4, "Ashley Rodriguez");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kunal", "Singh", 5, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Malia", "Brown", 6, "Kunal Singh");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sarah", "Lourd", 7, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tom", "Allen", 8, "Sarah Lourde");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Hanna", "Lauth", 3, "Kevin Tupic");