INSERT INTO department (department_name)
VALUES  ('Engineering'),
        ('Sales'),
        ('Finance');

INSERT INTO role (title, salary, department_id)
VALUES  ('Developer', 100000, 1),
        ('Developer Team Lead', 120000, 1),
        ('Sales Specialist', 100000, 2),
        ('Accountant', 100000, 3);


INSERT INTO employee (first_name, last_name, role_id, department_id, manager_id)
VALUES  ('Kevin', 'Lacson', 2, 1, null),
        ('Darby', 'Johnson', 3, 2, null),
        ('Alyssa', 'Cuson', 4, 3, null),
        ('Christine', 'Nguyen', 1, 1, 1);


