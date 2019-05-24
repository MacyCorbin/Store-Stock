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

Select * FROM products;

INSERT INTO products(product_name, department_name, price, stock)
VALUES ('Harry Potter and the Deathly Hallows','Books', 19.08, 553),
        ('Lord of the Rings: The Motion Picture Trilogy - Extended Edition','Movies', 61.19, 206),
        ('Kingdom Hearts','Video Games', 14.39, 53),
        ('Dark Side of the Moon','CDs and Vinyl', 24.87, 78),
        ('Eragon','Books', 10.58, 486),
        ('Captian America: The First Avenger','Movies', 14.99, 101),
        ('Super Smash Bros. Brawl','Video Games', 37.99, 27),
        ('Eagles: Their Greatest Hits','CDs and Vinyl', 15.67, 67);


