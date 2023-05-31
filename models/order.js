const db = require('../config/config');

const Order = {}

Order.findByStatus = (status) => {
    //const sql = `SELECT o.id, o.id_client, o.id_delivery, o.id_address, o.lat, o.lng, o.status, o.timestamp, o.created_at, o.updated_at, JSON_BUILD_OBJECT('u.id', u.id,'name', u.name,'lastname', u.lastname,'image', u.image) as client, JSON_BUILD_OBJECT('id', a.id,'name', a.address,'neighborhood', a.neighborhood,'lat', a.lat,'lng', a.lng) as address FROM orders AS o INNER JOIN users AS u ON o.id_client = u.id INNER JOIN address AS a ON a.id = o.id_address WHERE status = '$1'`;
    const sql = `SELECT o.id, o.id_client, o.id_delivery, o.id_address, o.lat, o.lng, o.status, o.timestamp, o.created_at, o.updated_at, JSON_BUILD_OBJECT('u.id', u.id,'name', u.name,'lastname', u.lastname,'image', u.image) as client,JSON_BUILD_OBJECT('id', a.id,'name', a.address,'neighborhood', a.neighborhood,'lat', a.lat,'lng', a.lng) as address FROM orders AS o INNER JOIN users AS u ON o.id_client = u.id INNER JOIN address AS a ON a.id = o.id_address WHERE status = $1`;
    //console.log(sql);
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