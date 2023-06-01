const db = require('../config/config');

const Order = {}

Order.findByClientAndStatus = (id_client, status) => {
    const sql = `SELECT 
	o.id, o.id_client, o.id_delivery, o.id_address, o.lat, o.lng, o.status, o.timestamp, o.created_at, o.updated_at, 
	JSON_BUILD_OBJECT('u.id', u.id,'name', u.name,'lastname', u.lastname,'image', u.image) as client, 
	JSON_BUILD_OBJECT('id', a.id,'address', a.address,'neighborhood', a.neighborhood,'lat', a.lat,'lng', a.lng) as json_address,
	JSON_AGG(JSON_BUILD_OBJECT(
		'id', p.id,
		'name', p.name,
		'description', p.description,
		'price', p.price,
		'image1', p.image1,
		'image2', p.image2,
		'image3', p.image3,
		'quantity', ohp.quantity
	)) as products
	FROM orders AS o 
	INNER JOIN users AS u ON o.id_client = u.id 
	INNER JOIN address AS a ON a.id = o.id_address 
	INNER JOIN order_has_products AS ohp ON ohp.id_order = o.id
	INNER JOIN products as p ON p.id = ohp.id_product
	WHERE id_client = $1 AND status = $2
	GROUP BY o.id, u.id, a.id
	ORDER BY o.timestamp DESC`;
    return db.manyOrNone(sql, [
        id_client, 
        status
    ]);
}

Order.findByStatus = (status) => {
    const sql = `SELECT 
	o.id, o.id_client, o.id_delivery, o.id_address, o.lat, o.lng, o.status, o.timestamp, o.created_at, o.updated_at, 
	JSON_BUILD_OBJECT('u.id', u.id,'name', u.name,'lastname', u.lastname,'image', u.image) as client, 
	JSON_BUILD_OBJECT('id', a.id,'address', a.address,'neighborhood', a.neighborhood,'lat', a.lat,'lng', a.lng) as json_address,
	JSON_AGG(JSON_BUILD_OBJECT(
		'id', p.id,
		'name', p.name,
		'description', p.description,
		'price', p.price,
		'image1', p.image1,
		'image2', p.image2,
		'image3', p.image3,
		'quantity', ohp.quantity
	)) as products
	FROM orders AS o 
	INNER JOIN users AS u ON o.id_client = u.id 
	INNER JOIN address AS a ON a.id = o.id_address 
	INNER JOIN order_has_products AS ohp ON ohp.id_order = o.id
	INNER JOIN products as p ON p.id = ohp.id_product
	WHERE status = $2
	GROUP BY o.id, u.id, a.id
	ORDER BY o.timestamp DESC`;
    return db.manyOrNone(sql, status)
}

Order.create = (order) => {
    const sql = `
        INSERT INTO orders(
            id_client, id_address, status, timestamp, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING id
    `;
    return db.oneOrNone(sql, [
        order.id_client,
        order.id_address,
        order.status,
        Date.now(),
        new Date(),
        new Date()
    ])
}

module.exports = Order;