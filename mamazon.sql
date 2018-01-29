DROP DATABASE IF EXISTS mamazon;

CREATE DATABASE mamazon;

USE mamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Product1", "Department1" , 100, 5);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Product2", "Department1" , 75, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Product3", "Department2" , 50, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Product4", "Department1" , 25, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Product5", "Department3" , 200, 25);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Product6", "Department2" , 100, 5);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Product7", "Department2" , 150, 50);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Product8", "Department3" , 200, 25);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Product9", "Department1" , 100, 5);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Product10", "Department4" , 100, 50);