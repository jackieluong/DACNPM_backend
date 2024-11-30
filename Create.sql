CREATE SCHEMA `dacnpm`;


CREATE TABLE User (
    user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    role ENUM('customer', 'manager') NOT NULL,
    gender CHAR(1) NOT NULL,
    birthday DATE NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
)

CREATE TABLE Product (
    product_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    brand VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    category ENUM('Phone', 'Tablet', 'Laptop', 'Accessories') NOT NULL
)

CREATE TABLE `Order`(
    order_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    order_time DATETIME NOT NULL,
    shipment_time DATETIME,
    ship_fee DOUBLE NOT NULL,
    payment_status ENUM('Completed', 'Not Completed', 'Cancelled') NOT NULL,
    payment_method VARCHAR(255) NOT NULL,
    status ENUM('Pending', 'Processing', 'Shipping', 'Delivered','Cancelled') NOT NULL,
    address VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(user_id) ON UPDATE RESTRICT ON DELETE RESTRICT
)

CREATE TABLE PromotionCode (
    code_id INT NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    start_date DATETIME NOT NULL,
    end_date DATETIME NOT NULL,
    min_order INT NOT NULL,
    maximum_promo INT NOT NULL,
    promo_value DOUBLE NOT NULL,
    init_quantity INT NOT NULL
)

CREATE TABLE Cart (
    cart_id INT NOT NULL PRIMARY KEY
)

CREATE TABLE Has (
    cart_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(user_id) ON UPDATE RESTRICT ON DELETE RESTRICT,
    FOREIGN KEY (cart_id) REFERENCES Cart(cart_id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT pk_create PRIMARY KEY (cart_id, user_id)
)

CREATE TABLE Make (
    order_id INT NOT NULL PRIMARY KEY,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(user_id) ON UPDATE RESTRICT ON DELETE RESTRICT,
    FOREIGN KEY (order_id) REFERENCES `Order`(order_id) ON UPDATE CASCADE ON DELETE CASCADE
)

CREATE TABLE ApplyFor (
    order_id INT NOT NULL PRIMARY KEY,
    promotion_code_id INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES `Order`(order_id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (promotion_code_id) REFERENCES PromotionCode(code_id) ON UPDATE RESTRICT ON DELETE RESTRICT
)

CREATE TABLE Contain (
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES `Order`(order_id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Product(product_id) ON UPDATE RESTRICT ON DELETE RESTRICT,
    CONSTRAINT pk_contain PRIMARY KEY (order_id, product_id)
)

CREATE TABLE Consisted (
    cart_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES Product(product_id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (cart_id) REFERENCES Cart(cart_id) ON UPDATE RESTRICT ON DELETE RESTRICT,
    CONSTRAINT pk_consisted PRIMARY KEY (cart_id, product_id)
)

CREATE TABLE Rate (
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    score INT NOT NULL,
    CONSTRAINT pk_rate PRIMARY KEY (user_id, product_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id) ON UPDATE RESTRICT ON DELETE RESTRICT,
    FOREIGN KEY (product_id) REFERENCES Product(product_id) ON UPDATE RESTRICT ON DELETE RESTRICT
)

CREATE TABLE Own (
    user_id INT NOT NULL,
    promotion_code_id INT NOT NULL,
    CONSTRAINT pk_own PRIMARY KEY (user_id, promotion_code_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id) ON UPDATE RESTRICT ON DELETE RESTRICT,
    FOREIGN KEY (promotion_code_id) REFERENCES PromotionCode(code_id) ON UPDATE RESTRICT ON DELETE RESTRICT
)

CREATE TABLE Review (
    product_id INT NOT NULL,
    ordinal_number INT NOT NULL,
    content VARCHAR(255) NOT NULL,
    time DATETIME NOT NULL,
    reviewer_id INT NOT NULL,
    CONSTRAINT pk_review PRIMARY KEY (product_id, ordinal_number),
    FOREIGN KEY (product_id) REFERENCES Product(product_id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (reviewer_id) REFERENCES User(user_id) ON UPDATE RESTRICT ON DELETE RESTRICT
)
