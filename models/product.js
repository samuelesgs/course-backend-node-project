const db = require('../config/config')

const Product = {};

Product.findByCategory = (id_category) => {
    const sql = `
        SELECT
        p.id,
        p.name,
        p.description,
        p.price,
        p.image1,
        p.image2,
        p.image3,
        p.id_category
        FROM products as p
        INNER JOIN categories AS
        c ON c.id = p.id_category
        WHERE c.id = $1`;
        return db.manyOrNone(sql, [id_category]);
}

Product.create = (product) => {
    const sql = `
        INSERT INTO products(
            name,
            description,
            price,
            image1,
            image2,
            image3,
            id_category,
            created_at,
            updated_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id;
    `
    return db.oneOrNone(sql, 
        [
            product.name,
            product.description,
            product.price,
            product.image1,
            product.image2,
            product.image3,
            product.id_category,
            new Date(),
            new Date(),
        ]);
}


Product.update = (product) => {
    console.log(product);
    const sql = `
    UPDATE 
        products
        SET
            name = $2,
            description = $3,
            price = $4,
            image1 = $5,
            image2 = $6,
            image3 = $7,
            id_category = $8,
            updated_at = $9
        WHERE 
            id = $1
    `;
    return db.none(sql, [
        product.id,
        product.name,
        product.description,
        product.price,
        product.image1,
        product.image2,
        product.image3,
        product.id_category,
        new Date()
    ]);
}

module.exports = Product;