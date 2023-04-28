const Category = require('../models/category')
const {create} = require('../models/user')

module.exports = {
    async create(req, res, next) {
        try{
            const category = JSON.parse(req.body.category);
            console.log('category', category);
            const data = await Category.create(category);

            const files = req.files;

            if (files.length > 0) {
                const pathImage = `image_${Date.now()}`;
                const url = await storage(files[0], pathImage)
                if (url != undefined && url != null) {
                    category.image = url;
                }
            }

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
    }
}