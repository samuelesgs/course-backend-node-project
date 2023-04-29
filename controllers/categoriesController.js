const Category = require('../models/category')
const storage = require('../utils/cloud_storage');

module.exports = {
    async create(req, res, next) {
        try{
            console.log('category', req.body);
            const category = JSON.parse(req.body.category);

            const files = req.files;

            if (files.length > 0) {
                const pathImage = `image_${Date.now()}`;
                const url = await storage(files[0], pathImage)
                if (url != undefined && url != null) {
                    category.image = url;
                }
            }
            const data = await Category.create(category);

            return res.status(201).json({
                success : true,
                message : 'La categoria se ha creado correctamente',
                data : {
                    'id' : data.id
                }
            });
        } catch(error) {
            console.log('error', error);
            return res.status(501).json({
                success : false,
                message : 'Hubo un error al crear la categoria',
                error : error
            })
        }
    },

    async getAll(req, res, next) {
        try{
            const data = await Category.getAll()
            console.log("DATA ",data);
            return res.status(201).json(data);
        } catch(error) {
            console.log(error);
            return res.status(501).json({
                success : false,
                message : 'Hubo un error al crear la categoria',
                error : error
            });
        }
    }
}