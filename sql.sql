create user 'randy'@'localhost' identified by 'randy';
grant all privileges on *.* to 'randy'@'localhost' with grant option;

drop database database_development_to_do_app;
drop database database_test_to_do_app;
drop database database_production_to_do_app;

create database database_development_to_do_app;
create database database_test_to_do_app;
create database database_production_to_do_app;

INSERT INTO `database_development_to_do_app`.`users`
(
`name`,
`email`,
`password`)
VALUES
('randy','rannnn','rannnn');



INSERT INTO `database_development_to_do_app`.`tasks`
(
`UserId`,
`task_name`,
`starting_date`,
`ending_date`,
`status`)
VALUES
(1,'game','2002-10-05','2002-10-15','2'),(1,'play','2002-10-05','2002-10-15','2');



