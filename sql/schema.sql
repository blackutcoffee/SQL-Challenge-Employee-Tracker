DROP DATABASE IF EXISTS employees;

CREATE DATABASE employees;

USE employees;

CREATE TABLE department(
    id INT NOT NULL auto_increment,
    names VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);
CREATE TABLE manager(
	id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    primary key(id),
    FOREIGN KEY (role_id) REFERENCES role(id)
);

CREATE TABLE role(
    id INT NOT NULL auto_increment,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NULL,
    department_id INTEGER,
    PRIMARY KEY(id),
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
  id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NULL,
  role_id INTEGER NOT NULL,
  CONSTRAINT fk_role_id FOREIGN KEY (role_id) REFERENCES role(id),
  manager_id INTEGER NOT NULL,
  CONSTRAINT fk_manager_id FOREIGN KEY (manager_id) REFERENCES department(id)
-- );
-- SELECT employee.first_name AS First_Name, employee.last_name AS Last_Name, roles.title AS Title, roles.salary AS Salary, departments.name AS Department FROM employee LEFT JOIN roles ON role_id LEFT JOIN departments ON department_id

-- -- Query for view all --
-- SELECT e.id, e.first_name, e.last_name, d.name AS department, r.title, r.salary, CONCAT_WS(" ", m.first_name, m.last_name) AS manager FROM employee e LEFT JOIN employee m ON m.id = e.manager_id INNER JOIN role r ON e.role_id = r.id INNER JOIN department d ON r.department_id = d.id ORDER BY e.id ASC;

-- -- Query for view all roles --
-- SELECT  r.id, r.title, r.salary, d.name as Department_Name FROM role AS r INNER JOIN department AS d ON r.department_id = d.id;

-- --Query for getting employees --
-- SELECT id, CONCAT_WS(' ', first_name, last_name) AS Employee_Name FROM employee

-- -- Query for updating --
-- UPDATE employee SET role_id = 3 WHERE id = 8;
-- UPDATE employee SET ? WHERE ?;

-- -- Query for Delete --
-- DELETE FROM department WHERE id = 13;
