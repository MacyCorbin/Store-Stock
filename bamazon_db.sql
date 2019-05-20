DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
	product_id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INT(20) NOT NULL,
    PRIMARY KEY (product_id)
);

SELECT * FROM products