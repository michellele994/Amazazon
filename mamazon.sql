DROP DATABASE IF EXISTS mamazon;

CREATE DATABASE mamazon;

USE mamazon;

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

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Product1", "Department1" , 100, 5, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Product2", "Department1" , 75, 10, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Product3", "Department2" , 50, 15, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Product4", "Department1" , 25, 20, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Product5", "Department3" , 200, 25, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Product6", "Department2" , 100, 5, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Product7", "Department2" , 150, 50, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Product8", "Department3" , 200, 25, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Product9", "Department1" , 100, 5, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Product10", "Department4" , 100, 50, 0);

SELECT * FROM products