
INSERT INTO `User` (`name`, `password`, `username`, `role`, `gender`, `birthday`, `email`) VALUES
('Nguyễn Quốc Hải', 'password101', 'nguyenquochai', 'customer', 'M', '1991-02-02', 'nguyenquochai@gmail.com'),
('Trần Thị Bích', 'password202', 'tranthibich', 'manager', 'F', '1986-06-06', 'tranthibich@example.com'),
('Lê Văn An', 'password303', 'levanan', 'customer', 'M', '1993-07-07', 'levanan@example.com'),
('Hoàng Minh Tuấn', 'password404', 'hoangminhtuan', 'manager', 'M', '1988-08-08', 'hoangminhtuan@example.com'),
('Phạm Thị Hương', 'password505', 'phamthihuong', 'customer', 'F', '1994-09-09', 'phamthihuong@example.com'),
('Ngô Văn Duy', 'password606', 'ngovanduy', 'customer', 'M', '1987-10-10', 'ngovanduy@example.com'),
('Vũ Thị Lan', 'password707', 'vuthilan', 'manager', 'F', '1989-11-11', 'vuthilan@example.com'),
('Bùi Văn Kiên', 'password808', 'buivankien', 'customer', 'M', '1995-12-12', 'buivankien@example.com'),
('Đặng Thị Mai', 'password909', 'dangthimai', 'manager', 'F', '1990-01-13', 'dangthimai@example.com'),
('Nguyễn Văn Phúc', 'password010', 'nguyenvanphuc', 'customer', 'M', '1996-02-14', 'nguyenvanphuc@example.com'),
('Trần Thị Như', 'password111', 'tranthinh', 'manager', 'F', '1985-03-15', 'tranthinh@example.com'),
('Lê Văn Cường', 'password212', 'levancuong', 'customer', 'M', '1992-04-16', 'levancuong@example.com'),
('Hoàng Văn Sơn', 'password313', 'hoangvanson', 'manager', 'M', '1988-05-17', 'hoangvanson@example.com'),
('Phạm Thị Thúy', 'password414', 'phamthithuy', 'customer', 'F', '1994-06-18', 'phamthithuy@example.com'),
('Ngô Văn Việt', 'password515', 'ngovanviet', 'customer', 'M', '1987-07-19', 'ngovanviet@example.com'),
('Vũ Thị Bảo', 'password616', 'vuthibao', 'manager', 'F', '1989-08-20', 'vuthibao@example.com'),
('Bùi Văn Hòa', 'password717', 'buivanho', 'customer', 'M', '1995-09-21', 'buivanho@example.com');



INSERT INTO `Order` (order_time, shipment_time, ship_fee, payment_status, payment_method, status, address, user_id) VALUES
(NOW(), NULL, 5000, 'Completed', 'Credit Card', 'Pending', '123 Main St, City, Country', 3),
(NOW(), NULL, 3000, 'Not Completed', 'PayPal', 'Processing', '456 Another St, City, Country', 4),
(NOW(), NULL, 4500, 'Completed', 'Credit Card', 'Shipping', '789 Some St, City, Country', 5),
(NOW(), NULL, 7000, 'Cancelled', 'Credit Card', 'Cancelled', '101 First St, City, Country', 6),
(NOW(), NULL, 2000, 'Completed', 'Debit Card', 'Delivered', '202 Second St, City, Country', 7),
(NOW(), NULL, 6000, 'Completed', 'Credit Card', 'Pending', '303 Third St, City, Country', 8),
(NOW(), NULL, 4000, 'Not Completed', 'PayPal', 'Processing', '404 Fourth St, City, Country', 9),
(NOW(), NULL, 5500, 'Completed', 'Credit Card', 'Shipping', '505 Fifth St, City, Country', 10),
(NOW(), NULL, 8000, 'Cancelled', 'Credit Card', 'Cancelled', '606 Sixth St, City, Country', 11),
(NOW(), NULL, 3000, 'Completed', 'Debit Card', 'Delivered', '707 Seventh St, City, Country', 12);



