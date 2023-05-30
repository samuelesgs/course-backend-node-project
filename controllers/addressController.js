const Address = require('../models/address');

module.exports = {
    async create(req, res, next) {
        try {
            const address = req.body;
            const data = await Address.create(address);
            req

        } catch(error) {
            console.log(`Error ${error}`);
            return res.status(501).json({
                success : false,
                message : 'Hubo un error creando la direccion',
                error : error
            });
        }
    }
    
}