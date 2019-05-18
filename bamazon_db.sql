CREATE DATABASE bamazon_db;
USE bamazon_db;
CREATE TABLE products(
	id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50),
    price INTEGER(10000),
    price INTEGER(1000000),
    PRIMARY KEY (id)
);