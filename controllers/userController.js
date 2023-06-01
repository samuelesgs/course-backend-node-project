const User = require('../models/user');
const Rol = require('../models/rol');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const storage = require('../utils/cloud_storage');

module.exports = {
    async getAll(req, res, next) {
        try {
            const data = await User.getAll();
            return res.status(201).json(data);
        } catch (error) {
            return res.status(501).json({
                success : false,
                message : error
            });
        }
    },

    async findByDeliveryMen(req, res, next) {
        try {
            const data = await User.findByDeliveryMen();
            return res.status(201).json(data);
        } catch (error) {
            console.log(`error ${error}`);
            return res.status(501).json({
                success : false,
                message : error
            });
        }
    },

    async register(req, res, next) {
        try {
            const user = req.body;
            const data = await User.create(user);
            await Rol.create(data.id, 1);

            const token = jwt.sign({id : data.id, email: user.email}, keys.secretOrKey, {
                //expiresIn:
            });
            const myData = {
                id : data.id,
                name : user.name,
                lastname : user.lastname,
                email : user.email,
                phone : user.phone,
                image : user.image,
                session_token : `JWT ${token}`
            };
            console.log(`USER SEND ${data}`);
            return res.status(201).json({
                success : true,
                message : 'Usuario creado exitosamente.',
                data : myData
            });
        } catch (error) {
            return res.status(501).json({
                success : false,
                message : 'Hubo un error con el registro del usuario',
                error : error
            });
        }
    },

    async login(req, res, next) {
        try {
            const email = req.body.email;
            const password = req.body.password;
            
            const myUser = await User.findByEmail(email);
            if (!myUser) {
                return res.status(401).json({
                    success : false,
                    message : 'Hubo un error con la busqueda del usuario',
                })
            }
            const isPasswordValid = await bcrypt.compare(password, myUser.password);
            if (isPasswordValid) {
                const token = jwt.sign({id : myUser.id, email: myUser.email}, keys.secretOrKey, {
                    //expiresIn:
                });

                const data = {
                    id : myUser.id,
                    name : myUser.name,
                    lastname : myUser.lastname,
                    email : myUser.email,
                    phone : myUser.phone,
                    image : myUser.image,
                    session_token : `JWT ${token}`,
                    roles : myUser.roles
                };

                await User.updateSessionToken(myUser.id, `JWT ${token}`)
                return res.status(201).json( {
                    success : true,
                    message : 'Usuario autenticado',
                    data : data
                })
            } else {
                return res.status(401).json( {
                    success : false,
                    message : 'La contraseña es incorrecta'
                })
            }
            

        } catch (error) {
            console.log(error);
            return res.status(501).json({
                success : false,
                message : 'Hubo un error con la busqueda del usuario',
                error : error
            });
        }
    },

    async update(req, res, next) {
        try {
            const user = JSON.parse(req.body.user);
            const files = req.files;

            if (files.length > 0) {
                const pathImage = `image_${Date.now()}`;
                const url = await storage(files[0], pathImage)
                if (url != undefined && url != null) {
                    user.image = url;
                }
            }
            
            await User.update(user);
            return res.status(201).json({
                success: true,
                message : 'Los datos del usuario se han actualizado correctamente',
                data : user
            });
        } catch (error) {
            console.log(`Error : ${error}`);
            return res.status(501).json({
                success : false,
                message : 'Hubo un error al actualizar los datos del usuario',
                error : error
            });
        }
    },

    async updateWithoutImage(req, res, next) {
        try {
            const user = req.body
            console.log(user);
            await User.update(user);
            return res.status(201).json({
                success: true,
                message : 'Los datos del usuario se han actualizado correctamente',
                data : user
            });
        } catch (error) {
            console.log(`Error : ${error}`);
            return res.status(501).json({
                success : false,
                message : 'Hubo un error al actualizar los datos del usuario',
                error : error
            });
        }
    }
}