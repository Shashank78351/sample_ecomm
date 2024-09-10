CREATE TABLE orders (
 
    orderId BIGINT NOT NULL,
 
    name VARCHAR(255) NOT NULL,
 
    price DECIMAL(10, 2) NOT NULL,
 
    quantity INT NOT NULL ,
 
    totalPrice DECIMAL(15, 2) NOT NULL,
 
    username VARCHAR(255),
 
    email VARCHAR(255),
 
    -- image varchar(255)
 
);

 
create table products(productId int auto_increment primary key, productName varchar(50), productDescription varchar(500),productImage varchar(500), productPrice int, category varchar(50) );
create table cart(cartId int auto_increment primary key, name varchar(50) not null, price int not null ,quantity int default 1);
CREATE TABLE users (
 
    userId INT AUTO_INCREMENT PRIMARY KEY,
 
    username VARCHAR(50) NOT NULL,
 
    email VARCHAR(100) NOT NULL UNIQUE,
 
    password VARCHAR(255) NOT NULL,
 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 
);