INSERT INTO `Product` (`name`, `price`, `brand`, `description`, `quantity`, `category`, `imgUrl`) VALUES
('Samsung Galaxy Z Fold6 12GB 256GB', 39990000, 'Samsung', 'Điện thoại thông minh gập flagship với màn hình lớn.', 30, 'Điện thoại', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/m/image_1170_3.png'),
('iPhone 14 Pro Max 256GB', 25590000, 'Apple', 'Điện thoại thông minh cao cấp với các tính năng tiên tiến.', 50, 'Điện thoại', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:90/plain/https://cellphones.com.vn/media/catalog/product/v/_/v_ng_20_2_1_2_1.png'),
('Xiaomi 12 Pro 8GB 256GB', 5690000, 'Xiaomi', 'Điện thoại thông minh hiệu suất cao với sạc nhanh.', 35, 'Điện thoại', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-redmi-note-12-pro-4g.png'),
('Oppo Find X5 Pro 12GB 256GB', 17000000, 'Oppo', 'Điện thoại thông minh sáng tạo với thiết kế ấn tượng.', 20, 'Điện thoại', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/o/download_1__6_6.png'),
('Google Pixel 6 128GB', 8000000, 'Google', 'Điện thoại thông minh với khả năng chụp ảnh xuất sắc.', 45, 'Điện thoại', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/g/gggg_1__1.jpg'),
('Vivo X70 Pro 12GB', 12000000, 'Vivo', 'Điện thoại thông minh với các tính năng nhiếp ảnh tiên tiến.', 25, 'Điện thoại', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:90/plain/https://cellphones.com.vn/media/catalog/product/v/i/vivo-x70-pro-plus.jpg'),
('Sony Xperia 1 III', 20000000, 'Sony', 'Điện thoại thông minh flagship với màn hình 4K độc đáo.', 15, 'Điện thoại', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:90/plain/https://cellphones.com.vn/media/catalog/product/1/0/10_1_.png'),
('OnePlus 9 Pro 12GB', 9000000, 'OnePlus', 'Điện thoại thông minh mạnh mẽ với hiệu suất nhanh.', 50, 'Điện thoại', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:90/plain/https://cellphones.com.vn/media/catalog/product/o/n/oneplus-9_1.jpg'),
('Nokia G50 5G', 4000000, 'Nokia', 'Điện thoại thông minh giá cả phải chăng với khả năng 5G.', 60, 'Điện thoại', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:90/plain/https://cellphones.com.vn/media/catalog/product/n/o/nokia-g50-4_1.jpeg'),
('Realme GT 8GB', 7000000, 'Realme', 'Điện thoại thông minh hiệu suất cao và giá trị tuyệt vời.', 55, 'Điện thoại', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:90/plain/https://cellphones.com.vn/media/catalog/product/r/e/realme-gt-neo-3_2_.png'),
('iPad Pro 12.9 128GB', 11000000, 'Apple', 'Máy tính bảng hiệu suất cao dành cho chuyên gia.', 30, 'Máy tính bảng', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:90/plain/https://cellphones.com.vn/media/catalog/product/c/v/cvv.png'),
('Samsung Galaxy Tab S8 128GB', 9000000, 'Samsung', 'Máy tính bảng đa năng cho công việc và giải trí.', 25, 'Máy tính bảng', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/a/tab_s8_1_1_2.jpg'),
('Microsoft Surface Pro 8', 13000000, 'Microsoft', 'Máy tính bảng với hiệu suất mạnh mẽ và tính linh hoạt.', 20, 'Máy tính bảng', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/i/microsoft-surface-laptop-studio_5_.png'),
('Lenovo Tab P11 128GB', 4000000, 'Lenovo', 'Máy tính bảng giá cả phải chăng với hiệu suất tốt.', 35, 'Máy tính bảng', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:90/plain/https://cellphones.com.vn/media/catalog/product/1/_/1_691_3.png'),
('Huawei MatePad Pro 256GB', 6000000, 'Huawei', 'Máy tính bảng cao cấp với màn hình ấn tượng.', 15, 'Máy tính bảng', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/may-tinh-bang-huawei-matepad-se-11-inch-co-but.png'),
('Xiaomi Pad 5 128GB', 3500000, 'Xiaomi', 'Máy tính bảng tuyệt vời cho giải trí và năng suất.', 40, 'Máy tính bảng', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:90/plain/https://cellphones.com.vn/media/catalog/product/c/v/cvv.png'),
('Amazon Fire HD 10 32GB', 1500000, 'Amazon', 'Máy tính bảng giá rẻ cho việc sử dụng hàng ngày.', 50, 'Máy tính bảng', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:90/plain/https://cellphones.com.vn/media/catalog/product/_/0/_0002_6351531_sd.jpgmaxheight640maxwid.jpg'),
('Asus ZenPad 3S 10', 5000000, 'Asus', 'Máy tính bảng phong cách với hiệu suất ổn.', 30, 'Máy tính bảng', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:90/plain/https://cellphones.com.vn/media/catalog/product/z/e/zenpad-7-0-z370cg.png'),
('MacBook Pro 14 512GB', 20000000, 'Apple', 'Máy tính xách tay mạnh mẽ dành cho chuyên gia.', 25, 'Laptop', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/macbook_9__4.png'),
('Dell XPS 13 9310', 15000000, 'Dell', 'Máy tính xách tay siêu di động với thiết kế ấn tượng.', 30, 'Laptop', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_10_2.png'),
('HP Spectre x360 14', 17000000, 'HP', 'Máy tính xách tay 2-trong-1 với các tính năng cao cấp.', 20, 'Laptop', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:90/plain/https://cellphones.com.vn/media/catalog/product/l/a/laptop-hp-spectre-x360-14-ef0030tu-6k773pa-cu-dep-1_3.png'),
('Lenovo Yoga 9i', 14000000, 'Lenovo', 'Máy tính xách tay linh hoạt với hiệu suất tuyệt vời.', 15, 'Laptop', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_d_i_1__3_28.png'),
('Asus ROG Zephyrus G14', 18000000, 'Asus', 'Máy tính xách tay chơi game với hiệu suất cao.', 10, 'Laptop', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/r/group_509_87_.png'),
('Acer Swift 3 2021', 10000000, 'Acer', 'Máy tính xách tay giá cả phải chăng cho việc sử dụng hàng ngày.', 40, 'Laptop', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_6__119.png'),
('Microsoft Surface Laptop 4', 13000000, 'Microsoft', 'Máy tính xách tay phong cách dành cho sinh viên và chuyên gia.', 25, 'Laptop', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:90/plain/https://cellphones.com.vn/media/catalog/product/8/h/8h42_1.png'),
('Razer Blade 15', 25000000, 'Razer', 'Máy tính xách tay chơi game cao cấp với thông số mạnh mẽ.', 10, 'Laptop', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/r/group_509_11__1.png');

INSERT INTO `PromotionCode` (code_id, name, start_date, end_date, min_order, maximum_promo, promo_value, init_quantity) VALUES
(3, 'SPRING2024', '2024-03-01', '2024-06-01', 150, 25, 20.0, 150),
(4, 'FALL2024', '2024-09-01', '2024-12-01', 70, 15, 12.0, 75),
(5, 'NEWYEAR2024', '2024-01-01', '2024-01-31', 200, 30, 25.0, 100),
(6, 'BLACKFRIDAY2024', '2024-11-01', '2024-11-30', 100, 50, 30.0, 200),
(7, 'CYBERMONDAY2024', '2024-11-29', '2024-12-31', 50, 20, 15.0, 100),
(8, 'EASTER2024', '2024-04-01', '2024-04-30', 80, 10, 5.0, 50),
(9, 'VALENTINE2024', '2024-02-01', '2024-02-14', 60, 15, 10.0, 75),
(10, 'MOTHER2024', '2024-05-01', '2024-05-31', 90, 20, 15.0, 100),
(11, 'FATHER2024', '2024-06-01', '2024-06-30', 100, 25, 20.0, 150),
(12, 'LABORDAY2024', '2024-09-01', '2024-09-07', 70, 10, 7.0, 50),
(13, 'HALLOWEEN2024', '2024-10-01', '2024-10-31', 60, 15, 10.0, 75),
(14, 'CHRISTMAS2024', '2024-12-01', '2024-12-25', 150, 30, 25.0, 200),
(15, 'SUMMER2024', '2024-06-01', '2024-09-01', 100, 20, 15.0, 100),
(16, 'WINTER2024', '2024-12-01', '2025-02-01', 50, 10, 10.0, 50),
(17, 'SPRINGSALE2024', '2024-03-01', '2024-05-31', 80, 15, 12.0, 75),
(18, 'FALLSALE2024', '2024-09-01', '2024-11-30', 70, 20, 15.0, 100),
(19, 'NEWYEARSALE2024', '2024-01-01', '2024-01-31', 200, 30, 25.0, 150);

INSERT INTO `Cart` (cart_id) VALUES
(4),
(5),
(6),
(7),
(8),
(9),
(10),
(11),
(12),
(13),
(14),
(15),
(16),
(17),
(18),
(19),
(20);

INSERT INTO `Has` (cart_id, user_id) VALUES
(4, 3),
(5, 4),
(6, 5),
(7, 6),
(8, 7),
(9, 8),
(10, 9),
(11, 10),
(12, 11),
(13, 12),
(14, 13),
(15, 14),
(16, 15),
(17, 16),
(18, 17);



INSERT INTO `Make` (order_id, user_id) VALUES
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8);


INSERT INTO `ApplyFor` (order_id, promotion_code_id) VALUES
(1, 3),
(2, 4),
(3, 5),
(4, 6),
(5, 7),
(6, 8),
(7, 9),
(8, 10),
(9, 11),
(10, 12);

INSERT INTO contain (order_id, product_id, quantity) VALUES
(1, 1, 2),  -- Đơn hàng 1, sản phẩm 1, số lượng 2
(1, 2, 1),  -- Đơn hàng 1, sản phẩm 2, số lượng 1
(2, 3, 1),  -- Đơn hàng 2, sản phẩm 3, số lượng 1
(3, 1, 1),  -- Đơn hàng 3, sản phẩm 1, số lượng 1
(4, 4, 1),  -- Đơn hàng 4, sản phẩm 4, số lượng 1
(5, 5, 2),  -- Đơn hàng 5, sản phẩm 5, số lượng 2
(6, 6, 1),  -- Đơn hàng 6, sản phẩm 6, số lượng 1
(7, 7, 3),  -- Đơn hàng 7, sản phẩm 7, số lượng 3
(8, 8, 1),  -- Đơn hàng 8, sản phẩm 8, số lượng 1
(9, 9, 2);  -- Đơn hàng 9, sản phẩm 9, số lượng 2

INSERT INTO `Consisted` (cart_id, product_id, quantity) VALUES
(4, 4, 1),
(5, 5, 2),
(6, 6, 1),
(7, 7, 3),
(8, 8, 2),
(9, 9, 1),
(10, 10, 2),
(11, 11, 1),
(12, 12, 3),
(13, 13, 2),
(14, 14, 1),
(15, 15, 2),
(16, 16, 3),
(17, 17, 1),
(18, 18, 2),
(19, 19, 1),
(20, 20, 2);




INSERT INTO `Rate` (user_id, product_id, score) VALUES
(3, 3, 4),
(4, 4, 5),
(5, 5, 3),
(6, 6, 4),
(7, 7, 5),
(8, 8, 3),
(9, 9, 4),
(10, 10, 5),
(11, 11, 3),
(12, 12, 4),
(13, 13, 5),
(14, 14, 3),
(15, 15, 4),
(16, 16, 5),
(17, 17, 3);



INSERT INTO `Own` (user_id, promotion_code_id) VALUES
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10),
(11, 11),
(12, 12),
(13, 13),
(14, 14),
(15, 15),
(16, 16),
(17, 17);

INSERT INTO `Review` (product_id, ordinal_number, content, time, reviewer_id) VALUES
(3, 1, 'Good product, very satisfied.', NOW(), 3),
(4, 1, 'Highly recommend this product.', NOW(), 4),
(5, 1, 'It works as expected.', NOW(), 5),
(6, 1, 'Not bad, but could be better.', NOW(), 6),
(7, 1, 'Fantastic quality!', NOW(), 7),
(8, 1, 'I love this product!', NOW(), 8),
(9, 1, 'Met my expectations.', NOW(), 9),
(10, 1, 'Would buy again.', NOW(), 10),
(11, 1, 'Great value for the price.', NOW(), 11),
(12, 1, 'Very useful and reliable.', NOW(), 12),
(13, 1, 'Exceeded my expectations!', NOW(), 13),
(14, 1, 'Satisfactory overall.', NOW(), 14),
(15, 1, 'Could improve on features.', NOW(), 15),
(16, 1, 'Solid performance.', NOW(), 16),
(17, 1, 'Good choice for the price.', NOW(), 17);