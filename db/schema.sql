### Schema for Eat-Da-Tacos web app
### Developed by Fernando Zacarias

CREATE DATABASE tacos_db;
USE tacos_db;

CREATE TABLE tacos
(
	id int NOT NULL AUTO_INCREMENT,
	taco_order varchar(255) NOT NULL,
	eaten BOOLEAN DEFAULT false,
	PRIMARY KEY (id)
);

### Some initial data entries for testing
INSERT INTO tacos (taco_order) VALUES ('Thai Chicken Taco');
INSERT INTO tacos (taco_order) VALUES ('Blackened Chicken Taco');