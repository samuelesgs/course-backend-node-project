DROP TABLE IF EXISTS roles CASCADE;
CREATE TABLE roles(
	id BIGSERIAL PRIMARY KEY,
	name varchar(180) NOT NULL UNIQUE,
	description varchar(255) NULL,
	image varchar(255) NULL,
	route varchar(255) NULL,
	created_at TIMESTAMP(0) not null,
	updated_at TIMESTAMP(0) not null
);

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
	id BIGSERIAL PRIMARY KEY,
	email varchar(255) not null unique,
	name varchar(255) not null,
	lastname varchar(255) not null, 
	phone varchar(20) not null unique,
	image varchar(255) null,
	password varchar(255) not null,
	is_available boolean null,
	session_token varchar(255) null,
	created_at TIMESTAMP(0) not null,
	updated_at TIMESTAMP(0) not null
);

DROP TABLE IF EXISTS user_has_roles CASCADE;
CREATE TABLE user_has_roles(
	id_user  BIGSERIAL NOT NULL,
	id_rol BIGSERIAL NOT NULL,
	created_at TIMESTAMP(0) not null,
	updated_at TIMESTAMP(0) not null,
	FOREIGN KEY(id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(id_rol) REFERENCES roles(id) ON UPDATE CASCADE ON DELETE CASCADE,
	PRIMARY KEY (id_user, id_rol)
);

DROP TABLE IF EXISTS categories CASCADE;
CREATE TABLE categories(
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(180) NOT NULL UNIQUE,
	image VARCHAR(255) NOT NULL,
	created_at TIMeSTAMP(0) NOT NULL,
	updated_at TIMeSTAMP(0) NOT NULL
);

DROP TABLE IF EXISTS products CASCADE;
CREATE TABLE products(
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(180) NOT NULL UNIQUE,
	description VARCHAR(255) NOT NULL,
	price DECIMAL DEFAULT 0,
	image1 VARCHAR(255) NULL,
	image2 VARCHAR(255) NULL,
	image3 VARCHAR(255) NULL,
	id_category BIGINT NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
	FOREIGN KEY(id_category) REFERENCES categories(id) ON UPDATE CASCADE ON DELETE CASCADE
);


DROP TABLE IF EXISTS address CASCADE;
CREATE TABLE address(
	id BIGSERIAL PRIMARY KEY,
	id_user BIGINT NOT NULL,
	address VARCHAR(255) NOT NULL,
	neighborhood VARCHAR(255) NOT NULL,
	lat DECIMAL DEFAULT 0,
	lng DECIMAL DEFAULT 0,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
	FOREIGN KEY(id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

DROP TABLE IF EXISTS orders CASCADE;
CREATE TABLE orders(
	id BIGSERIAL PRIMARY KEY,
	id_user BIGINT NOT NULL,
	id_delivery BIGINT NOT NULL,
	id_address BIGINT NOT NULL,
	lat DECIMAL DEFAULT 0,
	lng DECIMAL DEFAULT 0,
	status VARCHAR(255) NOT NULL,
	timestamp BIGINT,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
	FOREIGN KEY(id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(id_delivery) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(id_address) REFERENCES address(id) ON UPDATE CASCADE ON DELETE CASCADE
);

DROP TABLE IF EXISTS order_has_products CASCADE;
CREATE TABLE order_has_products(
	id_order BIGSERIAL NOT NULL,
	id_product BIGINT NOT NULL,
	quantity BIGINT NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
	PRIMARY KEY(id_order, id_product),
	FOREIGN KEY(id_order) REFERENCES orders(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(id_product) REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE
);


/*
INSERT INTO users(
	email,
	name,
	lastname,
	phone,
	password,
	created_at,
	updated_at
) values (
	'samuelesgs04@gmail.com',
	'samuel',
	'guerrero',
	'3231291876',
	'12345678',
	'2021-05-19',
	'2021-05-19'
);

INSERT INTO roles(
	name, route, image, created_at, updated_at)
	VALUES ('CLIENTE',
	'client/home',
	'https://cdn-icons-png.flaticon.com/512/6009/6009864.png',
	'2023-10-10',
	'2023-10-10'
	);

INSERT INTO roles(
	name, route, image, created_at, updated_at)
	VALUES ('RESTAURANTE',
	'restaurant/home',
	'https://img.freepik.com/vector-premium/concepto-icono-restaurante-diseno-icono_24911-17835.jpg',
	'2023-10-10',
	'2023-10-10'
	);

INSERT INTO roles(
	name, route, image, created_at, updated_at)
	VALUES ('REPARTIDOR',
	'delivery/home',
	'https://png.pngtree.com/png-vector/20210624/ourlarge/pngtree-location-icon-with-delivery-man-riding-red-scooter-vector-illustration-png-image_3517955.jpg',
	'2023-10-10',
	'2023-10-10'
	);
INSERT INTO user_has_roles(
	id_user, id_rol, created_at, updated_at)
	VALUES (1, 1, '2023-05-05', '2023-05-05');
*/