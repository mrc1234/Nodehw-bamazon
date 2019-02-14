DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
id INT NOT NULL AUTO_INCREMENT,
product VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NULL,
    quanity INT NULL,
    PRIMARY KEY (id)

);


-- INSERT INTO products (product, department, price, quanity)
-- VALUES ("iphone8", "phones", 800, 39), ("iphone7", "phones", 550, 12); // insert multiple rows

INSERT INTO products (product, department, price, quanity)
VALUES ("iphone7", "phones", 550, 12);

INSERT INTO products (product, department, price, quanity)
VALUES ("iphone6", "phones", 350, 22);

INSERT INTO products (product, department, price, quanity)
VALUES ("Synology DS218+", "NAS", 325, 7);

INSERT INTO products (product, department, price, quanity)
VALUES ("iMac 27 2017)", "desktops", 1299, 17);

INSERT INTO products (product, department, price, quanity)
VALUES ("Vizio 55", "televisions", 499, 13);

INSERT INTO products (product, department, price, quanity)
VALUES ("Samsung Galaxy 7", "phones", 299, 5);

INSERT INTO products (product, department, price, quanity)
VALUES ("Thorstream", "kodi tuner", 499, 11);

INSERT INTO products (product, department, price, quanity)
VALUES ("QNAP DS4", "NAS", 475, 28);

INSERT INTO products (product, department, price, quanity)
VALUES ("Vizio 45", "televisions", 349, 16);

INSERT INTO products (product, department, price, quanity)
VALUES ("iMac 21 2017", "desktops", 949, 6);