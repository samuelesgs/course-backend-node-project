const db = require('../config/config')

const Product = {};

Product.create = (product) => {
    const sql = `
        INSERT INTO public.products(
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