DROP DATABASE IF EXISTS employees_db;
create employees_db;

USE employees_db;

CREATE TABLE  department (
    id NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE role (
    id NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary VARCHAR(30) NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    PRIMARY KEY(id)
)

CREATE TABLE employee (
    id NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    department_id INT,
    manager_id INT REFERENCES employee(id),
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    FOREIGN KEY (department_id)
    REFERENCES department(id)
);