DROP DATABASE IF EXISTS amazazon;

CREATE DATABASE amazazon;

USE amazazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT NOT NULL,
  product_sales INT NOT NULL,
  PRIMARY KEY (item_id)
);

CREATE TABLE departments (
	department_id INT NOT NULL AUTO_INCREMENT,
	department_name VARCHAR(45) NOT NULL,
	over_head_costs INT NOT NULL,
	PRIMARY KEY(department_id)
);


SELECT * FROM products;
SELECT * FROM departments;