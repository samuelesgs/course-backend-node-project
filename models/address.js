const db = require('../config/config');

const Address = {}

Address.create = (address) => {
    const sql = `
        INSERT INTO address(
            id_user,
            address,
            neighbordhood,
            lat,
            lng,
            created_at,
            updated_at
        ) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id
    `;
    return db.oneOrNone(sql, [
        address.id_user,
        address.address,
        address.neighbordhood,
        address.lat,
        address.lng,
        new Date(),
        new Date()
    ]);
}

module.exports = Address;