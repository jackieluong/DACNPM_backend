CREATE TABLE AppUser (
    user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('customer', 'manager'),
    gender CHAR(1),
    birthday DATE,
    email VARCHAR(255) UNIQUE
);

CREATE TABLE Product (
    product_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price INT,
    brand VARCHAR(255),
    description VARCHAR(255),
    quantity INT,
    category ENUM('Phone', 'Tablet', 'Laptop', 'Others'),
    imgUrl TEXT
);


CREATE TABLE AppOrder (
    order_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    order_time DATETIME NOT NULL,
    ship_fee DOUBLE,
    payment_status ENUM('Completed', 'Not Completed'),
    payment_method VARCHAR(255),
    status ENUM('Processing', 'Shipping', 'Delivered', 'Cancelled'),
    address VARCHAR(255),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES AppUser(user_id) ON UPDATE RESTRICT ON DELETE SET NULL
);

CREATE TABLE PromotionCode (
    code_id INT NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    start_date DATE,
    end_date DATE,
    min_order INT,
    maximum_promo INT,
    promo_value DOUBLE,
    init_quantity INT
);

CREATE TABLE Cart (
    cart_id INT NOT NULL PRIMARY KEY
);

DROP TABLE Has
CREATE TABLE Has (
    cart_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES AppUser(user_id) ON UPDATE RESTRICT ON DELETE CASCADE,
    FOREIGN KEY (cart_id) REFERENCES Cart(cart_id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT pk_create PRIMARY KEY (cart_id, user_id)
);

CREATE TABLE Make (
    order_id INT NOT NULL PRIMARY KEY,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES AppUser(user_id) ON UPDATE RESTRICT ON DELETE CASCADE,
    FOREIGN KEY (order_id) REFERENCES AppOrder(order_id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE ApplyFor (
    order_id INT NOT NULL PRIMARY KEY,
    promotion_code_id INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES AppOrder(order_id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (promotion_code_id) REFERENCES PromotionCode(code_id) ON UPDATE RESTRICT ON DELETE CASCADE
);

CREATE TABLE Contain (
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT,
    FOREIGN KEY (order_id) REFERENCES AppOrder(order_id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Product(product_id) ON UPDATE RESTRICT ON DELETE CASCADE,
    CONSTRAINT pk_contain PRIMARY KEY (order_id, product_id)
);

CREATE TABLE Consisted (
    cart_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT,
    FOREIGN KEY (product_id) REFERENCES Product(product_id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (cart_id) REFERENCES Cart(cart_id) ON UPDATE RESTRICT ON DELETE CASCADE,
    CONSTRAINT pk_consisted PRIMARY KEY (cart_id, product_id)
);




CREATE TABLE ProductFeedback (
    feedback_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    user_id INT NOT NULL,
    content VARCHAR(255), -- For review content (can be NULL if it's only a rating)
    score INT,            -- For ratings (can be NULL if it's only a review)
    feedback_time DATETIME NOT NULL,
    CONSTRAINT fk_product_feedback_product FOREIGN KEY (product_id) REFERENCES Product(product_id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_product_feedback_user FOREIGN KEY (user_id) REFERENCES AppUser(user_id) ON UPDATE RESTRICT ON DELETE CASCADE
);
